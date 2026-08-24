import { useEffect, useState } from "react"
import { dummyEmployeeDashboardData } from "../assets/asset" // Change to dummyAdminDashboardData here to test Admin view
import Loading from "../component/Loading"
import EmployeeDashboard from "../component/EmployeeDashboard"
import AdminDashboard from "../component/AdminDashboard"

const Dashboard = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    setData(dummyEmployeeDashboardData)
    
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />
  if (!data) return <p className="text-center text-slate-500 py-16">Failed to load dashboard data.</p>

  
  if (data?.role === "ADMIN") {
    return <AdminDashboard data={data} />
  } else {
    return <EmployeeDashboard data={data} />
  }
}

export default Dashboard
