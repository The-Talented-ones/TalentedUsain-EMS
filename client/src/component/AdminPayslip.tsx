import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineCreditCard,
  HiOutlinePrinter,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineUsers,
} from "react-icons/hi";
import { dummyAdminPayslipData } from "../assets/asset";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  image: string | null;
}

interface PayslipRecord {
  _id: string;
  employeeId: string;
  month: number;
  year: number;

  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;

  status: string;
  paymentDate: string;

  id: string;

  employee: Employee;
}

const AdminPayslip = () => {
 const [payslips] = useState<PayslipRecord[]>(
  dummyAdminPayslipData
);

  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedEmployee, setSelectedEmployee] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

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

  // ------------------------------------------------------------
  // UNIQUE EMPLOYEES
  // ------------------------------------------------------------

  const employees = useMemo(() => {
    const employeeMap = new Map<string, Employee>();

    payslips.forEach((slip) => {
      if (slip.employee) {
        employeeMap.set(slip.employee._id, slip.employee);
      }
    });

    return Array.from(employeeMap.values());
  }, [payslips]);

  // ------------------------------------------------------------
  // FILTER PAYSLIPS
  // ------------------------------------------------------------

  const filteredPayslips = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return payslips.filter((slip) => {
      const employee = slip.employee;

      const employeeName = employee
        ? `${employee.firstName} ${employee.lastName}`
        : "";

      const matchesSearch =
        !search ||
        employeeName.toLowerCase().includes(search) ||
        employee?.email?.toLowerCase().includes(search) ||
        employee?.department?.toLowerCase().includes(search) ||
        employee?.position?.toLowerCase().includes(search) ||
        slip.month.toString().includes(search) ||
        slip.year.toString().includes(search);

      const matchesYear =
        selectedYear === "ALL" ||
        slip.year.toString() === selectedYear;

      const matchesEmployee =
        selectedEmployee === "ALL" ||
        slip.employeeId === selectedEmployee;

      return matchesSearch && matchesYear && matchesEmployee;
    });
  }, [payslips, searchTerm, selectedYear, selectedEmployee]);

  // ------------------------------------------------------------
  // PAYROLL STATISTICS
  // ------------------------------------------------------------

  const totalPayout = filteredPayslips.reduce(
    (sum, slip) => sum + slip.netSalary,
    0
  );

  const totalBasicSalary = filteredPayslips.reduce(
    (sum, slip) => sum + slip.basicSalary,
    0
  );

  const totalAllowances = filteredPayslips.reduce(
    (sum, slip) => sum + slip.allowances,
    0
  );

  const totalDeductions = filteredPayslips.reduce(
    (sum, slip) => sum + slip.deductions,
    0
  );

  const totalEmployees = new Set(
    filteredPayslips.map((slip) => slip.employeeId)
  ).size;

  // ------------------------------------------------------------
  // MONTH NAME
  // ------------------------------------------------------------

  const getMonthName = (month: number) => {
    const index = month - 1;

    return index >= 0 && index < 12
      ? monthNames[index]
      : `M-${month}`;
  };

  // ------------------------------------------------------------
  // STATUS BADGE
  // ------------------------------------------------------------

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
            Paid
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
            Pending
          </span>
        );

      case "PROCESSING":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
            Processing
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="page-title">Payroll Management</h1>

          <p className="page-subtitle">
            Review employee payroll statements, compensation breakdowns,
            and payment records.
          </p>
        </div>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL PAYOUT */}

        <div className="card flex min-h-[120px] items-center justify-between bg-white p-5 shadow-xs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Net Payout
            </p>

            <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
              ${totalPayout.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Across filtered records
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-3.5 text-indigo-500">
            <HiOutlineCreditCard className="h-6 w-6" />
          </div>
        </div>

        {/* EMPLOYEES */}

        <div className="card flex min-h-[120px] items-center justify-between bg-white p-5 shadow-xs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Employees
            </p>

            <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
              {totalEmployees}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              With payroll records
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-emerald-500">
            <HiOutlineUsers className="h-6 w-6" />
          </div>
        </div>

        {/* BASIC SALARY */}

        <div className="card flex min-h-[120px] items-center justify-between bg-white p-5 shadow-xs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Basic Salary
            </p>

            <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
              ${totalBasicSalary.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Total base compensation
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3.5 text-blue-500">
            <HiOutlineTrendingUp className="h-6 w-6" />
          </div>
        </div>

        {/* DEDUCTIONS */}

        <div className="card flex min-h-[120px] items-center justify-between bg-white p-5 shadow-xs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Deductions
            </p>

            <p className="mt-1.5 text-2xl font-bold tracking-tight text-rose-600 tabular-nums">
              ${totalDeductions.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Payroll deductions
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-rose-500">
            <HiOutlineShieldCheck className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* ======================================================
          PAYROLL LEDGER
      ====================================================== */}

      <div className="card overflow-hidden bg-white shadow-xs">

        {/* HEADER */}

        <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Employee Payroll Ledger
            </h3>

            <p className="mt-0.5 text-xs text-slate-400">
              {filteredPayslips.length} payroll records displayed
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <HiOutlineCalendar className="h-4 w-4" />

            <span>
              Allowances:{" "}
              <strong className="text-emerald-600">
                +${totalAllowances.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>

        {/* ====================================================
            SEARCH + FILTERS
        ==================================================== */}

        <div className="border-b border-slate-200 bg-slate-50/50 p-4">

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

            {/* SEARCH */}

            <div className="relative">

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employee, department..."
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              />

              <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            </div>

            {/* YEAR FILTER */}

            <div className="relative">

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-800 outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Fiscal Years</option>

                <option value="2026">
                  Fiscal Year 2026
                </option>
              </select>

              <HiOutlineCalendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            </div>

            {/* EMPLOYEE FILTER */}

            <div className="relative">

              <select
                value={selectedEmployee}
                onChange={(e) =>
                  setSelectedEmployee(e.target.value)
                }
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-800 outline-none focus:border-indigo-500"
              >
                <option value="ALL">
                  All Employees
                </option>

                {employees.map((employee) => (
                  <option
                    key={employee._id}
                    value={employee._id}
                  >
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>

              <HiOutlineFilter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            </div>

          </div>
        </div>

        {/* ====================================================
            TABLE
        ==================================================== */}

        {filteredPayslips.length === 0 ? (

          <div className="p-16 text-center">

            <div className="mb-3 text-4xl">
              💸
            </div>

            <p className="text-sm font-medium text-slate-500">
              No payroll records found
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
                    Period
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Basic Salary
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Allowances
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Deductions
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Net Salary
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredPayslips.map((slip) => {

                  const employee = slip.employee;

                  const employeeName = employee
                    ? `${employee.firstName} ${employee.lastName}`
                    : "Unknown Employee";

                  const initials = employee
                    ? `${employee.firstName?.[0] ?? ""}${employee.lastName?.[0] ?? ""}`
                    : "?";

                  return (

                    <tr
                      key={slip._id}
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
                              {initials}
                            </div>

                          )}

                          <div>

                            <p className="text-sm font-medium text-slate-800">
                              {employeeName}
                            </p>

                            <p className="text-xs text-slate-400">
                              {employee?.department || "No department"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* PERIOD */}

                      <td className="px-4 py-4">

                        <div className="flex flex-col">

                          <span className="font-semibold text-slate-900">
                            {getMonthName(slip.month)} {slip.year}
                          </span>

                          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                            ID: {slip.id.substring(0, 12)}
                          </span>

                        </div>

                      </td>

                      {/* BASIC */}

                      <td className="px-4 py-4 text-xs font-medium tabular-nums text-slate-600">
                        ${slip.basicSalary.toLocaleString()}
                      </td>

                      {/* ALLOWANCES */}

                      <td className="px-4 py-4 text-xs font-medium tabular-nums text-emerald-600">
                        +${slip.allowances.toLocaleString()}
                      </td>

                      {/* DEDUCTIONS */}

                      <td className="px-4 py-4 text-xs font-medium tabular-nums text-rose-600">
                        -${slip.deductions.toLocaleString()}
                      </td>

                      {/* NET */}

                      <td className="px-4 py-4">

                        <span className="text-sm font-bold tabular-nums text-slate-900">
                          ${slip.netSalary.toLocaleString()}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-4 py-4">
                        {getStatusBadge(slip.status)}
                      </td>

                      {/* ACTION */}

                      <td className="px-4 py-4 text-right">

                        <Link
                          to={`/print/payslip/${slip._id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                          title="View printable payslip"
                        >
                          <HiOutlinePrinter className="h-3.5 w-3.5" />

                          <span className="hidden sm:inline">
                            View
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

export default AdminPayslip;