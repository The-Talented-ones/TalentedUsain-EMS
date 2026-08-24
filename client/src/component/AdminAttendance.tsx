import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCalendarDays,
  HiOutlineArrowDownTray,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineUserGroup,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineFunnel,
  HiOutlineArrowPath,
} from "react-icons/hi2";

import {
  dummyAdminAttendanceData,
  dummyAdminEmployeeData,
} from "../assets/asset";

interface AttendanceLog {
  _id: string;
  employeeId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  workingHours: number;
  employee?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
    image: string | null;
  };
}

type AttendanceStatus =
  | "PRESENT"
  | "LATE"
  | "ABSENT"
  | "ON_LEAVE";

const AdminAttendance = () => {
  const [attendanceList, setAttendanceList] =
    useState<AttendanceLog[]>(
      dummyAdminAttendanceData as AttendanceLog[]
    );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | AttendanceStatus>("ALL");

  const [dateFilter, setDateFilter] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [editingAttendance, setEditingAttendance] =
    useState<AttendanceLog | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  // ============================================================
  // HELPERS
  // ============================================================

  const formatTime = (date: string | null) => {
    if (!date) return "--";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getEmployee = (employeeId: string) => {
    return dummyAdminEmployeeData.find(
      (employee) =>
        employee._id === employeeId ||
        employee.userId?._id === employeeId ||
        employee.id === employeeId
    );
  };

  const getEmployeeName = (attendance: AttendanceLog) => {
    if (attendance.employee) {
      return `${attendance.employee.firstName} ${attendance.employee.lastName}`;
    }

    const employee = getEmployee(attendance.employeeId);

    return employee
      ? `${employee.firstName} ${employee.lastName}`
      : "Unknown Employee";
  };

  const getEmployeeDepartment = (
    attendance: AttendanceLog
  ) => {
    if (attendance.employee?.department) {
      return attendance.employee.department;
    }

    return (
      getEmployee(attendance.employeeId)?.department ||
      "—"
    );
  };

  // ============================================================
  // FILTER ATTENDANCE
  // ============================================================

  const filteredAttendance = useMemo(() => {
    return attendanceList.filter((attendance) => {
      const employee = getEmployee(attendance.employeeId);

      const employeeName = employee
        ? `${employee.firstName} ${employee.lastName}`.toLowerCase()
        : "";

      const employeeEmail =
        employee?.email?.toLowerCase() || "";

      const department =
        employee?.department?.toLowerCase() || "";

      const position =
        employee?.position?.toLowerCase() || "";

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        employeeName.includes(search) ||
        employeeEmail.includes(search) ||
        department.includes(search) ||
        position.includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        attendance.status === statusFilter;

      const matchesDate =
        !dateFilter ||
        new Date(attendance.date)
          .toISOString()
          .split("T")[0] === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    attendanceList,
    searchTerm,
    statusFilter,
    dateFilter,
  ]);

  // ============================================================
  // STATISTICS
  // ============================================================

  const totalEmployees = dummyAdminEmployeeData.length;

  const presentCount = attendanceList.filter(
    (attendance) => attendance.status === "PRESENT"
  ).length;

  const lateCount = attendanceList.filter(
    (attendance) => attendance.status === "LATE"
  ).length;

  const absentCount = attendanceList.filter(
    (attendance) => attendance.status === "ABSENT"
  ).length;

  const onLeaveCount = attendanceList.filter(
    (attendance) => attendance.status === "ON_LEAVE"
  ).length;

  const totalWorkingHours = attendanceList.reduce(
    (total, attendance) =>
      total + (attendance.workingHours || 0),
    0
  );

  // ============================================================
  // DELETE ATTENDANCE
  // ============================================================

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmed) return;

    setAttendanceList((prev) =>
      prev.filter((attendance) => attendance._id !== id)
    );

    toast.success(
      "Attendance record deleted successfully."
    );
  };

  // ============================================================
  // EDIT ATTENDANCE
  // ============================================================

  const handleEdit = (attendance: AttendanceLog) => {
    setEditingAttendance(attendance);
  };

  // ============================================================
  // SAVE EDIT
  // ============================================================

  const handleSaveEdit = () => {
    if (!editingAttendance) return;

    setIsSaving(true);

    setTimeout(() => {
      setAttendanceList((prev) =>
        prev.map((attendance) =>
          attendance._id === editingAttendance._id
            ? editingAttendance
            : attendance
        )
      );

      setEditingAttendance(null);
      setIsSaving(false);

      toast.success(
        "Attendance record updated successfully."
      );
    }, 700);
  };

  // ============================================================
  // EXPORT CSV
  // ============================================================

  const handleExport = () => {
    if (!filteredAttendance.length) {
      toast.error("There are no attendance records to export.");
      return;
    }

    const headers = [
      "Employee",
      "Department",
      "Date",
      "Check In",
      "Check Out",
      "Working Hours",
      "Status",
    ];

    const rows = filteredAttendance.map((attendance) => [
      getEmployeeName(attendance),
      getEmployeeDepartment(attendance),
      formatDate(attendance.date),
      formatTime(attendance.checkIn),
      formatTime(attendance.checkOut),
      attendance.workingHours,
      attendance.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "attendance-records.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Attendance exported successfully.");
  };

  // ============================================================
  // CLEAR FILTERS
  // ============================================================

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setDateFilter("");
  };

  const hasActiveFilters =
    searchTerm ||
    statusFilter !== "ALL" ||
    dateFilter;

  // ============================================================
  // STATUS BADGE
  // ============================================================

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PRESENT":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <HiOutlineCheckCircle size={14} />
            Present
          </span>
        );

      case "LATE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            <HiOutlineClock size={14} />
            Late
          </span>
        );

      case "ABSENT":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
            <HiOutlineXCircle size={14} />
            Absent
          </span>
        );

      case "ON_LEAVE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            <HiOutlineCalendarDays size={14} />
            On Leave
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {status}
          </span>
        );
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="animate-fade-in space-y-6">

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Attendance
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage employee attendance records.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <HiOutlineArrowDownTray size={18} />
          Export
        </button>

      </div>


      {/* ====================================================== */}
      {/* STATISTICS */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

        {/* TOTAL EMPLOYEES */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Employees
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-800">
                {totalEmployees}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <HiOutlineUserGroup size={22} />
            </div>

          </div>

        </div>


        {/* PRESENT */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Present
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {presentCount}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <HiOutlineCheckCircle size={22} />
            </div>

          </div>

        </div>


        {/* LATE */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Late
              </p>

              <p className="mt-1 text-2xl font-bold text-amber-600">
                {lateCount}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
              <HiOutlineClock size={22} />
            </div>

          </div>

        </div>


        {/* ABSENT */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Absent
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {absentCount}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <HiOutlineXCircle size={22} />
            </div>

          </div>

        </div>


        {/* WORKING HOURS */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Hours
              </p>

              <p className="mt-1 text-2xl font-bold text-indigo-600">
                {totalWorkingHours.toFixed(1)}
              </p>
            </div>

            <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
              <HiOutlineClock size={22} />
            </div>

          </div>

        </div>

      </div>


      {/* ====================================================== */}
      {/* SEARCH & FILTERS */}
      {/* ====================================================== */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* SEARCH */}

          <div className="relative flex-1">

            <HiOutlineMagnifyingGlass
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search employee, department..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />

          </div>


          {/* FILTER BUTTON */}

          <button
            onClick={() =>
              setShowFilters((prev) => !prev)
            }
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              showFilters || hasActiveFilters
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <HiOutlineFunnel size={18} />
            Filters
          </button>


          {/* CLEAR */}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <HiOutlineArrowPath size={17} />
              Clear
            </button>
          )}

        </div>


        {/* FILTER PANEL */}

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 md:grid-cols-2">

            {/* DATE */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Date
              </label>

              <div className="relative">

                <HiOutlineCalendarDays
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />

              </div>

            </div>


            {/* STATUS */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "ALL"
                      | AttendanceStatus
                  )
                }
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >

                <option value="ALL">
                  All Status
                </option>

                <option value="PRESENT">
                  Present
                </option>

                <option value="LATE">
                  Late
                </option>

                <option value="ABSENT">
                  Absent
                </option>

                <option value="ON_LEAVE">
                  On Leave
                </option>

              </select>

            </div>

          </div>
        )}

      </div>


      {/* ====================================================== */}
      {/* RESULTS COUNT */}
      {/* ====================================================== */}

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredAttendance.length}
          </span>{" "}
          attendance record
          {filteredAttendance.length !== 1
            ? "s"
            : ""}
        </p>

      </div>


      {/* ====================================================== */}
      {/* ATTENDANCE TABLE */}
      {/* ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px] text-left text-sm">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Employee
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Date
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Check In
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Check Out
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Working Hours
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-5 py-4 text-right font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {filteredAttendance.length > 0 ? (

                filteredAttendance.map((attendance) => {

                  const employee =
                    getEmployee(
                      attendance.employeeId
                    );

                  return (
                    <tr
                      key={attendance._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* EMPLOYEE */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">

                            {employee
                              ? `${employee.firstName.charAt(
                                  0
                                )}${employee.lastName.charAt(
                                  0
                                )}`
                              : "?"}

                          </div>

                          <div>

                            <p className="font-medium text-slate-800">
                              {getEmployeeName(
                                attendance
                              )}
                            </p>

                            <p className="text-xs text-slate-400">
                              {getEmployeeDepartment(
                                attendance
                              )}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* DATE */}

                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(
                          attendance.date
                        )}
                      </td>


                      {/* CHECK IN */}

                      <td className="px-5 py-4">

                        <span className="font-medium text-slate-700">
                          {formatTime(
                            attendance.checkIn
                          )}
                        </span>

                      </td>


                      {/* CHECK OUT */}

                      <td className="px-5 py-4">

                        <span className="font-medium text-slate-700">
                          {formatTime(
                            attendance.checkOut
                          )}
                        </span>

                      </td>


                      {/* HOURS */}

                      <td className="px-5 py-4">

                        <span className="font-medium text-slate-700">
                          {attendance.workingHours
                            ? `${attendance.workingHours.toFixed(
                                2
                              )}h`
                            : "--"}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-5 py-4">
                        {getStatusBadge(
                          attendance.status
                        )}
                      </td>


                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-1">

                          <button
                            onClick={() =>
                              handleEdit(
                                attendance
                              )
                            }
                            title="Edit attendance"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <HiOutlinePencilSquare
                              size={18}
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                attendance._id
                              )
                            }
                            title="Delete attendance"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <HiOutlineTrash
                              size={18}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>

                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center"
                  >

                    <HiOutlineCalendarDays
                      size={42}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 font-medium text-slate-600">
                      No attendance records found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ====================================================== */}
      {/* EDIT MODAL */}
      {/* ====================================================== */}

      {editingAttendance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-lg font-semibold text-slate-800">
                Edit Attendance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update this employee's attendance record.
              </p>

            </div>


            {/* MODAL BODY */}

            <div className="space-y-5 px-6 py-5">

              <div className="rounded-lg bg-slate-50 p-4">

                <p className="text-sm font-semibold text-slate-800">
                  {getEmployeeName(
                    editingAttendance
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(
                    editingAttendance.date
                  )}
                </p>

              </div>


              {/* CHECK IN */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Check In
                </label>

                <input
                  type="datetime-local"
                  value={
                    editingAttendance.checkIn
                      ? new Date(
                          editingAttendance.checkIn
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setEditingAttendance({
                      ...editingAttendance,
                      checkIn: e.target.value
                        ? new Date(
                            e.target.value
                          ).toISOString()
                        : null,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />

              </div>


              {/* CHECK OUT */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Check Out
                </label>

                <input
                  type="datetime-local"
                  value={
                    editingAttendance.checkOut
                      ? new Date(
                          editingAttendance.checkOut
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setEditingAttendance({
                      ...editingAttendance,
                      checkOut: e.target.value
                        ? new Date(
                            e.target.value
                          ).toISOString()
                        : null,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />

              </div>


              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={editingAttendance.status}
                  onChange={(e) =>
                    setEditingAttendance({
                      ...editingAttendance,
                      status: e.target
                        .value as AttendanceStatus,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >

                  <option value="PRESENT">
                    Present
                  </option>

                  <option value="LATE">
                    Late
                  </option>

                  <option value="ABSENT">
                    Absent
                  </option>

                  <option value="ON_LEAVE">
                    On Leave
                  </option>

                </select>

              </div>


              {/* WORKING HOURS */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Working Hours
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    editingAttendance.workingHours
                  }
                  onChange={(e) =>
                    setEditingAttendance({
                      ...editingAttendance,
                      workingHours: Number(
                        e.target.value
                      ),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">

              <button
                onClick={() =>
                  setEditingAttendance(null)
                }
                disabled={isSaving}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminAttendance;