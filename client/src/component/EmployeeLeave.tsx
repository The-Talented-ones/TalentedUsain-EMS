import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiOutlineDocumentAdd,
  HiOutlineClock,
} from "react-icons/hi";
import { dummyLeaveData, dummyEmployeeData } from "../assets/asset";

interface LeaveData {
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
  employee: typeof dummyEmployeeData[number];
}

const EmployeeLeave = () => {
  /*
   * In a real application, this employee would come
   * from the authenticated user's session.
   *
   * For the dummy data, we are using dummyEmployeeData[2].
   */
  const currentEmployee = dummyEmployeeData[2];

  /*
   * Only show leave requests belonging to the
   * currently logged-in employee.
   */
  const employeeLeaves = dummyLeaveData.filter(
    (leave) =>
      leave.employeeId === currentEmployee._id
  );

  const [leaves, setLeaves] = useState<LeaveData[]>(
    employeeLeaves as LeaveData[]
  );

  const [formData, setFormData] = useState({
    type: "ANNUAL",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================
  // HANDLE FORM INPUT
  // ============================================================

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // SUBMIT LEAVE APPLICATION
  // ============================================================

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Check required fields
    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason.trim()
    ) {
      toast.error(
        "Please fill out all required fields."
      );
      return;
    }

    // Check date validity
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate < startDate) {
      toast.error(
        "End date cannot be before start date."
      );
      return;
    }

    // Prevent empty reason
    if (formData.reason.trim().length < 5) {
      toast.error(
        "Please provide a more detailed reason."
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      const id = Math.random()
        .toString(36)
        .substring(2, 11);

      const newLeave: LeaveData = {
        _id: id,

        employeeId: currentEmployee._id,

        type: formData.type,

        startDate:
          startDate.toISOString(),

        endDate:
          endDate.toISOString(),

        reason: formData.reason.trim(),

        /*
         * Every new employee leave request
         * starts as PENDING.
         */
        status: "PENDING",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),

        id,

        employee: currentEmployee,
      };

      setLeaves((prev) => [
        newLeave,
        ...prev,
      ]);

      // Reset form
      setFormData({
        type: "ANNUAL",
        startDate: "",
        endDate: "",
        reason: "",
      });

      setIsSubmitting(false);

      toast.success(
        "Leave application submitted successfully!"
      );
    }, 800);
  };

  // ============================================================
  // STATUS BADGE
  // ============================================================

  const getStatusBadge = (
    status: string
  ) => {
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

      case "PENDING":
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
            Pending
          </span>
        );
    }
  };

  // ============================================================
  // LEAVE TYPE LABEL
  // ============================================================

  const getLeaveTypeLabel = (
    type: string
  ) => {
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
  // CALCULATE LEAVE DAYS
  // ============================================================

  const calculateLeaveDays = (
    startDate: string,
    endDate: string
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      end.getTime() - start.getTime();

    return (
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  // ============================================================
  // SUMMARY
  // ============================================================

  const totalRequests = leaves.length;

  const pendingRequests = leaves.filter(
    (leave) =>
      leave.status === "PENDING"
  ).length;

  const approvedRequests = leaves.filter(
    (leave) =>
      leave.status === "APPROVED"
  ).length;

  const rejectedRequests = leaves.filter(
    (leave) =>
      leave.status === "REJECTED"
  ).length;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ====================================================== */}
      {/* PAGE HEADER */}
      {/* ====================================================== */}

      <div className="page-header">

        <h1 className="page-title">
          Leave Applications
        </h1>

        <p className="page-subtitle">
          Apply for time off and monitor the
          status of your leave requests.
        </p>

      </div>


      {/* ====================================================== */}
      {/* SUMMARY CARDS */}
      {/* ====================================================== */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {/* TOTAL */}

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Total Requests
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-800">
            {totalRequests}
          </p>

        </div>


        {/* PENDING */}

        <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Pending
          </p>

          <p className="mt-1 text-2xl font-bold text-amber-600">
            {pendingRequests}
          </p>

        </div>


        {/* APPROVED */}

        <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Approved
          </p>

          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {approvedRequests}
          </p>

        </div>


        {/* REJECTED */}

        <div className="rounded-xl border border-rose-100 bg-white p-4 shadow-sm">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Rejected
          </p>

          <p className="mt-1 text-2xl font-bold text-rose-600">
            {rejectedRequests}
          </p>

        </div>

      </div>


      {/* ====================================================== */}
      {/* MAIN GRID */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

        {/* ==================================================== */}
        {/* LEAVE APPLICATION FORM */}
        {/* ==================================================== */}

        <div className="card bg-white p-6 shadow-xs lg:col-span-1">

          <div className="mb-5 flex items-center gap-2 text-indigo-600">

            <HiOutlineDocumentAdd className="h-5 w-5" />

            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800">
              Apply for Leave
            </h2>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* LEAVE TYPE */}

            <div>

              <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-500">
                Leave Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full"
              >

                <option value="ANNUAL">
                  Annual Leave
                </option>

                <option value="CASUAL">
                  Casual Leave
                </option>

                <option value="SICK">
                  Sick Leave
                </option>

              </select>

            </div>


            {/* START DATE */}

            <div>

              <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-500">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full"
              />

            </div>


            {/* END DATE */}

            <div>

              <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-500">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={
                  formData.startDate ||
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full"
              />

            </div>


            {/* REASON */}

            <div>

              <label className="mb-1.5 block text-xs font-semibold uppercase text-slate-500">
                Reason Description
              </label>

              <textarea
                name="reason"
                rows={4}
                placeholder="Explain reason for leave..."
                value={formData.reason}
                onChange={handleChange}
                className="w-full resize-none"
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {formData.reason.length}/500
              </p>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-2 flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}

            </button>

          </form>

        </div>


        {/* ==================================================== */}
        {/* LEAVE HISTORY */}
        {/* ==================================================== */}

        <div className="card overflow-hidden bg-white shadow-xs lg:col-span-2">

          {/* HEADER */}

          <div className="flex items-center gap-2 border-b border-slate-100 p-5 text-slate-700">

            <HiOutlineClock className="h-5 w-5 text-slate-400" />

            <div>

              <h3 className="text-sm font-semibold">
                Your Time-Off Requests
              </h3>

              <p className="mt-0.5 text-xs text-slate-400">
                View the status of your leave applications.
              </p>

            </div>

          </div>


          {/* TABLE */}

          {leaves.length === 0 ? (

            <div className="p-12 text-center">

              <div className="mb-3 text-4xl">
                📋
              </div>

              <p className="text-sm font-medium text-slate-500">
                No leave applications yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Your submitted leave requests will appear here.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="table-modern w-full">

                <thead>

                  <tr>

                    <th>
                      Type
                    </th>

                    <th>
                      Duration
                    </th>

                    <th>
                      Days
                    </th>

                    <th>
                      Reason
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {leaves.map((leave) => (

                    <tr key={leave._id}>

                      {/* TYPE */}

                      <td className="text-xs font-semibold tracking-wider text-slate-700">

                        {getLeaveTypeLabel(
                          leave.type
                        )}

                      </td>


                      {/* DURATION */}

                      <td className="whitespace-nowrap text-xs text-slate-500">

                        {new Date(
                          leave.startDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}

                        {" - "}

                        {new Date(
                          leave.endDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}

                      </td>


                      {/* DAYS */}

                      <td className="text-xs font-medium text-slate-600">

                        {calculateLeaveDays(
                          leave.startDate,
                          leave.endDate
                        )}

                        {" "}
                        {calculateLeaveDays(
                          leave.startDate,
                          leave.endDate
                        ) === 1
                          ? "day"
                          : "days"}

                      </td>


                      {/* REASON */}

                      <td
                        className="max-w-[220px] truncate text-xs text-slate-600"
                        title={leave.reason}
                      >
                        {leave.reason}
                      </td>


                      {/* STATUS */}

                      <td>
                        {getStatusBadge(
                          leave.status
                        )}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default EmployeeLeave;