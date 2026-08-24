import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineUser,
} from "react-icons/hi";

import { dummyEmployeeData } from "../assets/asset";

const EmployeeProfile = () => {
  // Temporary logged-in employee
  const employee = dummyEmployeeData[0];

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    bio: employee.bio,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary frontend update
    // Later this will call your backend API
    setIsEditing(false);

    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      bio: employee.bio,
    });

    setIsEditing(false);
  };

  const fullName = `${formData.firstName} ${formData.lastName}`;

  const initials = `${formData.firstName.charAt(
    0,
  )}${formData.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your personal information
        </p>
      </div>

      {/* Profile Header */}
      <div className="overflow-hidden pt-12 items-center  h-52 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 rounded-xl border border-slate-200 bg-white">
        {/* <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950" /> */}

        <div className="px-6 ">
          <div className=" flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-sm">
                {initials}
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-white">{fullName}</h2>

                <p className="text-sm font-bold text-indigo-500">
                  {employee.position}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                  {employee.employmentStatus.replace("_", " ")}
                </span>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <HiOutlinePencil className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <HiOutlineUser className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Personal Information
                </h3>

                <p className="text-xs text-slate-500">
                  Your personal contact information
                </p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-5">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      First Name
                    </label>

                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>

                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Bio
                  </label>

                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    placeholder="Tell us something about yourself..."
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name */}
                <div className="flex items-start gap-3">
                  <HiOutlineUser className="mt-0.5 h-5 w-5 text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-400">Full Name</p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {fullName}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <HiOutlineMail className="mt-0.5 h-5 w-5 text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-400">Email Address</p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {formData.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <HiOutlinePhone className="mt-0.5 h-5 w-5 text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-400">Phone Number</p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {formData.phone}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex items-start gap-3 sm:col-span-2">
                  <HiOutlineUser className="mt-0.5 h-5 w-5 text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-400">Bio</p>

                    <p className="mt-1 text-sm text-slate-700">
                      {formData.bio || "No bio added yet."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Employment Information */}
        <div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-5 font-semibold text-slate-900">
              Employment Information
            </h3>

            <div className="space-y-5">
              {/* Employee ID */}
              <div className="flex items-start gap-3">
                <HiOutlineBriefcase className="mt-0.5 h-5 w-5 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">Employee ID</p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {employee.id}
                  </p>
                </div>
              </div>

              {/* Position */}
              <div className="flex items-start gap-3">
                <HiOutlineBriefcase className="mt-0.5 h-5 w-5 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">Position</p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {employee.position}
                  </p>
                </div>
              </div>

              {/* Department */}
              <div className="flex items-start gap-3">
                <HiOutlineOfficeBuilding className="mt-0.5 h-5 w-5 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">Department</p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {employee.department}
                  </p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-start gap-3">
                <HiOutlineCalendar className="mt-0.5 h-5 w-5 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">Join Date</p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {new Date(employee.joinDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="border-t border-slate-100 pt-5">
                <p className="text-xs text-slate-400">Employment Status</p>

                <span className="mt-2 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                  {employee.employmentStatus.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Information */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-5 font-semibold text-slate-900">Compensation</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Basic Salary</p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              ₦{employee.basicSalary.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Allowances</p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              ₦{employee.allowances.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Deductions</p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              ₦{employee.deductions.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
