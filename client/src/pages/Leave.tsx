import { useEffect, useState } from "react";
import Loading from "../component/Loading";
import EmployeeLeave from "../component/EmployeeLeave";
import AdminLeave from "../component/AdminLeave";

const Leave = () => {
  const [role, setRole] = useState<"ADMIN" | "EMPLOYEE" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary role for testing
    // Change to "ADMIN" to test the Admin Leave page
    setRole("ADMIN");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!role) {
    return (
      <p className="text-center text-slate-500 py-16">
        Unable to determine user role.
      </p>
    );
  }

  if (role === "ADMIN") {
    return <AdminLeave />;
  }

  return <EmployeeLeave />;
};

export default Leave;