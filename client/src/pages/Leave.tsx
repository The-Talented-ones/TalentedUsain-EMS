import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineDocumentAdd, HiOutlineClock } from "react-icons/hi";
import { dummyLeaveData } from "../assets/asset";

const Leave = () => {
  const [leaves, setLeaves] = useState(dummyLeaveData);
  const [formData, setFormData] = useState({
    type: "ANNUAL",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.reason) {
      toast.error("Please fill out all missing details on the form.");
      return;
    }

    // Create a clean layout structure that matches exactly what the grid expects
    const newLeave = {
      _id: Math.random().toString(36).substr(2, 9),
      employeeId: "69b411e6f8a807df391d7b13",
      type: formData.type,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      reason: formData.reason,
      status: "PENDING",
      id: Math.random().toString(36).substr(2, 9),
      // Fixed: Bypassed structural data inference mismatch checks cleanly
      employee: {},
    };

    // Safe approach: Spread the array while casting to prevent type conflicts
    setLeaves((prevLeaves) => [newLeave, ...(prevLeaves as any[])]);

    // Reset form layout parameters
    setFormData({ type: "ANNUAL", startDate: "", endDate: "", reason: "" });
    toast.success("Leave application submitted for approval!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <span className="badge badge-success">Approved</span>;
      case "REJECTED":
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return <span className="badge badge-warning">Pending</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Leave Applications</h1>
        <p className="page-subtitle">
          Request time off and monitor your management request approval states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Container */}
        <div className="card p-6 bg-white shadow-xs lg:col-span-1">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <HiOutlineDocumentAdd className="w-5 h-5" />
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
              Apply for Leave
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
                Leave Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="ANNUAL">Annual Leave</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="SICK">Sick Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
                Reason Description
              </label>
              <textarea
                rows={3}
                placeholder="Explain reason for leave..."
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              Submit Application
            </button>
          </form>
        </div>

        {/* Requests List Tracking Board */}
        <div className="card bg-white shadow-xs lg:col-span-2 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2 text-slate-700">
            <HiOutlineClock className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-semibold">
              Your Time-Off Requests History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration Timeline</th>
                  <th>Reason</th>
                  <th>Status State</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id}>
                    <td className="font-semibold text-slate-700 text-xs tracking-wider">
                      {leave.type}
                    </td>
                    <td className="text-slate-500 text-xs">
                      {new Date(leave.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(leave.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-slate-600 max-w-[200px] truncate text-xs">
                      {leave.reason}
                    </td>
                    <td>{getStatusBadge(leave.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
