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
} from "react-icons/hi";

const EmployeeSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Replace with logged-in employee data later
  const [profileData, setProfileData] = useState({
    firstName: "TalentedUsain",
    lastName: "Doe",
    email: "talentedusain@example.com",
    phone: "9000000001",
    position: "Senior Software Developer",
    department: "Engineering",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    setTimeout(() => {
      toast.success("Profile information updated successfully.");
      setIsSaving(false);
    }, 800);
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

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      toast.success("Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="page-title">Settings</h1>

        <p className="page-subtitle">
          Manage your personal information and account security.
        </p>
      </div>

      {/* Profile Section */}
      <div className="card bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
            <HiOutlineUser className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Personal Information
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Update your personal account information.
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                First Name
              </label>

              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg py-2.5 pl-11 pr-3 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Last Name
              </label>

              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg py-2.5 pl-11 pr-3 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg py-2.5 pl-11 pr-3 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Phone Number
              </label>

              <div className="relative">
                <HiOutlinePhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full bg-white text-slate-800 text-sm rounded-lg py-2.5 pl-12 pr-3 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
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
                Contact an administrator to change your position.
              </p>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Department
              </label>

              <input
                type="text"
                value={profileData.department}
                disabled
                className="w-full bg-slate-50 text-slate-500 text-sm rounded-lg px-3 py-2.5 border border-slate-200 cursor-not-allowed"
              />

              <p className="text-[11px] text-slate-400 mt-1">
                Contact an administrator to change your department.
              </p>
            </div>
          </div>

          {/* Save Button */}
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

      {/* Password Section */}
      <div className="card bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600">
            <HiOutlineLockClosed className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Change Password
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="p-6">
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
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
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
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? (
                    <HiOutlineEyeOff className="w-4 h-4" />
                  ) : (
                    <HiOutlineEye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mt-1">
                Password must contain at least 6 characters.
              </p>
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
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
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

            <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-4">
              <div className="flex gap-3">
                <HiOutlineShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />

                <div>
                  <p className="text-xs font-semibold text-indigo-800">
                    Account Security
                  </p>

                  <p className="text-xs text-indigo-600 mt-1">
                    Never share your password with another person. Your
                    administrator will never ask for your password.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiOutlineLockClosed className="w-4 h-4" />

                {isSaving ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeSettings;
