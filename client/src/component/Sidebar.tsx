import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { dummyProfileData } from "../assets/asset";

// REPLACED: Importing clean, reliable matching variants from react-icons/hi
import { 
  HiOutlineViewGrid, 
  HiOutlineUsers, 
  HiOutlineCalendar, 
  HiOutlineDocumentText, 
  HiOutlineCreditCard, 
  HiOutlineAdjustments, 
  HiOutlineLogout 
} from "react-icons/hi";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (dummyProfileData && dummyProfileData.firstName) {
      setUserName(`${dummyProfileData.firstName} ${dummyProfileData.lastName}`);
    }
  }, []);

  // Automatically close the sidebar when clicking any navigation link on mobile
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hooked up the react-icons references inside your layout array
  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
    { path: "/employees", label: "Employees", icon: HiOutlineUsers },
    { path: "/attendance", label: "Attendance", icon: HiOutlineCalendar },
    { path: "/leave", label: "Leave", icon: HiOutlineDocumentText },
    { path: "/payslips", label: "Payslips", icon: HiOutlineCreditCard },
    { path: "/settings", label: "Settings", icon: HiOutlineAdjustments }
  ];

  return (
    <>
      {/* Mobile Hamburger Button - Hidden on Desktop (md screens and up) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-slate-800 focus:outline-none"
        aria-label="Open Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Backdrop Overlay - Dims background when sidebar is open */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Responsive Sidebar Navigation Container */}
      <aside
        className={`
            fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col h-screen border-r border-slate-800 shrink-0
            transition-transform duration-300 ease-in-out md:static md:translate-x-0
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header section with Close Button for mobile */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full mr-2">
            {/* Gradient Background Effect */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl"></div>

            {/* Main Content */}
            <div className="relative">
              {/* Brand Section */}
              <div className="flex items-center gap-3">
                {/* Logo Badge */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 ring-1 ring-white/10">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-sm font-bold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                      TalentedUsain
                    </span>
                    <span className="text-slate-300 block text-[11px] font-medium tracking-normal mt-0.5">Employee Portal</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button - Hidden on Desktop */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 text-slate-400 hover:text-white focus:outline-none shrink-0"
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Profile Card Section */}
        <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/20">
          <div className="flex items-center gap-3">
            {/* Avatar + Status Ring */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-0.5 ring-1 ring-indigo-500/20">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-xs font-semibold text-indigo-400">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
              </div>
              {/* Online Status Dot */}
              <div className="absolute -bottom-0.5 -right-0.5">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
              </div>
            </div>

            {/* Profile Information text layout */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {userName || "Loading..."}
              </p>
              <p className="text-[10px] text-emerald-400 font-medium">Online</p>
            </div>
          </div>
        </div>

        {/* Navigation links grid loops */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider mb-3 px-2">
            Main Menu
          </p>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const IconComponent = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/10"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* LogOut Footer Actions */}
        <div className="p-4 border-t border-slate-800">
          <Link
            to="/login"
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md text-sm transition-all duration-150"
          >
            <HiOutlineLogout className="w-4 h-4 shrink-0" />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
