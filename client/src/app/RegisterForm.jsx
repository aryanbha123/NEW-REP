import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader2 from "../utilities/Loader2";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender:"male",
    role: "user",  // default role
    address: {
      street: "",
      city: "Dehradun",
      country: "India",
      zip: "248005",
    },
    terms: false,
  });
  const [isSubmitting , setIsSubmitting]  = useState(false);
  const [error,SetError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name.startsWith("address.")) {
        const addressKey = name.split(".")[1];
        return {
          ...prevData,
          address: {
            ...prevData.address,
            [addressKey]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try{
      const res = await axios.post(`${BASE_URL}/api/auth/signup` , {
        formData
      });
      toast.success('Signup Successful')
    }catch(e){
      toast.error(e.res.data.message)
    }finally{
      setIsSubmitting(false);
    }
    console.log(formData);
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-bold">Sign up</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Create your account and start your journey with us.
                </p>
              </div>
              <div className="flex flex-col gap-4 h-[60vh] overflow-y-scroll" >
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Gender</label>
                  <select
                    name="gender"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Enter password"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value={"male"} >Male</option>
                    <option value={"female"} >Female</option>
                    </select>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Street</label>
                  <input
                    name="address.street"
                    type="text"
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Street"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">City</label>
                  <input
                    name="address.city"
                    type="text"
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </div>

                {/* <div>
                  <label className="text-gray-800 text-sm mb-2 block">Country</label>
                  <input
                    name="address.country"
                    type="text"
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Country"
                    value={formData.address.country}
                    onChange={handleChange}
                  />
                </div> */}

                {/* <div>
                  <label className="text-gray-800 text-sm mb-2 block">Zip</label>
                  <input
                    name="address.zip"
                    type="text"
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    placeholder="Zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                  />
                </div> */}

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Role</label>
                  <select
                    name="role"
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 py-3 rounded-lg outline-embg-emerald-400 -600"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-embg-emerald-400 -600 focus:ring-embg-emerald-400 -500 border-gray-300 rounded"
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  />
                  <label htmlFor="terms" className="ml-3 block text-sm text-gray-800">
                    I agree to the <a href="#" className="text-embg-emerald-400 -600 hover:underline">Terms and Conditions</a>
                  </label>
                </div>
              </div>
              <div className="!mt-8">
                <button
                disabled={isSubmitting}
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-emerald-400 -600 hover:bg-emerald-400 -700 focus:outline-none"
                >
                  Sign up
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-500">
                Already have an account?
                <Link to="/auth?page=signin" className="text-embg-emerald-400 -600 font-semibold hover:underline ml-1">Sign in here</Link>
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
      </div>
      {
        isSubmitting ? <><Loader2/></>:<></>
      }
    </div>
  );
};

export default Register;
