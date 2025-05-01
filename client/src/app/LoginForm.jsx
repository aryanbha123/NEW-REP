import { useState } from "react";
import { Link } from "react-router-dom";
import Loader2 from "../utilities/Loader2";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";
import { getUser } from "../redux/thunks/userThunk";
import { useDispatch } from "react-redux";
const SignInForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "", rememberMe: false });
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: formData.username,
        password: formData.password,
      }, { withCredentials: true });
      const token = res.headers.get("Authorization")?.split("Bearer ")[1];

      if (token) {
        sessionStorage.setItem("token", token); // Store token
      }
      toast.success('Login Success')
      // window.reload()
      dispatch(getUser());
    } catch (error) {
      toast.error("Invalid Credentials")
      console.log(error)
    }
  };

  return (
    <div className="font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Sign in to your account and explore a world of possibilities. Your journey begins here.
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">User name</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-emtext-emerald-500 -600"
                  placeholder="Enter user name"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={`${formData.rememberMe ? 'text' : 'password'}`}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-emtext-emerald-500 -600"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 shrink-0 text-emerald-500 -600 focus:ring-emtext-emerald-500 -500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  Show Password
                </label>
              </div>

              <div className="text-sm">
                <a href="/forget-pass" className="text-emerald-500 -600 hover:underline font-semibold">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="!mt-8">
              <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg bg-emerald-500 text-white hover:bg-emtext-emerald-500 -700 focus:outline-none">
                Sign in
              </button>
            </div>

            <p className="text-sm !mt-8 text-center text-gray-500">
              Don't have an account?
              <Link to="/auth?page=signup" className="text-emerald-500 -600 font-semibold hover:underline ml-1 whitespace-nowrap">
                Register here
              </Link>
            </p>
          </form>
        </div>
        <div className="max-md:mt-8">
          <img
            src="/plant_14086426.png"
            className="w-full  max-md:w-4/5 mx-auto block object-cover"
            alt="Login"
          />
        </div>
      </div>
      {isSubmitting ? <><Loader2 /></> : <></>}
    </div>
  );
};

export default SignInForm;
