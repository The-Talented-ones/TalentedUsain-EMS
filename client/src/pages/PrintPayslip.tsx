import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlinePrinter,
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineCreditCard,
} from "react-icons/hi";

import {
  dummyEmployeePayslipData,
  dummyAdminPayslipData,
  dummyEmployeeData,
} from "../assets/asset";

interface PayslipRecord {
  _id: string;
  employeeId?: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  id?: string;
}

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  image?: string | null;
}

const PrintPayslip = () => {
  const { id } = useParams<{ id: string }>();

  /*
   * Search both datasets.
   *
   * This allows the same page to work for:
   * - Employee payslips
   * - Admin payslips
   */
  const payslip = useMemo(() => {
    const employeePayslip = dummyEmployeePayslipData.find(
      (slip) => slip._id === id
    );

    if (employeePayslip) {
      return employeePayslip as PayslipRecord;
    }

    const adminPayslip = dummyAdminPayslipData.find(
      (slip) => slip._id === id
    );

    if (adminPayslip) {
      return adminPayslip as PayslipRecord;
    }

    return null;
  }, [id]);

  /*
   * Find employee attached to the payslip.
   */
  const employee = useMemo(() => {
    if (!payslip?.employeeId) return null;

    return (
      dummyEmployeeData.find(
        (emp) =>
          emp._id === payslip.employeeId ||
          emp.id === payslip.employeeId
      ) || null
    );
  }, [payslip]);

  /*
   * Month names.
   */
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName =
    payslip && payslip.month >= 1 && payslip.month <= 12
      ? monthNames[payslip.month - 1]
      : "Unknown Month";

  /*
   * Calculate gross salary.
   */
  const grossSalary = payslip
    ? payslip.basicSalary + payslip.allowances
    : 0;

  /*
   * Handle print.
   */
  const handlePrint = () => {
    window.print();
  };

  /*
   * Payslip not found.
   */
  if (!payslip) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center max-w-md w-full">
          <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 flex items-center justify-center mb-4">
            <HiOutlineDocumentText className="w-7 h-7 text-rose-500" />
          </div>

          <h1 className="text-lg font-bold text-slate-800">
            Payslip Not Found
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            The payslip you are looking for does not exist or may have
            been removed.
          </p>

          <Link
            to="/payslip"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Payslips
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 print:bg-white print:p-0">
      {/* ============================
          ACTION BAR
      ============================ */}

      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          to="/payslip"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
        >
          <HiOutlinePrinter className="w-4 h-4" />
          Print Payslip
        </button>
      </div>

      {/* ============================
          PAYSLIP DOCUMENT
      ============================ */}

      <div
        id="payslip-document"
        className="max-w-4xl mx-auto bg-white shadow-sm border border-slate-200 print:border-0 print:shadow-none"
      >
        {/* ============================
            COMPANY HEADER
        ============================ */}

        <div className="px-8 py-7 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <HiOutlineOfficeBuilding className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                   Talented Usain <br /> Employee Management System
                  </h1>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Payroll & Human Resources
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Payslip
              </p>

              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {monthName} {payslip.year}
              </h2>

              <p className="text-xs text-slate-400 mt-1 font-mono">
                ID: {payslip.id || payslip._id}
              </p>
            </div>
          </div>
        </div>

        {/* ============================
            EMPLOYEE INFORMATION
        ============================ */}

        <div className="px-8 py-6 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-5">
            <HiOutlineUser className="w-5 h-5 text-indigo-600" />

            <h3 className="text-sm font-bold text-slate-800">
              Employee Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Employee Name
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {employee
                  ? `${employee.firstName} ${employee.lastName}`
                  : "Unknown Employee"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Employee ID
              </p>

              <p className="text-sm font-medium text-slate-700 mt-1 font-mono">
                {payslip.employeeId || "—"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Department
              </p>

              <p className="text-sm font-medium text-slate-700 mt-1">
                {employee?.department || "—"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Position
              </p>

              <p className="text-sm font-medium text-slate-700 mt-1">
                {employee?.position || "—"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Email
              </p>

              <p className="text-sm font-medium text-slate-700 mt-1">
                {employee?.email || "—"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Pay Period
              </p>

              <div className="flex items-center gap-1.5 mt-1">
                <HiOutlineCalendar className="w-4 h-4 text-slate-400" />

                <p className="text-sm font-medium text-slate-700">
                  {monthName} {payslip.year}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================
            SALARY BREAKDOWN
        ============================ */}

        <div className="px-8 py-6">
          <div className="flex items-center gap-2 mb-5">
            <HiOutlineCreditCard className="w-5 h-5 text-indigo-600" />

            <h3 className="text-sm font-bold text-slate-800">
              Salary Breakdown
            </h3>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Basic Salary */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Basic Salary
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  Base monthly compensation
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                ${payslip.basicSalary.toLocaleString()}
              </p>
            </div>

            {/* Allowances */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Allowances
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  Additional benefits and allowances
                </p>
              </div>

              <p className="text-sm font-semibold text-emerald-600">
                +${payslip.allowances.toLocaleString()}
              </p>
            </div>

            {/* Gross */}

            <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
              <p className="text-sm font-bold text-slate-800">
                Gross Salary
              </p>

              <p className="text-sm font-bold text-slate-900">
                ${grossSalary.toLocaleString()}
              </p>
            </div>

            {/* Deductions */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Deductions
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  Applicable payroll deductions
                </p>
              </div>

              <p className="text-sm font-semibold text-rose-600">
                -${payslip.deductions.toLocaleString()}
              </p>
            </div>

            {/* Net Salary */}

            <div className="flex items-center justify-between px-5 py-5 bg-indigo-50">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-indigo-600">
                  Net Salary
                </p>

                <p className="text-xs text-indigo-500 mt-1">
                  Final amount payable
                </p>
              </div>

              <p className="text-2xl font-bold text-indigo-700">
                ${payslip.netSalary.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* ============================
            PAYMENT STATUS
        ============================ */}

        <div className="mx-8 mb-7 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-800">
              Payroll Statement Verified
            </p>

            <p className="text-xs text-emerald-600 mt-0.5">
              This payslip has been generated from the payroll records.
            </p>
          </div>
        </div>

        {/* ============================
            FOOTER
        ============================ */}

        <div className="px-8 py-5 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[10px] text-slate-400">
              This is a computer-generated payslip and does not require a
              physical signature.
            </p>

            <p className="text-[10px] text-slate-400">
              Generated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPayslip;