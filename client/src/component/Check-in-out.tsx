import { HiOutlineClock, HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { toast } from "react-hot-toast";

interface CheckInOutProps {
  currentStatus: "CHECKED_OUT" | "CHECKED_IN";
  onCheckIn: () => void;
  onCheckOut: () => void;
  isLoading?: boolean;
}

const CheckInOut = ({ 
  currentStatus, 
  onCheckIn, 
  onCheckOut, 
  isLoading = false 
}: CheckInOutProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Shift Status Action Control
        </h2>
        <span className={`
          px-2.5 py-1 rounded-full text-xs font-medium
          ${currentStatus === "CHECKED_IN" 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-slate-100 text-slate-600'
          }
        `}>
          {currentStatus === "CHECKED_IN" ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Status Display */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`
          p-3 rounded-xl border transition-all duration-300
          ${currentStatus === "CHECKED_IN" 
            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-lg shadow-emerald-500/10" 
            : "bg-slate-100 text-slate-400 border-slate-200"
          }
        `}>
          <HiOutlineClock className={`w-6 h-6 ${currentStatus === "CHECKED_IN" ? "animate-pulse" : ""}`} />
        </div>
        
        <div>
          <p className="text-sm font-bold text-slate-900">
            {currentStatus === "CHECKED_IN" ? "On the Clock" : "Shift Inactive"}
          </p>
          <p className="text-xs text-slate-400">
            {currentStatus === "CHECKED_IN"
              ? "Your working hours are being recorded"
              : "Punch in to start your shift"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {currentStatus === "CHECKED_OUT" ? (
          <button
            onClick={onCheckIn}
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center gap-2 px-5 py-2.5 
              rounded-lg text-sm font-medium text-white
              bg-indigo-600 hover:bg-indigo-700 
              shadow-lg shadow-indigo-600/20 
              transition-all duration-200 
              active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <HiOutlineLogin className="w-4 h-4" />
            {isLoading ? 'Processing...' : 'Check In'}
          </button>
        ) : (
          <button
            onClick={onCheckOut}
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center gap-2 px-5 py-2.5 
              rounded-lg text-sm font-medium text-white
              bg-rose-600 hover:bg-rose-700 
              shadow-lg shadow-rose-600/20 
              transition-all duration-200 
              active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <HiOutlineLogout className="w-4 h-4" />
            {isLoading ? 'Processing...' : 'Check Out'}
          </button>
        )}
      </div>

      {/* Status Message */}
      {currentStatus === "CHECKED_IN" && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-xs text-emerald-700 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            You are currently checked in. Remember to check out when you finish your shift.
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckInOut;