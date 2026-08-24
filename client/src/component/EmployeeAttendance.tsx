import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  dummyEmployeeAttendanceData,
} from "../assets/asset";

import CheckInOut from "./Check-in-out";
import AttendanceHistory from "./AttendanceHistory";

interface AttendanceLog {
  _id: string;
  employeeId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  workingHours: number;
}

const CURRENT_EMPLOYEE_ID = "69b411e6f8a807df391d7b13";

const EmployeeAttendance = () => {
  const [attendanceList, setAttendanceList] =
    useState<AttendanceLog[]>(
      dummyEmployeeAttendanceData
    );

  const [isLoading, setIsLoading] = useState(false);

  // ------------------------------------------------------------
  // TODAY'S ATTENDANCE
  // ------------------------------------------------------------

  const todayRecord = useMemo(() => {
    const today = new Date();

    return (
      attendanceList.find((log) => {
        const logDate = new Date(log.date);

        return (
          logDate.getFullYear() === today.getFullYear() &&
          logDate.getMonth() === today.getMonth() &&
          logDate.getDate() === today.getDate()
        );
      }) || null
    );
  }, [attendanceList]);

  // ------------------------------------------------------------
  // CURRENT STATUS
  // ------------------------------------------------------------

  const currentStatus: "CHECKED_OUT" | "CHECKED_IN" =
    todayRecord?.checkIn && !todayRecord?.checkOut
      ? "CHECKED_IN"
      : "CHECKED_OUT";

  // ------------------------------------------------------------
  // TOTAL HOURS
  // ------------------------------------------------------------

  const totalHours = useMemo(() => {
    return attendanceList.reduce(
      (sum, log) => sum + (log.workingHours || 0),
      0
    );
  }, [attendanceList]);

  // ------------------------------------------------------------
  // PRESENT DAYS
  // ------------------------------------------------------------

  const presentDays = useMemo(() => {
    return attendanceList.filter(
      (log) => log.status === "PRESENT"
    ).length;
  }, [attendanceList]);

  // ------------------------------------------------------------
  // ATTENDANCE PERCENTAGE
  // ------------------------------------------------------------

  const attendancePercentage =
    attendanceList.length > 0
      ? Math.round(
          (presentDays / attendanceList.length) * 100
        )
      : 0;

  // ------------------------------------------------------------
  // CHECK IN
  // ------------------------------------------------------------

  const handleCheckIn = () => {
    if (todayRecord) {
      toast.error("You already have an attendance record for today.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const now = new Date();

      const newRecord: AttendanceLog = {
        _id: `attendance-${Date.now()}`,
        employeeId: CURRENT_EMPLOYEE_ID,
        date: now.toISOString(),
        checkIn: now.toISOString(),
        checkOut: null,
        status: "PRESENT",
        workingHours: 0,
      };

      setAttendanceList((prev) => [
        newRecord,
        ...prev,
      ]);

      toast.success(
        "Successfully checked in for today!"
      );

      setIsLoading(false);
    }, 800);
  };

  // ------------------------------------------------------------
  // CHECK OUT
  // ------------------------------------------------------------

  const handleCheckOut = () => {
    if (!todayRecord?.checkIn) {
      toast.error(
        "You have not checked in today."
      );
      return;
    }

    if (todayRecord.checkOut) {
      toast.error(
        "You have already checked out today."
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const now = new Date();

      const checkInTime = new Date(
        todayRecord.checkIn!
      );

      const difference =
        now.getTime() - checkInTime.getTime();

      const workingHours =
        Math.round(
          (difference / (1000 * 60 * 60)) * 100
        ) / 100;

      setAttendanceList((prev) =>
        prev.map((log) =>
          log._id === todayRecord._id
            ? {
                ...log,
                checkOut: now.toISOString(),
                workingHours,
              }
            : log
        )
      );

      toast.success(
        "Successfully checked out! Have a great evening."
      );

      setIsLoading(false);
    }, 800);
  };

  // ------------------------------------------------------------
  // DELETE ATTENDANCE
  // ------------------------------------------------------------



  return (
    <div className="space-y-6 animate-fade-in">

      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            My Attendance
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your attendance, working hours and daily check-ins.
          </p>
        </div>

        {/* QUICK STATUS */}
        <div className="flex items-center gap-4 text-sm">

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">

            <span className="text-slate-400">
              Today:
            </span>

            <span
              className={`font-semibold ${
                currentStatus === "CHECKED_IN"
                  ? "text-emerald-600"
                  : "text-slate-600"
              }`}
            >
              {currentStatus === "CHECKED_IN"
                ? "Checked In"
                : "Checked Out"}
            </span>

          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">

            <span className="text-slate-400">
              Total Hours:
            </span>

            <span className="font-semibold text-slate-700">
              {totalHours.toFixed(2)}h
            </span>

          </div>

        </div>
      </div>

      {/* CHECK IN / QUICK STATS */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="lg:col-span-1">
          <CheckInOut
            currentStatus={currentStatus}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:col-span-2">

          {/* TOTAL DAYS */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Total Days
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-800">
              {attendanceList.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Attendance records
            </p>

          </div>

          {/* PRESENT DAYS */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Present Days
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-600">
              {presentDays}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {attendancePercentage}% attendance
            </p>

          </div>

          {/* TOTAL HOURS */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Total Hours
            </p>

            <p className="mt-1 text-2xl font-bold text-indigo-600">
              {totalHours.toFixed(2)}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Hours logged
            </p>

          </div>

        </div>
      </div>

      {/* ATTENDANCE HISTORY */}

      <AttendanceHistory
        attendanceList={attendanceList}
        
      />

    </div>
  );
};

export default EmployeeAttendance;