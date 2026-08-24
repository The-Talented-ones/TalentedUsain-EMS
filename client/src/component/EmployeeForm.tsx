import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { DEPARTMENTS } from '../assets/asset';
import { HiOutlineCheck, HiOutlineEye, HiOutlineEyeOff, HiOutlineKey } from 'react-icons/hi';

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  employmentStatus: string;
  password?: string;
  confirmPassword?: string;
}

interface EmployeeFormProps {
  initialData?: Partial<EmployeeFormData> & { _id?: string };
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  isAdmin?: boolean;
}

const EmployeeForm = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isAdmin = true 
}: EmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    employmentStatus: 'Active',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    label: string;
    color: string;
  }>({ score: 0, label: 'Weak', color: 'bg-red-500' });

  const isEditMode = !!initialData?._id;

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        position: initialData.position || '',
        department: initialData.department || '',
        basicSalary: initialData.basicSalary || 0,
        allowances: initialData.allowances || 0,
        deductions: initialData.deductions || 0,
        employmentStatus: initialData.employmentStatus || 'Active',
        password: '',
        confirmPassword: '',
      });
    }
  }, [initialData]);

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strengthMap = [
      { score: 0, label: 'Very Weak', color: 'bg-red-500' },
      { score: 1, label: 'Weak', color: 'bg-orange-500' },
      { score: 2, label: 'Fair', color: 'bg-yellow-500' },
      { score: 3, label: 'Good', color: 'bg-blue-500' },
      { score: 4, label: 'Strong', color: 'bg-green-500' },
      { score: 5, label: 'Very Strong', color: 'bg-emerald-500' },
    ];

    const strength = strengthMap.find(s => s.score === score) || strengthMap[0];
    setPasswordStrength(strength);
    return score;
  };

  // Generate random password
  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setFormData(prev => ({
      ...prev,
      password: newPassword,
      confirmPassword: newPassword,
    }));
    checkPasswordStrength(newPassword);
    toast.success('Password generated successfully!');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s-+()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (formData.basicSalary < 0) newErrors.basicSalary = 'Salary cannot be negative';
    if (formData.allowances < 0) newErrors.allowances = 'Allowances cannot be negative';
    if (formData.deductions < 0) newErrors.deductions = 'Deductions cannot be negative';

    // Password validation - only for new employees or when password is provided
    if (!isEditMode || formData.password) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Remove confirmPassword from data before submitting
      const { confirmPassword, ...submitData } = formData;
      onSubmit(submitData);
    } else {
      toast.error('Please fix the form errors');
    }
  };

  const handleChange = (field: keyof EmployeeFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Check password strength when password changes
    if (field === 'password' && typeof value === 'string') {
      checkPasswordStrength(value);
    }
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const statusOptions = ['Active', 'Inactive', 'On Leave', 'Terminated', 'Probation'];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Personal Information */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.firstName
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-rose-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.lastName
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-rose-500">{errors.lastName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Phone <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Password Section - Only for Admin */}
      {isAdmin && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Account Security
            {!isEditMode && <span className="text-xs text-rose-500 font-normal">* Required for new employees</span>}
          </h3>
          
          <div className="space-y-4">
            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-600">
                  Password {!isEditMode && <span className="text-rose-500">*</span>}
                </label>
                {!isEditMode && (
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                  >
                    <HiOutlineKey className="w-3 h-3" />
                    Generate Password
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all pr-10 ${
                    errors.password
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                  }`}
                  placeholder={isEditMode ? 'Leave blank to keep current password' : 'Enter password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-4 h-4" />
                  ) : (
                    <HiOutlineEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-500">{errors.password}</p>
              )}

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength.score >= 4 ? 'text-emerald-600' :
                      passwordStrength.score >= 3 ? 'text-blue-600' :
                      passwordStrength.score >= 2 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <ul className="grid grid-cols-2 gap-1 text-[10px] text-slate-500">
                    <li className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-emerald-600' : ''}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      Min 8 characters
                    </li>
                    <li className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      Upper & Lowercase
                    </li>
                    <li className={`flex items-center gap-1 ${/\d/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${/\d/.test(formData.password) ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      Contains number
                    </li>
                    <li className={`flex items-center gap-1 ${/[^a-zA-Z0-9]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${/[^a-zA-Z0-9]/.test(formData.password) ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      Special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            {formData.password && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Confirm Password {!isEditMode && <span className="text-rose-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all pr-10 ${
                      errors.confirmPassword
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                    }`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <HiOutlineEyeOff className="w-4 h-4" />
                    ) : (
                      <HiOutlineEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword}</p>
                )}
                {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                    <HiOutlineCheck className="w-3 h-3" />
                    Passwords match
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Employment Details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
          Employment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Position <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.position
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="Enter position"
            />
            {errors.position && (
              <p className="mt-1 text-xs text-rose-500">{errors.position}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Department <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.department
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-xs text-rose-500">{errors.department}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Employment Status
            </label>
            <select
              value={formData.employmentStatus}
              onChange={(e) => handleChange('employmentStatus', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Compensation */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
          Compensation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Basic Salary ($)
            </label>
            <input
              type="number"
              value={formData.basicSalary}
              onChange={(e) => handleChange('basicSalary', parseFloat(e.target.value) || 0)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.basicSalary
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="0"
              min="0"
              step="100"
            />
            {errors.basicSalary && (
              <p className="mt-1 text-xs text-rose-500">{errors.basicSalary}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Allowances ($)
            </label>
            <input
              type="number"
              value={formData.allowances}
              onChange={(e) => handleChange('allowances', parseFloat(e.target.value) || 0)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.allowances
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="0"
              min="0"
              step="100"
            />
            {errors.allowances && (
              <p className="mt-1 text-xs text-rose-500">{errors.allowances}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Deductions ($)
            </label>
            <input
              type="number"
              value={formData.deductions}
              onChange={(e) => handleChange('deductions', parseFloat(e.target.value) || 0)}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.deductions
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
              placeholder="0"
              min="0"
              step="100"
            />
            {errors.deductions && (
              <p className="mt-1 text-xs text-rose-500">{errors.deductions}</p>
            )}
          </div>
        </div>

        {/* Net Salary Preview */}
        <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Net Salary:</span>
            <span className="font-bold text-indigo-600">
              ${(formData.basicSalary + formData.allowances - formData.deductions).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-200 flex items-center gap-2"
        >
          <HiOutlineCheck className="w-4 h-4" />
          {isEditMode ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;