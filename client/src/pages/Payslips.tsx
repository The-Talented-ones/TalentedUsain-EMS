import { useEffect, useState } from "react";
import Loading from "../component/Loading";
import EmployeePayslip from "../component/EmployeePayslip";
import AdminPayslip from "../component/AdminPayslip";
import { dummyEmployeePayslipData } from "../assets/asset";

const Payslip = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Employee data for testing
    setData({
      role: "EMPLOYEE",
      payslips: dummyEmployeePayslipData,
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <p className="text-center text-slate-500 py-16">
        Failed to load payslip data.
      </p>
    );
  }

  if (data.role === "ADMIN") {
    return <AdminPayslip />;
  }

  return <EmployeePayslip />;
};

export default Payslip;