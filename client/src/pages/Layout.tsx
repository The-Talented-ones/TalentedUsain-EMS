import { Outlet } from "react-router-dom"
import Sidebar from "../component/Sidebar" 

const Layout = () => {
  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 w-full overflow-hidden">
        {/* Must be capitalized with angle brackets */}
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
            <div className="p-4 pt-16 sm:p-6 sm:pt-6 lg:p-8 max-w-[1400px] mx-auto">
                <Outlet />
            </div>
        </main>
    </div>
  )
}

export default Layout
