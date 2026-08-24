import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineDocumentDownload,
  HiOutlineClock,
  HiOutlineUsers,
} from "react-icons/hi";
import { dummyLeaveData, dummyEmployeeData } from "../assets/asset";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  image: string | null;
}

interface LeaveRecord {
  _id: string;
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  id: string;
  employee?: Employee;
}

const AdminLeave = () => {
  const [leaves, setLeaves] = useState<LeaveRecord[]>(
    dummyLeaveData as LeaveRecord[],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // ============================================================
  // ATTACH EMPLOYEE DATA
  // ============================================================

  const leavesWithEmployees = useMemo(() => {
    return leaves.map((leave) => {
      const employee = dummyEmployeeData.find(
        (emp) => emp._id === leave.employeeId,
      );

      return {
        ...leave,
        employee: employee as Employee | undefined,
      };
    });
  }, [leaves]);

  // ============================================================
  // FILTER LEAVE REQUESTS
  // ============================================================

  const filteredLeaves = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return leavesWithEmployees.filter((leave) => {
      const employeeName = leave.employee
        ? `${leave.employee.firstName} ${leave.employee.lastName}`
        : "";

      const matchesSearch =
        !search ||
        employeeName.toLowerCase().includes(search) ||
        leave.employee?.email?.toLowerCase().includes(search) ||
        leave.employee?.department?.toLowerCase().includes(search) ||
        leave.type.toLowerCase().includes(search) ||
        leave.status.toLowerCase().includes(search) ||
        leave.reason.toLowerCase().includes(search);

      const matchesStatus =
        filterStatus === "ALL" || leave.status === filterStatus;

      const matchesType = filterType === "ALL" || leave.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leavesWithEmployees, searchTerm, filterStatus, filterType]);

  // ============================================================
  // SUMMARY STATISTICS
  // ============================================================

  const totalRequests = leaves.length;

  const pendingRequests = leaves.filter(
    (leave) => leave.status === "PENDING",
  ).length;

  const approvedRequests = leaves.filter(
    (leave) => leave.status === "APPROVED",
  ).length;

  const rejectedRequests = leaves.filter(
    (leave) => leave.status === "REJECTED",
  ).length;

  // ============================================================
  // LEAVE TYPE LABEL
  // ============================================================

  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case "ANNUAL":
        return "Annual Leave";

      case "CASUAL":
        return "Casual Leave";

      case "SICK":
        return "Sick Leave";

      default:
        return type;
    }
  };

  // ============================================================
  // STATUS BADGE
  // ============================================================

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
            Approved
          </span>
        );

      case "REJECTED":
        return (
          <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700">
            Rejected
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
            Pending
          </span>
        );
    }
  };

  // ============================================================
  // CALCULATE LEAVE DAYS
  // ============================================================

  const calculateLeaveDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference = end.getTime() - start.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
  };

  // ============================================================
  // APPROVE LEAVE
  // ============================================================

  const handleApprove = (id: string) => {
    setIsProcessing(id);

    setTimeout(() => {
      setLeaves((prev) =>
        prev.map((leave) =>
          leave._id === id
            ? {
                ...leave,
                status: "APPROVED",
                updatedAt: new Date().toISOString(),
              }
            : leave,
        ),
      );

      setIsProcessing(null);

      toast.success("Leave request approved successfully.");
    }, 500);
  };

  // ============================================================
  // REJECT LEAVE
  // ============================================================

  const handleReject = (id: string) => {
    setIsProcessing(id);

    setTimeout(() => {
      setLeaves((prev) =>
        prev.map((leave) =>
          leave._id === id
            ? {
                ...leave,
                status: "REJECTED",
                updatedAt: new Date().toISOString(),
              }
            : leave,
        ),
      );

      setIsProcessing(null);

      toast.success("Leave request rejected.");
    }, 500);
  };

  // ============================================================
  // DELETE LEAVE
  // ============================================================

  const handleDelete = (leave: LeaveRecord) => {
    const employeeName = leave.employee
      ? `${leave.employee.firstName} ${leave.employee.lastName}`
      : "this employee";

    const confirmed = window.confirm(
      `Are you sure you want to delete the leave request from ${employeeName}?`,
    );

    if (!confirmed) return;

    setLeaves((prev) => prev.filter((item) => item._id !== leave._id));

    toast.success("Leave request deleted successfully.");
  };

  // ============================================================
  // EXPORT CSV
  // ============================================================

  const exportToCSV = () => {
    if (filteredLeaves.length === 0) {
      toast.error("There are no leave records to export.");
      return;
    }

    const headers = [
      "Employee",
      "Email",
      "Department",
      "Leave Type",
      "Start Date",
      "End Date",
      "Days",
      "Reason",
      "Status",
    ];

    const rows = filteredLeaves.map((leave) => [
      leave.employee
        ? `${leave.employee.firstName} ${leave.employee.lastName}`
        : "Unknown",

      leave.employee?.email || "—",

      leave.employee?.department || "—",

      getLeaveTypeLabel(leave.type),

      new Date(leave.startDate).toLocaleDateString(),

      new Date(leave.endDate).toLocaleDateString(),

      calculateLeaveDays(leave.startDate, leave.endDate),

      leave.reason,

      leave.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `leave-requests-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

    toast.success("Leave records exported successfully.");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="page-header">
        <div>
          <h1 className="page-title">Leave Management</h1>

          <p className="page-subtitle">
            Review and manage employee leave applications.
          </p>
        </div>
      </div>

      {/* ====================================================== */}
      {/* SUMMARY CARDS */}
      {/* ====================================================== */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* TOTAL */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Total Requests
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-800">
                {totalRequests}
              </p>
            </div>

            <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
              <HiOutlineDocumentDownload className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* PENDING */}

        <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Pending
              </p>

              <p className="mt-1 text-2xl font-bold text-amber-600">
                {pendingRequests}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600">
              <HiOutlineClock className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* APPROVED */}

        <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Approved
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {approvedRequests}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600">
              <HiOutlineCheck className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* REJECTED */}

        <div className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Rejected
              </p>

              <p className="mt-1 text-2xl font-bold text-rose-600">
                {rejectedRequests}
              </p>
            </div>

            <div className="rounded-lg bg-rose-50 p-2.5 text-rose-600">
              <HiOutlineX className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* LEAVE REQUEST MANAGEMENT */}
      {/* ====================================================== */}

      <div className="card overflow-hidden bg-white shadow-xs">
        {/* HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2">
            <HiOutlineUsers className="h-5 w-5 text-slate-400" />

            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Employee Leave Requests
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                {filteredLeaves.length} of {totalRequests} requests displayed
              </p>
            </div>
          </div>

          {/* EXPORT */}

          <button
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <HiOutlineDocumentDownload className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* ==================================================== */}
        {/* SEARCH + FILTERS */}
        {/* ==================================================== */}

        <div className="border-b border-slate-200 bg-slate-50/50 p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* SEARCH */}

            <div className="relative">
              <input
                type="text"
                placeholder="Search employee, department, type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              />

              <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* STATUS */}

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-800 outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Status</option>

                <option value="PENDING">Pending</option>

                <option value="APPROVED">Approved</option>

                <option value="REJECTED">Rejected</option>
              </select>

              <HiOutlineFilter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* LEAVE TYPE */}

            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Leave Types</option>

                <option value="ANNUAL">Annual Leave</option>

                <option value="CASUAL">Casual Leave</option>

                <option value="SICK">Sick Leave</option>
              </select>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* TABLE */}
        {/* ==================================================== */}

        {filteredLeaves.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mb-3 text-4xl">📋</div>

            <p className="text-sm font-medium text-slate-500">
              No leave requests found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50/80">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Employee
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Department
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Leave Type
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Duration
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Reason
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredLeaves.map((leave) => {
                  const employee = leave.employee;

                  const employeeName = employee
                    ? `${employee.firstName} ${employee.lastName}`
                    : "Unknown Employee";

                  const processing = isProcessing === leave._id;

                  return (
                    <tr
                      key={leave._id}
                      className="transition hover:bg-slate-50/50"
                    >
                      {/* EMPLOYEE */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {employee?.image ? (
                            <img
                              src={employee.image}
                              alt={employeeName}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
                              {employee
                                ? `${employee.firstName[0]}${employee.lastName[0]}`
                                : "?"}
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {employeeName}
                            </p>

                            <p className="text-xs text-slate-400">
                              {employee?.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DEPARTMENT */}

                      <td className="px-4 py-4">
                        <span className="text-xs font-medium text-slate-600">
                          {employee?.department || "—"}
                        </span>
                      </td>

                      {/* TYPE */}

                      <td className="px-4 py-4">
                        <span className="text-xs font-semibold text-slate-700">
                          {getLeaveTypeLabel(leave.type)}
                        </span>
                      </td>

                      {/* DURATION */}

                      <td className="px-4 py-4">
                        <p className="whitespace-nowrap text-xs text-slate-600">
                          {new Date(leave.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}

                          {" - "}

                          {new Date(leave.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {calculateLeaveDays(leave.startDate, leave.endDate)}{" "}
                          {calculateLeaveDays(
                            leave.startDate,
                            leave.endDate,
                          ) === 1
                            ? "day"
                            : "days"}
                        </p>
                      </td>

                      {/* REASON */}

                      <td className="max-w-[220px] px-4 py-4">
                        <p
                          className="truncate text-xs text-slate-600"
                          title={leave.reason}
                        >
                          {leave.reason}
                        </p>
                      </td>

                      {/* STATUS */}

                      <td className="px-4 py-4">
                        {getStatusBadge(leave.status)}
                      </td>

                      {/* ACTIONS */}

                      <td className="px-4 py-4">
                        {leave.status === "PENDING" ? (
                          <div className="flex items-center justify-end gap-1.5">
                            {/* APPROVE */}

                            <button
                              disabled={processing}
                              onClick={() => handleApprove(leave._id)}
                              title="Approve leave"
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <HiOutlineCheck className="h-4 w-4" />
                            </button>

                            {/* REJECT */}

                            <button
                              disabled={processing}
                              onClick={() => handleReject(leave._id)}
                              title="Reject leave"
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <HiOutlineX className="h-4 w-4" />
                            </button>

                            {/* DELETE */}

                            <button
                              disabled={processing}
                              onClick={() => handleDelete(leave)}
                              title="Delete leave"
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <HiOutlineTrash className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleDelete(leave)}
                              title="Delete leave"
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                            >
                              <HiOutlineTrash className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeave;
