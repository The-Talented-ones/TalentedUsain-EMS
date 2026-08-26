import EmployeeSettings from "../component/EmployeeSettings";
import AdminSettings from "../component/AdminSettings";

const Settings = () => {
  // Replace this with your actual authenticated user
  const userRole = "EMPLOYEE"; // Change to "EMPLOYEE" to test employee view

  if (userRole === "EMPLOYEE") {
    return <EmployeeSettings />;
  }

  return <AdminSettings />;
};

export default Settings;