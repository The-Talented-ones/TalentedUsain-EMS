import { useState } from "react";
import { toast } from "react-hot-toast";
import { 
  HiOutlineUsers, 
  HiOutlineOfficeBuilding, 
  HiOutlineCheckCircle, 
  HiOutlineClipboardList,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineTrendingUp
} from "react-icons/hi";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { dummyLeaveData } from "../assets/asset";

interface AdminDashboardProps {
  data: {
    role: string;
    totalEmployees: number;
    totalDepartments: number;
    todayAttendance: number;
    pendingLeaves: number;
  };
}

const AdminDashboard = ({ data }: AdminDashboardProps) => {
  // Pulling running state from your dummy leave data for the manager workspace approval loops
  const [leaveRequests, setLeaveRequests] = useState(
    dummyLeaveData.filter(req => req.status === "PENDING")
  );

  // 1. Mock aggregate organizational overview graph dataset (Last 6 Months)
  const analyticsData = [
    { month: "Mar", ActiveStaff: 15, ApprovedLeaves: 2, PayrollK$: 30 },
    { month: "Apr", ActiveStaff: 18, ApprovedLeaves: 5, PayrollK$: 38 },
    { month: "May", ActiveStaff: 20, ApprovedLeaves: 1, PayrollK$: 42 },
    { month: "Jun", ActiveStaff: 22, ApprovedLeaves: 8, PayrollK$: 45 },
    { month: "Jul", ActiveStaff: 25, ApprovedLeaves: 3, PayrollK$: 52 },
    { month: "Aug", ActiveStaff: data?.totalEmployees || 26, ApprovedLeaves: 4, PayrollK$: 55 },
  ];

  const statCards = [
    {
      title: "Total Workforce",
      value: data?.totalEmployees || 0,
      icon: HiOutlineUsers,
      colorClass: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Departments",
      value: data?.totalDepartments || 0,
      icon: HiOutlineOfficeBuilding,
      colorClass: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Today's Attendance",
      value: data?.todayAttendance || 0,
      icon: HiOutlineCheckCircle,
      colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Pending Leaves",
      value: leaveRequests.length,
      icon: HiOutlineClipboardList,
      colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ];

  const handleLeaveAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setLeaveRequests(prev => prev.filter(req => req._id !== id));
    if (action === "APPROVED") {
      toast.success("Leave request has been successfully approved.");
    } else {
      toast.error("Leave request has been rejected.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title Greetings Header */}
      <div className="page-header">
        <h1 className="page-title">Administrative Dashboard</h1>
        <p className="page-subtitle">Complete systemic control, operational metrics, and team management tracking.</p>
      </div>

      {/* KPI Metric Stat Blocks Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="card card-hover p-6 bg-white shadow-xs flex items-center justify-between min-h-[110px]">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.title}</p>
                <p className="text-3xl font-bold text-slate-900 tracking-tight mt-1.5 tabular-nums">{card.value}</p>
              </div>
              <div className={`p-3.5 rounded-2xl border ${card.colorClass} shadow-xs shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Composed Graphical Analysis Trends */}
      <div className="card p-6 bg-white shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HiOutlineTrendingUp className="text-indigo-500 w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Organizational Growth & Staffing Trends</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">6-Month Trend Overview</span>
        </div>

        <div className="w-full h-80 text-xs font-medium">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={analyticsData} margin={{ top: 10, right: -10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
              <YAxis yAxisId="left" stroke="#94a3b8" tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px' }} />
              {/* Bars track human assets on left Y-Axis axis */}
              <Bar yAxisId="left" dataKey="ActiveStaff" name="Total Headcount" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={25} />
              {/* Line charts tracks resource expenditure metrics on right Y-Axis axis */}
              <Line yAxisId="right" type="monotone" dataKey="PayrollK$" name="Gross Payroll (k$)" stroke="#d946ef" strokeWidth={2.5} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Leave Requests Manager Approvals Decision Table */}
      <div className="card bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Pending Leave Operations</h3>
            <p className="text-xs text-slate-400 mt-0.5">Staff requests requiring managerial approval</p>
          </div>
          <span className="badge badge-warning font-semibold tabular-nums">{leaveRequests.length} Actions Required</span>
        </div>

        {leaveRequests.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm font-medium">
            ✨ No outstanding leave approvals remaining. Excellent job!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Timeline Duration</th>
                  <th>Reason Description</th>
                  <th className="text-right">Decision Controls</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((req: any) => {
                  // Standard structural array check mapping to prevent undefined crashes
                  const staff = Array.isArray(req.employee) ? req.employee[0] : req.employee;
                  const fullName = staff ? `${staff.firstName} ${staff.lastName}` : "Unknown Employee";
                  const position = staff ? staff.position : "Staff Associate";
                  
                  return (
                    <tr key={req._id}>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{fullName}</span>
                          <span className="text-[11px] text-slate-400 mt-0.5">{position}</span>
                        </div>
                      </td>
                      <td className="font-medium text-xs tracking-wider text-slate-700">{req.type}</td>
                      <td className="text-slate-500 text-xs">
                        {new Date(req.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(req.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="text-slate-600 max-w-[240px] truncate text-xs">{req.reason}</td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleLeaveAction(req._id, "APPROVED")}
                            className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white rounded-lg transition-all duration-150"
                            title="Approve Request"
                          >
                            <HiOutlineCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleLeaveAction(req._id, "REJECTED")}
                            className="p-1.5 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white rounded-lg transition-all duration-150"
                            title="Reject Request"
                          >
                            <HiOutlineX className="w-4 h-4" />
                          </button>
                        </div>
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

export default AdminDashboard;
