import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineCreditCard,
  HiOutlinePrinter,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { dummyEmployeePayslipData } from "../assets/asset";

const EmployeePayslip = () => {
  const [payslips] = useState(dummyEmployeePayslipData);
  const [selectedYear, setSelectedYear] = useState("ALL");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const filteredPayslips = payslips.filter(
    (slip) =>
      selectedYear === "ALL" || slip.year.toString() === selectedYear
  );

  const totalPayout = filteredPayslips.reduce(
    (sum, slip) => sum + slip.netSalary,
    0
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">My Payslips</h1>

          <p className="page-subtitle">
            Review your salary history, compensation breakdown, and payslip
            statements.
          </p>
        </div>

        <div>
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

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-white shadow-xs flex items-center justify-between min-h-[110px]">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Net Salary
            </p>

            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
              ${totalPayout.toLocaleString()}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border text-indigo-500 bg-indigo-500/10 border-indigo-500/20">
            <HiOutlineCreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-6 bg-white shadow-xs flex items-center justify-between min-h-[110px]">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pay Cycles
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-1.5">
              {filteredPayslips.length}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border text-emerald-500 bg-emerald-500/10 border-emerald-500/20">
            <HiOutlineCalendar className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-6 bg-white shadow-xs flex items-center justify-between min-h-[110px]">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Security
            </p>

            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="badge badge-success font-semibold flex items-center gap-1">
                <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border text-purple-500 bg-purple-500/10 border-purple-500/20">
            <HiOutlineTrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Payslip History */}
      <div className="card bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-800">
            My Compensation Statements
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Your salary and payment history
          </p>
        </div>

        {filteredPayslips.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-sm font-medium">
            No payslip statements found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Statement Period</th>
                  <th>Base Salary</th>
                  <th>Allowances</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayslips.map((slip) => {
                  const monthIndex = slip.month - 1;

                  const monthLabel =
                    monthIndex >= 0 && monthIndex < 12
                      ? monthNames[monthIndex]
                      : `M-${slip.month}`;

                  return (
                    <tr key={slip._id}>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">
                            {monthLabel} {slip.year}
                          </span>

                          <span className="text-[10px] text-slate-400 mt-0.5">
                            ID: {slip.id.substring(0, 8)}
                          </span>
                        </div>
                      </td>

                      <td className="text-slate-600 text-xs font-medium">
                        ${slip.basicSalary.toLocaleString()}
                      </td>

                      <td className="text-emerald-600 text-xs font-medium">
                        +${slip.allowances.toLocaleString()}
                      </td>

                      <td className="text-rose-600 text-xs font-medium">
                        -${slip.deductions.toLocaleString()}
                      </td>

                      <td>
                        <span className="text-sm font-bold text-slate-900">
                          ${slip.netSalary.toLocaleString()}
                        </span>
                      </td>

                      <td className="text-right">
                        <Link
                          to={`/print/payslip/${slip._id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 rounded-lg text-xs font-semibold transition-all"
                        >
                          <HiOutlinePrinter className="w-3.5 h-3.5" />

                          <span className="hidden sm:inline">
                            View Statement
                          </span>
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

export default EmployeePayslip;