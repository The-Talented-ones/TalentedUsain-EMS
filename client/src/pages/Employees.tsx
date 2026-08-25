import { useState, useEffect } from "react";
import EmployeeProfile from "../component/EmployeeProfile";
import Loading from "../component/Loading"; 

const Employee = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    if (isLoading) {
        return <Loading />;
    }

    return <EmployeeProfile />;
};

export default Employee;
