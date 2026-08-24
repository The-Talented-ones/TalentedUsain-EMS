import { Link } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineUserCircle,
  HiOutlineLogin,
  HiOutlinePlusCircle,
  HiOutlineTrendingUp,
} from "react-icons/hi";

// Import the required Recharts graph rendering elements
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

interface EmployeeDashboardProps {
  data: {
    currentMonthAttendance: number;
    pendingLeaves: number;
    latestPayslip: {
      netSalary: number;
    } | null;
    employee: {
      firstName: string;
      lastName: string;
      position: string;
      department: string;
    };
  };
}

const EmployeeDashboard = ({ data }: EmployeeDashboardProps) => {
  const emp = data?.employee;

  // 1. Mock tracking database dataset for our graphical analysis trends (Last 6 Months)
  const chartData = [
    { month: "Mar", PresentDays: 22, LeavesTaken: 1, NetSalary: 2000 },
    { month: "Apr", PresentDays: 20, LeavesTaken: 2, NetSalary: 2000 },
    { month: "May", PresentDays: 23, LeavesTaken: 0, NetSalary: 2000 },
    { month: "Jun", PresentDays: 18, LeavesTaken: 4, NetSalary: 2000 },
    { month: "Jul", PresentDays: 21, LeavesTaken: 1, NetSalary: 2000 },
    {
      month: "Aug",
      PresentDays: data?.currentMonthAttendance || 20,
      LeavesTaken: data?.pendingLeaves || 2,
      NetSalary: data?.latestPayslip?.netSalary || 2000,
    },
  ];

  const cards = [
    {
      icon: HiOutlineCalendar,
      value: data?.currentMonthAttendance || 0,
      title: "Days Present",
      subtitle: "This month",
      colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: HiOutlineDocumentText,
      value: data?.pendingLeaves || 0,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
      colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: HiOutlineCreditCard,
      value: data?.latestPayslip
        ? `$${data.latestPayslip.netSalary.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent Payout",
      colorClass: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Profile Greeting Card */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 rounded-2xl border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <HiOutlineUserCircle className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Welcome back, {emp?.firstName || "Employee"}! 👋
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {emp?.position} •{" "}
              <span className="text-indigo-400 font-medium">
                {emp?.department}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/attendance"
            className="btn-primary flex items-center gap-2 py-2 text-xs shadow-none shrink-0"
          >
            <HiOutlineLogin className="w-4 h-4" />
            <span>Clock In / Out</span>
          </Link>
          <Link
            to="/leave"
            className="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all duration-200 px-4 py-2 rounded-md text-xs font-medium flex items-center gap-2 shrink-0"
          >
            <HiOutlinePlusCircle className="w-4 h-4 text-indigo-400" />
            <span>Request Leave</span>
          </Link>
        </div>
      </div>

      {/* Analytics KPI Stat Grid Card Containers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="card card-hover p-6 flex flex-col justify-between min-h-[1400] bg-white shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight mt-2 tabular-nums">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl border ${card.colorClass} shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{card.subtitle}</span>
                <span className="text-slate-300 font-normal">Active Cycle</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Visual Graphs and Charts Dashboard Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends - Interactive Area Spline Graph */}
        <div className="card p-6 bg-white shadow-xs lg:col-span-2 flex flex-col justify-between min-h-[350px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <HiOutlineTrendingUp className="text-indigo-500 w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Attendance & Leave Trends
              </h3>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
              6-Month History
            </span>
          </div>

          <div className="w-full h-64 text-xs font-medium">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLeaves" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    borderRadius: "8px",
                    color: "#fff",
                    border: "none",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Area
                  type="monotone"
                  dataKey="PresentDays"
                  name="Days Present"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPresent)"
                />
                <Area
                  type="monotone"
                  dataKey="LeavesTaken"
                  name="Leaves Taken"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLeaves)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Distribution - Bar Graph */}
        <div className="card p-6 bg-white shadow-xs lg:col-span-1 flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
              Salary Status
            </h3>
            <p className="text-xs text-slate-400">
              Stable income tracking distributions
            </p>
          </div>

          <div className="w-full h-64 text-xs font-medium mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    borderRadius: "8px",
                    color: "#fff",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="NetSalary"
                  name="Net Payout ($)"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
