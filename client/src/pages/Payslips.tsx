import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HiOutlineCreditCard, 
  HiOutlinePrinter, 
  HiOutlineTrendingUp, 
  HiOutlineCalendar,
  HiOutlineShieldCheck
} from "react-icons/hi";
import { dummyPayslipData } from "../assets/asset";

const Payslips = () => {
  // Pulling running state from your dummy dataset tracking arrays
  const [payslips] = useState(dummyPayslipData);
  const [selectedYear, setSelectedYear] = useState("ALL");

  // Helper dictionary utility mapping integer indices safely into string values
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Filter matrix logic parsing target fiscal periods
  const filteredPayslips = payslips.filter((slip) => {
    return selectedYear === "ALL" || slip.year.toString() === selectedYear;
  });

  // Calculate cumulative net compensation payouts dynamically across active lists
  const totalPayout = filteredPayslips.reduce((sum, slip) => sum + slip.netSalary, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title Greetings Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Payroll Statements</h1>
          <p className="page-subtitle">Review historical compensation metrics, breakdown allocations, and download ledger sheets.</p>
        </div>
        
        {/* Year Filter Dropdown selection control */}
        <div className="shrink-0 self-start sm:self-center">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white text-slate-800 text-sm rounded-md px-4 py-2 border border-slate-200 outline-none focus:border-indigo-500 transition-all font-medium"
          >
            <option value="ALL">All Fiscal Years</option>
            <option value="2026">Fiscal Year 2026</option>
          </select>
        </div>
      </div>

      {/* Financial Trend Tracking KPI summary block cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-white shadow-xs flex items-center justify-between min-h-[110px]">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Disbursed Net</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-1.5 tabular-nums">
              ${totalPayout.toLocaleString()}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl border text-indigo-500 bg-indigo-500/10 border-indigo-500/20 shadow-xs shrink-0">
            <HiOutlineCreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-6 bg-white shadow-xs flex items-center justify-between min-h-[110px]">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Pay Cycles</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-1.5 tabular-nums">
              {filteredPayslips.length}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl border text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-xs shrink-0">
            <HiOutlineCalendar className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-6 bg-white shadow-xs flex items-center justify-between min-h-[110px]">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliance Security</p>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="badge badge-success font-semibold flex items-center gap-1">
                <HiOutlineShieldCheck className="w-3.5 h-3.5"/> Verified Audit
              </span>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl border text-purple-500 bg-purple-500/10 border-purple-500/20 shadow-xs shrink-0">
            <HiOutlineTrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Modern Ledger Table Panel Container */}
      <div className="card bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-800">Compensation Statements Ledger</h3>
        </div>

        {filteredPayslips.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-sm font-medium">
            💸 No payroll statements were mapped under this historical fiscal filter tier.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Statement Period</th>
                  <th>Base Gross ($)</th>
                  <th>Allowances (+)</th>
                  <th>Deductions (-)</th>
                  <th>Net Payout ($)</th>
                  <th className="text-right">Action Reports</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayslips.map((slip) => {
                  // Resolve safe lookup index mapping offsets
                  const monthIndex = slip.month - 1;
                  const monthLabel = monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : `M-${slip.month}`;
                  
                  return (
                    <tr key={slip._id}>
                      {/* Statement Period details tag */}
                      <td>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{monthLabel} {slip.year}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 tracking-wide uppercase font-mono">ID: {slip.id.substr(0, 8)}</span>
                        </div>
                      </td>

                      {/* Base Gross Comp numeric lines */}
                      <td className="text-slate-600 text-xs font-medium tabular-nums">
                        ${slip.basicSalary.toLocaleString()}
                      </td>

                      {/* Positive Additions metric fields */}
                      <td className="text-emerald-600 text-xs font-medium tabular-nums">
                        +${slip.allowances.toLocaleString()}
                      </td>

                      {/* Negative Deductions ledger layers */}
                      <td className="text-rose-600 text-xs font-medium tabular-nums">
                        -${slip.deductions.toLocaleString()}
                      </td>

                      {/* Sum Net payout aggregate value */}
                      <td>
                        <span className="text-sm font-bold text-slate-900 tabular-nums">
                          ${slip.netSalary.toLocaleString()}
                        </span>
                      </td>

                      {/* Print Navigation routing dynamic buttons */}
                      <td className="text-right">
                        <Link
                          to={`/print/payslip/${slip._id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 rounded-lg text-xs font-semibold transition-all duration-150 shadow-xs"
                          title="Generate Printable PDF Invoice"
                        >
                          <HiOutlinePrinter className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">View Statement</span>
                        </Link>
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

export default Payslips;
