export const DEPARTMENTS = [
    "Engineering",
    "Human Resources",
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
    "IT Support",
    "Customer Success",
    "Product Management",
    "Design"
];

export interface ProfileDataType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string | null;
    role?: string;
}

export interface EmployeeType {
    
    _id: string;
    userId: {
        _id: string;
        email: string;
        role: string;
    };
    department: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    basicSalary: number;
    allowances: number;
    deductions: number;
    employmentStatus: string;
    joinDate: string;
    image: string | null;
    isDeleted: boolean;
    bio: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    user: {
        email: string;
        role: string;
    };
}export const dummyAdminDashboardData = {
    role: "ADMIN",
    totalEmployees: 3,
    totalDepartments: 10,
    todayAttendance: 1,
    pendingLeaves: 1,
};

export const dummyEmployeeDashboardData = {
    currentMonthAttendance: 20,
    pendingLeaves: 2,
    latestPayslip: {
        netSalary: 2000,
    },
    employee: {
        firstName: "Oloyede",
        lastName: "Ameer",
        position: "Software Engineer",
        department: "Information Technology",
    },
};

export const dummyProfileData = {
    _id: "69b411e6f8a807df391d7b13",
    firstName: "Oloyede",
    lastName: "Ameer",
    email: "oloyedeameer2k1@gmail.com",
    image: null,
};

export const dummyAdminEmployeeData = [
     {
        _id: "69b414a7f8a807df391d7b58",
        userId: {
            _id: "69b414a7f8a807df391d7b56",
            email: "oloyedeameer@example.com",
            role: "EMPLOYEE",
        },
        department: "Engineering",
        firstName: "Oloyede",
        lastName: "Ameer",
        email: "oloyedeameer2k1@example.com",
        phone: "9000000001",
        position: "Senior SoftWare Engineer",
        basicSalary: 1000,
        allowances: 100,
        deductions: 9.98,
        employmentStatus: "ACTIVE",
        joinDate: "2000-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "",
        createdAt: "2026-03-13T13:44:07.806Z",
        updatedAt: "2026-03-13T13:44:07.806Z",
        id: "001",
        user: {
            email: "oloyedeameer@example.com",
            role: "EMPLOYEE",
        },
    },
    {
        _id: "69b41439f8a807df391d7b52",
        userId: {
            _id: "69b41439f8a807df391d7b50",
            email: "alex@example.com",
            role: "EMPLOYEE",
        },
        department: "Engineering",
        firstName: "Alex",
        lastName: "Matthew",
        email: "alex@example.com",
        phone: "9000000001",
        position: "Software Developer",
        basicSalary: 2000,
        allowances: 100,
        deductions: 20,
        employmentStatus: "ACTIVE",
        joinDate: "2000-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "",
        createdAt: "2026-03-13T13:42:17.589Z",
        updatedAt: "2026-03-13T13:42:17.589Z",
        id: "69b41439f8a807df391d7b52",
        user: {
            email: "alex@example.com",
            role: "EMPLOYEE",
        },
    },
    {
        _id: "69b411e6f8a807df391d7b13",
        userId: {
            _id: "69b411e5f8a807df391d7b11",
            email: "johndoe@example.com",
            role: "EMPLOYEE",
        },
        department: "Engineering",
        firstName: "TalentedUsain",
        lastName: "Doe",
        email: "talentedusain@example.com",
        phone: "9000000001",
        position: "Senior Software Developer",
        basicSalary: 40000,
        allowances: 10000,
        deductions: 2000,
        employmentStatus: "ACTIVE",
        joinDate: "2000-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "Hi, I am dev a full stack web developer",
        createdAt: "2026-03-13T13:32:22.013Z",
        updatedAt: "2026-03-13T13:33:20.498Z",
        id: "69b411e6f8a807df391d7b13",
        user: {
            email: "talentedusain@example.com",
            role: "EMPLOYEE",
        },
    },
];

export const dummyEmployeeData = [
    {
        _id: "emp-001",
        userId: {
            _id: "emp-001",
            email: "oloyedeameer@example.com",
            role: "EMPLOYEE",
        },
        department: "Engineering",
        firstName: "Oloyede",
        lastName: "Ameer",
        email: "oloyedeameer2k1@example.com",
        phone: "9000000001",
        position: "Senior SoftWare Engineer",
        basicSalary: 1000,
        allowances: 100,
        deductions: 9.98,
        employmentStatus: "ACTIVE",
        joinDate: "2000-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "",
        createdAt: "2026-03-13T13:44:07.806Z",
        updatedAt: "2026-03-13T13:44:07.806Z",
        id: "001",
        user: {
            email: "oloyedeameer@example.com",
            role: "EMPLOYEE",
        },
    },
    {
        _id: "emp-002",
        userId: {
            _id: "emp-002",
            email: "alex@example.com",
            role: "EMPLOYEE",
        },
        department: "Engineering",
        firstName: "Alex",
        lastName: "Matthew",
        email: "alex@example.com",
        phone: "9000000001",
        position: "Software Developer",
        basicSalary: 2000,
        allowances: 100,
        deductions: 20,
        employmentStatus: "ACTIVE",
        joinDate: "2000-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "",
        createdAt: "2026-03-13T13:42:17.589Z",
        updatedAt: "2026-03-13T13:42:17.589Z",
        id: "69b41439f8a807df391d7b52",
        user: {
            email: "alex@example.com",
            role: "EMPLOYEE",
        },
    },
    {
        _id: "emp-003",
        userId: {
            _id: "emp-003",
            email: "talentedusain@example.com",
            role: "EMPLOYEE",
        },
        department: "Engineering",
        firstName: "TalentedUsain",
        lastName: "Doe",
        email: "talentedusain@example.com",
        phone: "9000000001",
        position: "Senior Software Developer",
        basicSalary: 40000,
        allowances: 10000,
        deductions: 2000,
        employmentStatus: "ACTIVE",
        joinDate: "2000-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "Hi, I am dev a full stack web developer",
        createdAt: "2026-03-13T13:32:22.013Z",
        updatedAt: "2026-03-13T13:33:20.498Z",
        id: "69b411e6f8a807df391d7b13",
        user: {
            email: "talentedusain@example.com",
            role: "EMPLOYEE",
        },
    },
    {
        _id: "emp-004",
        userId: {
            _id: "emp-004",
            email: "alex@example.com",
            role: "EMPLOYEE",
        },
        department: "Engineering",
        firstName: "Alex",
        lastName: "Matthew",
        email: "alex@example.com",
        phone: "9000000001",
        position: "Software Developer",
        basicSalary: 2000,
        allowances: 100,
        deductions: 20,
        employmentStatus: "ACTIVE",
        joinDate: "2000-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "",
        createdAt: "2026-03-13T13:42:17.589Z",
        updatedAt: "2026-03-13T13:42:17.589Z",
        id: "69b41439f8a807df391d7b52",
        user: {
            email: "alex@example.com",
            role: "EMPLOYEE",
        },
    },
];

export const dummyLeaveData = [
    {
        _id: "emp-001",
        employeeId: "emp-001",
        type: "ANNUAL",
        startDate: "2026-03-27T00:00:00.000Z",
        endDate: "2026-03-29T00:00:00.000Z",
        reason: "Out for a trip",
        status: "APPROVED",
        createdAt: "2026-03-13T13:51:22.716Z",
        updatedAt: "2026-03-13T13:51:43.139Z",
        id: "69b4165af8a807df391d7bfd",
        employee: dummyEmployeeData[0],
    },
    {
        _id: "emp-002",
        employeeId: "emp-002",
        type: "CASUAL",
        startDate: "2026-03-23T00:00:00.000Z",
        endDate: "2026-03-24T00:00:00.000Z",
        reason: "Going For Vacations ",
        status: "REJECTED",
        createdAt: "2026-03-13T13:50:52.117Z",
        updatedAt: "2026-03-13T13:51:46.450Z",
        id: "69b4163cf8a807df391d7bf8",
        employee: dummyEmployeeData[1],
    },
    {
        _id: "emp-003",
        employeeId: "emp-003",
        type: "CASUAL",
        startDate: "2026-03-27T00:00:00.000Z",
        endDate: "2026-03-28T00:00:00.000Z",
        reason: "Going to visit a temple",
        status: "PENDING",
        createdAt: "2026-03-13T13:49:48.618Z",
        updatedAt: "2026-03-13T13:51:44.251Z",
        id: "69b415fcf8a807df391d7be0",
        // Fixed: Removed the array wrappers around this object
        employee: dummyEmployeeData[2], 
    },
    {
        _id: "emp-004",
        employeeId: "emp-004",
        type: "SICK",
        startDate: "2026-03-15T00:00:00.000Z",
        endDate: "2026-03-16T00:00:00.000Z",
        reason: "I had a fracture on leg",
        status: "APPROVED",
        createdAt: "2026-03-13T13:49:19.204Z",
        updatedAt: "2026-03-13T13:51:45.418Z",
        id: "69b415dff8a807df391d7bdb",
        employee: dummyEmployeeData[0],
    },
];

export const dummyPayslipData = [
    {
        _id: "69b41595f8a807df391d7baa",
        employeeId: "69b411e6f8a807df391d7b13",
        month: 2,
        year: 2026,
        basicSalary: 2000,
        allowances: 200,
        deductions: 20,
        netSalary: 2180,
        createdAt: "2026-03-13T13:48:05.653Z",
        updatedAt: "2026-03-13T13:48:05.653Z",
        id: "69b41595f8a807df391d7baa",
        employee: dummyEmployeeData[0],
    },
    {
        _id: "69b41536f8a807df391d7b9c",
        employeeId: "69b41439f8a807df391d7b52",
        month: 2,
        year: 2026,
        basicSalary: 2000,
        allowances: 200,
        deductions: 20,
        netSalary: 2180,
        createdAt: "2026-03-13T13:46:30.804Z",
        updatedAt: "2026-03-13T13:46:30.804Z",
        id: "69b41536f8a807df391d7b9c",
        employee: dummyEmployeeData[1],
    },
    {
        _id: "69b41526f8a807df391d7b98",
        employeeId: "69b414a7f8a807df391d7b58",
        month: 2,
        year: 2026,
        basicSalary: 1000,
        allowances: 100,
        deductions: 10,
        netSalary: 1090,
        createdAt: "2026-03-13T13:46:14.884Z",
        updatedAt: "2026-03-13T13:46:14.884Z",
        id: "69b41526f8a807df391d7b98",
        employee: dummyEmployeeData[2],
    },
    {
        _id: "69b41515f8a807df391d7b94",
        employeeId: "69b411e6f8a807df391d7b13",
        month: 1,
        year: 2026,
        basicSalary: 1000,
        allowances: 200,
        deductions: 20,
        netSalary: 1180,
        createdAt: "2026-03-13T13:45:57.132Z",
        updatedAt: "2026-03-13T13:45:57.132Z",
        id: "69b41515f8a807df391d7b94",
        employee: dummyEmployeeData[0],
    },
    {
        _id: "69b414fbf8a807df391d7b90",
        employeeId: "69b41439f8a807df391d7b52",
        month: 1,
        year: 2026,
        basicSalary: 2000,
        allowances: 100,
        deductions: 10,
        netSalary: 2090,
        createdAt: "2026-03-13T13:45:31.899Z",
        updatedAt: "2026-03-13T13:45:31.899Z",
        id: "69b414fbf8a807df391d7b90",
        employee: dummyEmployeeData[1],
    },
    {
        _id: "69b414e5f8a807df391d7b8c",
        employeeId: "69b414a7f8a807df391d7b58",
        month: 1,
        year: 2026,
        basicSalary: 2000,
        allowances: 100,
        deductions: 10,
        netSalary: 2090,
        createdAt: "2026-03-13T13:45:09.169Z",
        updatedAt: "2026-03-13T13:45:09.169Z",
        id: "69b414e5f8a807df391d7b8c",
        employee: dummyEmployeeData[2],
    },
];

export const dummyEmployeeAttendanceData = [
    {
        _id: "69b68d19f4437fdd254d5a68",
        employeeId: "69b411e6f8a807df391d7b13",
        date: "2026-03-14T18:30:00.000Z",
        checkIn: "2026-03-15T10:42:33.966Z",
        checkOut: "2026-03-15T18:42:37.476Z",
        status: "PRESENT",
        workingHours: 8,
    } // Fixed: Correctly closed object and array layout scopes
];

export const dummyAdminAttendanceData = [
    // ============================================================
    // MARCH 13, 2026
    // ============================================================

    {
        _id: "emp-001",
        employeeId: "emp-001",
        date: "2026-03-13T00:00:00.000Z",
        checkIn: "2026-03-13T08:05:00.000Z",
        checkOut: "2026-03-13T17:10:00.000Z",
        status: "PRESENT",
        workingHours: 9,
        employee: dummyEmployeeData[0],
    },

    {
        _id: "emp-002",
        employeeId: "emp-002",
        date: "2026-03-13T00:00:00.000Z",
        checkIn: "2026-03-13T08:21:00.000Z",
        checkOut: "2026-03-13T17:00:00.000Z",
        status: "LATE",
        workingHours: 8.65,
        employee: dummyEmployeeData[1],
    },

    {
        _id: "emp-003",
        employeeId: "emp-003",
        date: "2026-03-13T00:00:00.000Z",
        checkIn: "2026-03-13T07:55:00.000Z",
        checkOut: "2026-03-13T17:05:00.000Z",
        status: "PRESENT",
        workingHours: 9.17,
        employee: dummyEmployeeData[2],
    },


];

export const dummyEmployeePayslipData = [
  {
    _id: "payslip-001",
    employeeId: "emp-001",
    month: 1,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-01-31T00:00:00.000Z",
    createdAt: "2026-01-31T10:00:00.000Z",
    updatedAt: "2026-01-31T10:00:00.000Z",
    id: "payslip-001",
  },

  {
    _id: "payslip-002",
    employeeId: "emp-002",
    month: 2,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-02-28T00:00:00.000Z",
    createdAt: "2026-02-28T10:00:00.000Z",
    updatedAt: "2026-02-28T10:00:00.000Z",
    id: "payslip-002",
  },

  {
    _id: "payslip-003",
    employeeId: "emp-003",
    month: 3,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-03-31T00:00:00.000Z",
    createdAt: "2026-03-31T10:00:00.000Z",
    updatedAt: "2026-03-31T10:00:00.000Z",
    id: "payslip-003",
  },

  {
    _id: "payslip-004",
    employeeId: "emp-003",
    month: 4,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-04-30T00:00:00.000Z",
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z",
    id: "payslip-004",
  },

  {
    _id: "payslip-005",
    employeeId: "emp-003",
    month: 5,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-05-31T00:00:00.000Z",
    createdAt: "2026-05-31T10:00:00.000Z",
    updatedAt: "2026-05-31T10:00:00.000Z",
    id: "payslip-005",
  },

  {
    _id: "payslip-006",
    employeeId: "emp-003",
    month: 6,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-06-30T00:00:00.000Z",
    createdAt: "2026-06-30T10:00:00.000Z",
    updatedAt: "2026-06-30T10:00:00.000Z",
    id: "payslip-006",
  },

  {
    _id: "payslip-007",
    employeeId: "emp-003",
    month: 7,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-07-31T00:00:00.000Z",
    createdAt: "2026-07-31T10:00:00.000Z",
    updatedAt: "2026-07-31T10:00:00.000Z",
    id: "payslip-007",
  },

  {
    _id: "payslip-008",
    employeeId: "emp-003",
    month: 8,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-08-31T00:00:00.000Z",
    createdAt: "2026-08-31T10:00:00.000Z",
    updatedAt: "2026-08-31T10:00:00.000Z",
    id: "payslip-008",
  },
];

export const dummyAdminPayslipData = [
  {
    _id: "pay-001-jan",
    employeeId: "emp-001",
    month: 1,
    year: 2026,
    basicSalary: 1000,
    allowances: 100,
    deductions: 9.98,
    netSalary: 1090.02,
    status: "PAID",
    paymentDate: "2026-01-31T00:00:00.000Z",
    id: "pay-001-jan-2026",
    employee: dummyEmployeeData[0],
  },

  {
    _id: "pay-002-jan",
    employeeId: "emp-002",
    month: 1,
    year: 2026,
    basicSalary: 2000,
    allowances: 100,
    deductions: 20,
    netSalary: 2080,
    status: "PAID",
    paymentDate: "2026-01-31T00:00:00.000Z",
    id: "pay-002-jan-2026",
    employee: dummyEmployeeData[1],
  },

  {
    _id: "pay-003-jan",
    employeeId: "emp-003",
    month: 1,
    year: 2026,
    basicSalary: 40000,
    allowances: 10000,
    deductions: 2000,
    netSalary: 48000,
    status: "PAID",
    paymentDate: "2026-01-31T00:00:00.000Z",
    id: "pay-003-jan-2026",
    employee: dummyEmployeeData[2],
  },
];