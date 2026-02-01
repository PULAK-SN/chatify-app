import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Lock, MailIcon, MessageCircle, LoaderIcon } from "lucide-react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Link } from "react-router";

const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { logIn, isLoggingIn } = useAuthStore();

  const handelSubmit = (e) => {
    e.preventDefault();
    logIn(formData);
  };
  return (
    <div className="flex items-center justify-center w-full p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className=" w-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-slate-200">
                    Welcome Back
                  </h2>
                  <p className="text-slate-200">
                    Log in to access your account
                  </p>
                </div>
                {/* FORM */}
                <form onSubmit={handelSubmit} className="space-y-6">
                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>
                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <Lock className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn relative"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Log in"
                    )}
                  </button>
                </form>
                <div className="mt-6 text-center relative">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Signup
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM COLUMN - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect Anytime, Anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Secure</span>
                    <span className="auth-badge">Fast</span>
                    <span className="auth-badge">Reliable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LogInPage;
