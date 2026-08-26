import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineSave,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Admin profile
  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "9000000000",
    position: "System Administrator",
  });

  // Password
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // System preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    leaveNotifications: true,
    attendanceNotifications: true,
    payrollNotifications: true,
  });

  // ============================================================
  // PROFILE HANDLERS
  // ============================================================

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileData.firstName || !profileData.lastName) {
      toast.error("First name and last name are required.");
      return;
    }

    if (!profileData.email) {
      toast.error("Email address is required.");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      toast.success("Admin profile updated successfully.");
      setIsSaving(false);
    }, 800);
  };

  // ============================================================
  // PASSWORD HANDLERS
  // ============================================================

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      toast.success("Admin password updated successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setIsSaving(false);
    }, 800);
  };

  // ============================================================
  // PREFERENCE HANDLER
  // ============================================================

  const handlePreferenceChange = (
    key: keyof typeof preferences
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    toast.success("Preference updated.");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div>
        <h1 className="page-title">Admin Settings</h1>

        <p className="page-subtitle">
          Manage your administrator profile, security, and system
          preferences.
        </p>
      </div>

      {/* ======================================================
          ADMIN PROFILE
      ====================================================== */}

      <div className="card bg-white shadow-xs overflow-hidden">

        <div className="p-5 border-b border-slate-100 flex items-center gap-3">

          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
            <HiOutlineUser className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Administrator Profile
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Manage your administrator account information.
            </p>
          </div>

        </div>

        <form
          onSubmit={handleProfileSubmit}
          className="p-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* First Name */}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                First Name
              </label>

              <div className="relative">

                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg px-3 py-2.5 pl-10 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              </div>
            </div>

            {/* Last Name */}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Last Name
              </label>

              <div className="relative">

                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg px-3 py-2.5 pl-10 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              </div>
            </div>

            {/* Email */}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Email Address
              </label>

              <div className="relative">

                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg px-3 py-2.5 pl-10 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              </div>
            </div>

            {/* Phone */}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Phone Number
              </label>

              <div className="relative">

                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg px-3 py-2.5 pl-10 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              </div>
            </div>

            {/* Position */}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Position
              </label>

              <input
                type="text"
                value={profileData.position}
                disabled
                className="w-full bg-slate-50 text-slate-500 text-sm rounded-lg px-3 py-2.5 border border-slate-200 cursor-not-allowed"
              />

              <p className="text-[11px] text-slate-400 mt-1">
                Administrator role is managed by the system.
              </p>
            </div>

          </div>

          {/* Save */}

          <div className="mt-6 pt-5 border-t border-slate-100 flex justify-end">

            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiOutlineSave className="w-4 h-4" />

              {isSaving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

      {/* ======================================================
          PASSWORD / SECURITY
      ====================================================== */}

      <div className="card bg-white shadow-xs overflow-hidden">

        <div className="p-5 border-b border-slate-100 flex items-center gap-3">

          <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600">
            <HiOutlineLockClosed className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Security
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Change your administrator password.
            </p>
          </div>

        </div>

        <form
          onSubmit={handlePasswordSubmit}
          className="p-6"
        >

          <div className="max-w-xl space-y-5">

            {/* Current Password */}

            <div>

              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full bg-white text-slate-800 text-sm rounded-lg px-3 py-2.5 pr-10 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPassword ? (
                    <HiOutlineEyeOff className="w-4 h-4" />
                  ) : (
                    <HiOutlineEye className="w-4 h-4" />
                  )}
                </button>

              </div>

            </div>

            {/* New Password */}

            <div>

              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full bg-white text-slate-800 text-sm rounded-lg px-3 py-2.5 pr-10 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? (
                    <HiOutlineEyeOff className="w-4 h-4" />
                  ) : (
                    <HiOutlineEye className="w-4 h-4" />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Confirm New Password
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full bg-white text-slate-800 text-sm rounded-lg px-3 py-2.5 pr-10 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <HiOutlineEyeOff className="w-4 h-4" />
                  ) : (
                    <HiOutlineEye className="w-4 h-4" />
                  )}
                </button>

              </div>

            </div>

            {/* Security Notice */}

            <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-4">

              <div className="flex gap-3">

                <HiOutlineShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />

                <div>

                  <p className="text-xs font-semibold text-indigo-800">
                    Administrator Security
                  </p>

                  <p className="text-xs text-indigo-600 mt-1">
                    Administrator accounts have access to sensitive
                    employee and payroll information. Keep your
                    password secure and never share it.
                  </p>

                </div>

              </div>

            </div>

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiOutlineLockClosed className="w-4 h-4" />

                {isSaving
                  ? "Updating..."
                  : "Update Password"}
              </button>

            </div>

          </div>

        </form>

      </div>

      {/* ======================================================
          SYSTEM NOTIFICATIONS
      ====================================================== */}

      <div className="card bg-white shadow-xs overflow-hidden">

        <div className="p-5 border-b border-slate-100 flex items-center gap-3">

          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
            <HiOutlineBell className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              System Notifications
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Choose which system events you want to receive.
            </p>
          </div>

        </div>

        <div className="divide-y divide-slate-100">

          {/* Email Notifications */}

          <div className="flex items-center justify-between gap-4 p-5">

            <div>
              <p className="text-sm font-medium text-slate-700">
                Email Notifications
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Receive important system notifications through email.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handlePreferenceChange("emailNotifications")
              }
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                preferences.emailNotifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
                  preferences.emailNotifications
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              />
            </button>

          </div>

          {/* Leave Notifications */}

          <div className="flex items-center justify-between gap-4 p-5">

            <div>
              <p className="text-sm font-medium text-slate-700">
                Leave Requests
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Get notified when employees submit leave requests.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handlePreferenceChange("leaveNotifications")
              }
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                preferences.leaveNotifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
                  preferences.leaveNotifications
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              />
            </button>

          </div>

          {/* Attendance Notifications */}

          <div className="flex items-center justify-between gap-4 p-5">

            <div>
              <p className="text-sm font-medium text-slate-700">
                Attendance Alerts
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Receive notifications about employee attendance.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handlePreferenceChange("attendanceNotifications")
              }
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                preferences.attendanceNotifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
                  preferences.attendanceNotifications
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              />
            </button>

          </div>

          {/* Payroll Notifications */}

          <div className="flex items-center justify-between gap-4 p-5">

            <div>
              <p className="text-sm font-medium text-slate-700">
                Payroll Notifications
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Receive notifications about payroll processing.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handlePreferenceChange("payrollNotifications")
              }
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                preferences.payrollNotifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
                  preferences.payrollNotifications
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              />
            </button>

          </div>

        </div>

      </div>

      {/* ======================================================
          SYSTEM INFORMATION
      ====================================================== */}

      <div className="card bg-white shadow-xs overflow-hidden">

        <div className="p-5 border-b border-slate-100 flex items-center gap-3">

          <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600">
            <HiOutlineCog className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              System Information
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Basic information about the employee management system.
            </p>
          </div>

        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Application
            </p>

            <p className="text-sm font-semibold text-slate-700 mt-1">
              Employee Management System
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Account Type
            </p>

            <p className="text-sm font-semibold text-indigo-600 mt-1">
              Administrator
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              System Status
            </p>

            <span className="inline-flex items-center gap-1.5 mt-1 badge badge-success">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Operational
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminSettings;