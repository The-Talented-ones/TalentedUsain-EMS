import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineLogin,
  HiOutlineLogout,
} from "react-icons/hi";
import { dummyAttendanceData } from "../assets/asset";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState(dummyAttendanceData);
  const [currentStatus, setCurrentStatus] = useState<
    "CHECKED_OUT" | "CHECKED_IN"
  >("CHECKED_OUT");
  const [todayRecord, setTodayRecord] = useState<any>(null);

  const handleCheckIn = () => {
    const now = new Date();
    const newRecord = {
      _id: Math.random().toString(36).substr(2, 9),
      employeeId: "69b411e6f8a807df391d7b13",
      date: now.toISOString(),
      checkIn: now.toISOString(),
      checkOut: null,
      status: "PRESENT",
      workingHours: 0,
    };

    setTodayRecord(newRecord);

    // FIXED: Explicit functional state update with type casting to prevent array mismatch blocks
    setAttendanceList((prevList) => [newRecord, ...(prevList as any[])]);

    setCurrentStatus("CHECKED_IN");
    toast.success("Successfully checked in for today!");
  };

  const handleCheckOut = () => {
    if (!todayRecord) return;

    const now = new Date();
    const updatedList = attendanceList.map((item) => {
      if (item._id === todayRecord._id) {
        return {
          ...item,
          checkOut: now.toISOString(),
          workingHours: 8, // Mocked completed cycle shift hours
        };
      }
      return item;
    });

    setAttendanceList(updatedList);
    setCurrentStatus("CHECKED_OUT");
    setTodayRecord(null);
    toast.success("Successfully checked out! Have a great evening.");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance Tracking</h1>
        <p className="page-subtitle">
          Log your shift timestamps and track your working hours.
        </p>
      </div>

      {/* Action Control Punch Card Component */}
      <div className="card p-6 bg-white shadow-xs max-w-md">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Shift Status Action Control
        </h2>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl border ${currentStatus === "CHECKED_IN" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-slate-100 text-slate-400 border-slate-200"}`}
            >
              <HiOutlineClock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {currentStatus === "CHECKED_IN"
                  ? "On the Clock"
                  : "Shift Inactive"}
              </p>
              <p className="text-xs text-slate-400">
                {currentStatus === "CHECKED_IN"
                  ? "Your working hours are recording"
                  : "Punch in to start working"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {currentStatus === "CHECKED_OUT" ? (
            <button
              onClick={handleCheckIn}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <HiOutlineLogin className="w-4 h-4" /> Check In
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-md text-sm transition-all duration-200 shadow-md shadow-rose-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <HiOutlineLogout className="w-4 h-4" /> Check Out
            </button>
          )}
        </div>
      </div>

      {/* History Log Tables Dashboard Panel */}
      <div className="card bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">
            Attendance Log History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In Time</th>
                <th>Check Out Time</th>
                <th>Status</th>
                <th>Hours Logged</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((log) => (
                <tr key={log._id}>
                  <td className="font-medium text-slate-900">
                    {new Date(log.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="text-slate-500">
                    {log.checkIn
                      ? new Date(log.checkIn).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                  <td className="text-slate-500">
                    {log.checkOut
                      ? new Date(log.checkOut).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                  <td>
                    <span className="badge badge-success flex items-center gap-1 w-max">
                      <HiOutlineCheckCircle className="w-3 h-3" /> {log.status}
                    </span>
                  </td>
                  <td className="font-semibold text-slate-700 tabular-nums">
                    {log.workingHours
                      ? `${log.workingHours} hrs`
                      : "Running..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
