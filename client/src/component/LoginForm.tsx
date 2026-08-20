// 1. Define the blueprint structure for the props
interface LoginFormProps {
  role: "admin" | "employee"; // Restricts the role to only these two options
  title: string;
  subtitle: string;
}

// 2. Destructure and apply the type to the component
const LoginForm = ({ role, title, subtitle }: LoginFormProps) => {
  return (
    <div className="p-6 card max-w-[400px] mx-auto mt-20 animate-fade-in">
      <h2 className="page-title text-center">{title}</h2>
      <p className="page-subtitle text-center mb-6">{subtitle}</p>
      
      {/* Example usage of the role variable */}
      <form>
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn-primary w-full mt-4">
          Login as {role}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

