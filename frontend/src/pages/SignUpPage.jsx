import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Mail, UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-primary to-secondary">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/m09D0cq.gif')" }}
      ></div>

      {/* Signup Card */}
      <div className="relative z-10 bg-white bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold text-primary-content mb-4">
          Join us today for a free cookie!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-base-100 text-base-content placeholder:text-base-content/60 focus:outline-none focus:ring-2 focus:ring-primary focus:placeholder-opacity-0 transition duration-300"
              type="text"
              id="fullName"
              placeholder="Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <UserPen className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-base-100 text-base-content placeholder:text-base-content/60 focus:outline-none focus:ring-2 focus:ring-primary focus:placeholder-opacity-0 transition duration-300"
              type="email"
              id="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-base-100 text-base-content placeholder:text-base-content/60 focus:outline-none focus:ring-2 focus:ring-primary focus:placeholder-opacity-0 transition duration-300"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-primary" />
              ) : (
                <Eye className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>
          <button
            className={`w-full btn btn-primary ${isSigningUp && "btn-disabled"}`}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Log-in Link */}
        <div className="mt-4 text-center">
          <p className="text-base-content text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Log-in!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;





//     <div className="min-h-screen grid lg:grid-cols-2 pt-5">
//       {/* left side */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
//               group-hover:bg-primary/20 transition-colors"
//               >
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Create Account</h1>
//               <p className="text-base-content/60">Get started with your free account</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="text"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="John Doe"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="size-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="size-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
//               {isSigningUp ? (
//                 <>
//                   <Loader2 className="size-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Already have an account?{" "}
//               <Link to="/login" className="link link-primary">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* right side */}

//       <AuthImagePattern
//         title="Join our community"
//         subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
//       />
//     </div>
//   );
// };
// export default SignUpPage;