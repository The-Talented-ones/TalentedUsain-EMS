import {
  HiOutlineCheckCircle,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineArrowUp,
} from "react-icons/hi";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { useState } from "react";

interface AttendanceLog {
  _id: string;
  employeeId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  workingHours: number;
}

interface AttendanceHistoryProps {
  attendanceList: AttendanceLog[];
}

const AttendanceHistory = ({
  attendanceList,
}: AttendanceHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [sortOrder, setSortOrder] =
    useState<"asc" | "desc">("desc");

  // ============================================================
  // STATUS OPTIONS
  // ============================================================

  const statusOptions = [
    "ALL",
    "PRESENT",
    "ABSENT",
    "LATE",
    "HALF_DAY",
    "LEAVE",
  ];

  // ============================================================
  // STATUS BADGE
  // ============================================================

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        bg: string;
        text: string;
        icon: typeof HiOutlineCheckCircle;
      }
    > = {
      PRESENT: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        icon: HiOutlineCheckCircle,
      },

      ABSENT: {
        bg: "bg-rose-100",
        text: "text-rose-700",
        icon: HiOutlineCheckCircle,
      },

      LATE: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        icon: HiOutlineCheckCircle,
      },

      HALF_DAY: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: HiOutlineCheckCircle,
      },

      LEAVE: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: HiOutlineCheckCircle,
      },
    };

    return (
      statusMap[status] || {
        bg: "bg-slate-100",
        text: "text-slate-700",
        icon: HiOutlineCheckCircle,
      }
    );
  };

  // ============================================================
  // FILTER + SEARCH + SORT
  // ============================================================

  const filteredLogs = attendanceList
    .filter((log) => {
      const search = searchTerm.toLowerCase();

      const formattedDate = new Date(
        log.date
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const matchesSearch =
        formattedDate
          .toLowerCase()
          .includes(search) ||
        log.status
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        filterStatus === "ALL" ||
        log.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === "desc"
        ? dateB - dateA
        : dateA - dateB;
    });

  // ============================================================
  // EXPORT CSV
  // ============================================================

  const exportToCSV = () => {
    if (filteredLogs.length === 0) {
      return;
    }

    const headers = [
      "Date",
      "Check In",
      "Check Out",
      "Status",
      "Working Hours",
    ];

    const csvData = filteredLogs.map((log) => [
      new Date(log.date).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),

      log.checkIn
        ? new Date(log.checkIn).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )
        : "—",

      log.checkOut
        ? new Date(
            log.checkOut
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "—",

      log.status,

      log.workingHours
        ? `${log.workingHours} hrs`
        : "—",
    ]);

    const csvContent = [
      headers,
      ...csvData,
    ]
      .map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `attendance-history-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  // ============================================================
  // SUMMARY
  // ============================================================

  const totalHours = filteredLogs.reduce(
    (sum, log) =>
      sum + (log.workingHours || 0),
    0
  );

  const totalDays = filteredLogs.length;

  const presentDays = filteredLogs.filter(
    (log) => log.status === "PRESENT"
  ).length;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center">

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Attendance Log History
          </h3>

          <p className="mt-0.5 text-xs text-slate-400">
            {totalDays} records •{" "}
            {totalHours} total hours •{" "}
            {presentDays} days present
          </p>
        </div>

        {/* EXPORT */}

        <button
          onClick={exportToCSV}
          disabled={filteredLogs.length === 0}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <HiOutlineArrowDownTray size={15} />
          Export
        </button>

      </div>


      {/* ====================================================== */}
      {/* SEARCH & FILTERS */}
      {/* ====================================================== */}

      <div className="border-b border-slate-200 bg-slate-50/50 p-4">

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {/* SEARCH */}

          <div className="relative">

            <input
              type="text"
              placeholder="Search by date or status..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            />

            <HiOutlineSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>


          {/* STATUS FILTER */}

          <div className="relative">

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
              className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            >
              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status === "ALL"
                    ? "All Status"
                    : status}
                </option>
              ))}
            </select>

            <HiOutlineFilter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>


          {/* SORT */}

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setSortOrder((prev) =>
                  prev === "desc"
                    ? "asc"
                    : "desc"
                )
              }
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50"
            >
              <span>Sort</span>

              <HiOutlineArrowUp
                size={16}
                className={`transition-transform ${
                  sortOrder === "desc"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            <span className="text-xs text-slate-400">
              {filteredLogs.length} records
            </span>

          </div>

        </div>

      </div>


      {/* ====================================================== */}
      {/* EMPTY STATE */}
      {/* ====================================================== */}

      {filteredLogs.length === 0 ? (

        <div className="p-12 text-center">

          <div className="mb-3 text-4xl">
            📋
          </div>

          <p className="text-sm font-medium text-slate-400">
            No attendance records found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Try adjusting your search or filter settings
          </p>

        </div>

      ) : (

        /* ==================================================== */
        /* TABLE */
        /* ==================================================== */

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b border-slate-200 bg-slate-50/80">

              <tr>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Check In Time
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Check Out Time
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Hours Logged
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {filteredLogs.map((log) => {

                const statusBadge =
                  getStatusBadge(
                    log.status
                  );

                const StatusIcon =
                  statusBadge.icon;

                return (
                  <tr
                    key={log._id}
                    className="transition-colors duration-150 hover:bg-slate-50/50"
                  >

                    {/* DATE */}

                    <td className="px-4 py-3">

                      <span className="text-sm font-medium text-slate-800">
                        {new Date(
                          log.date
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>

                    </td>


                    {/* CHECK IN */}

                    <td className="px-4 py-3 text-sm text-slate-500">

                      {log.checkIn
                        ? new Date(
                            log.checkIn
                          ).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "—"}

                    </td>


                    {/* CHECK OUT */}

                    <td className="px-4 py-3 text-sm text-slate-500">

                      {log.checkOut
                        ? new Date(
                            log.checkOut
                          ).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "—"}

                    </td>


                    {/* STATUS */}

                    <td className="px-4 py-3">

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                      >

                        <StatusIcon size={12} />

                        {log.status}

                      </span>

                    </td>


                    {/* WORKING HOURS */}

                    <td className="px-4 py-3">

                      <span className="text-sm font-semibold tabular-nums text-slate-700">

                        {log.workingHours
                          ? `${log.workingHours} hrs`
                          : "—"}

                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default AttendanceHistory;