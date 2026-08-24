import { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiDownload,
  FiX,
} from "react-icons/fi";

import {
  dummyAdminEmployeeData,
  DEPARTMENTS,
} from "../assets/asset";

import type { EmployeeType } from "../assets/asset";

import EmployeeForm from "./EmployeeForm";
import type { EmployeeFormData } from "./EmployeeForm";

const AdminEmployeeProfile = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>(
    dummyAdminEmployeeData,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] =
    useState<EmployeeType | null>(null);

  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // ============================================================
  // FILTER EMPLOYEES
  // ============================================================

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const search = searchTerm.toLowerCase();

      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.id.toLowerCase().includes(search) ||
        employee.position.toLowerCase().includes(search);

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        employee.employmentStatus === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  // ============================================================
  // STATISTICS
  // ============================================================

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.employmentStatus === "ACTIVE",
  ).length;

  const onLeaveEmployees = employees.filter(
    (employee) => employee.employmentStatus === "ON_LEAVE",
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) =>
      employee.employmentStatus === "INACTIVE" ||
      employee.employmentStatus === "SUSPENDED",
  ).length;

  // ============================================================
  // ADD EMPLOYEE
  // ============================================================

  const handleAddEmployee = (employeeData: EmployeeFormData) => {
  const timestamp = Date.now();

  const newEmployee: EmployeeType = {
    ...employeeData,

    _id: `emp-${timestamp}`,
    id: `emp-${timestamp}`,

    userId: {
      _id: `user-${timestamp}`,
      email: employeeData.email,
      role: "EMPLOYEE",
    },

    user: {
      email: employeeData.email,
      role: "EMPLOYEE",
    },

    image: null,
    isDeleted: false,
    bio: "",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    joinDate: new Date().toISOString(),

    employmentStatus:
      employeeData.employmentStatus
        .toUpperCase()
        .replace(" ", "_"),
  };

  setEmployees((prev) => [...prev, newEmployee]);

  setShowForm(false);
};

  // ============================================================
  // EDIT EMPLOYEE
  // ============================================================

 const handleEditEmployee = (employeeData: EmployeeFormData) => {
  if (!editingEmployee) return;

  setEmployees((prev) =>
    prev.map((employee) =>
      employee._id === editingEmployee._id
        ? {
            ...employee,

            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            phone: employeeData.phone,
            position: employeeData.position,
            department: employeeData.department,

            basicSalary: employeeData.basicSalary,
            allowances: employeeData.allowances,
            deductions: employeeData.deductions,

            employmentStatus:
              employeeData.employmentStatus
                .toUpperCase()
                .replace(" ", "_"),

            updatedAt: new Date().toISOString(),
          }
        : employee,
    ),
  );

  setEditingEmployee(null);
  setShowForm(false);
};

  // ============================================================
  // DELETE EMPLOYEE
  // ============================================================

  const handleDeleteEmployee = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) return;

    setEmployees((prev) =>
      prev.filter((employee) => employee._id !== id),
    );

    setSelectedEmployees((prev) =>
      prev.filter((employeeId) => employeeId !== id),
    );
  };

  // ============================================================
  // SELECT EMPLOYEE
  // ============================================================

  const handleSelectEmployee = (id: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(id)
        ? prev.filter((employeeId) => employeeId !== id)
        : [...prev, id],
    );
  };

  // ============================================================
  // SELECT ALL
  // ============================================================

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(
        filteredEmployees.map((employee) => employee._id),
      );
    }
  };

  // ============================================================
  // BULK DELETE
  // ============================================================

  const handleBulkDelete = () => {
    if (!selectedEmployees.length) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedEmployees.length} employee(s)?`,
    );

    if (!confirmed) return;

    setEmployees((prev) =>
      prev.filter(
        (employee) => !selectedEmployees.includes(employee._id),
      ),
    );

    setSelectedEmployees([]);
  };

  // ============================================================
  // EXPORT CSV
  // ============================================================

  const handleExport = () => {
    const headers = [
      "Employee ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Department",
      "Position",
      "Basic Salary",
      "Allowances",
      "Deductions",
      "Status",
      "Join Date",
    ];

    const rows = filteredEmployees.map((employee) => [
      employee.id,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.phone,
      employee.department,
      employee.position,
      employee.basicSalary,
      employee.allowances,
      employee.deductions,
      employee.employmentStatus,
      employee.joinDate,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "employees.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ============================================================
  // FORM CANCEL
  // ============================================================

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  // ============================================================
  // OPEN EDIT
  // ============================================================

  const openEditForm = (employee: EmployeeType) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // ============================================================
  // OPEN ADD
  // ============================================================

  const openAddForm = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Employees
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your organization's employees
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <FiDownload size={17} />
            Export
          </button>

          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <FiPlus size={18} />
            Add Employee
          </button>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Employees
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {totalEmployees}
              </h2>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <FiUsers size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {activeEmployees}
              </h2>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <FiUserCheck size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">On Leave</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {onLeaveEmployees}
              </h2>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
              <FiUserCheck size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Inactive</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {inactiveEmployees}
              </h2>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <FiUserX size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH / FILTER */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="All">All Departments</option>

            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="All">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* BULK ACTION */}

      {selectedEmployees.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">
            {selectedEmployees.length} employee
            {selectedEmployees.length > 1 ? "s" : ""} selected
          </p>

          <button
            onClick={handleBulkDelete}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <FiTrash2 size={16} />
            Delete Selected
          </button>
        </div>
      )}

      {/* EMPLOYEE TABLE */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={
                      filteredEmployees.length > 0 &&
                      selectedEmployees.length ===
                        filteredEmployees.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Employee
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Position
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Salary
                </th>

                <th className="px-5 py-4 font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-5 py-4 text-right font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(
                          employee._id,
                        )}
                        onChange={() =>
                          handleSelectEmployee(employee._id)
                        }
                      />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                          {employee.firstName.charAt(0)}
                          {employee.lastName.charAt(0)}
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {employee.firstName}{" "}
                            {employee.lastName}
                          </p>

                          <p className="text-xs text-slate-500">
                            {employee.id}
                          </p>

                          <p className="text-xs text-slate-400">
                            {employee.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {employee.department}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {employee.position}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      ₦{employee.basicSalary.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          employee.employmentStatus === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : employee.employmentStatus ===
                                "ON_LEAVE"
                              ? "bg-amber-100 text-amber-700"
                              : employee.employmentStatus ===
                                  "SUSPENDED"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {employee.employmentStatus.replace(
                          "_",
                          " ",
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            openEditForm(employee)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                          title="Edit employee"
                        >
                          <FiEdit2 size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteEmployee(employee._id)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          title="Delete employee"
                        >
                          <FiTrash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <FiUsers
                        size={40}
                        className="text-slate-300"
                      />

                      <p className="mt-3 font-medium text-slate-600">
                        No employees found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EMPLOYEE FORM */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <button
              onClick={handleCancelForm}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              title="Close"
            >
              <FiX size={20} />
            </button>

            <EmployeeForm
              initialData={editingEmployee || undefined}
              onSubmit={
                editingEmployee
                  ? handleEditEmployee
                  : handleAddEmployee
              }
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployeeProfile;