import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = ({ theme }) => {
  return (
    <div
      className={`w-full min-h-screen flex justify-center ${
        theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-black"
      }`}
    >
      <div className="max-w-xl w-full h-max border rounded-md mt-40 mb-10 p-4 shadow-xl">
        <h1 className="text-3xl font-semibold mb-5">Login</h1>
        <button className="ml-2 bg-white border px-3 py-2 rounded font-medium text-sm text-gray-700 flex gap-2 items-center">
          <FcGoogle size={24} />
          Đăng nhập bằng Google
        </button>
        <hr className="my-5 border border-gray-300" />

        <form className="space-y-4 mb-8">
          <h1 className="text-2xl font-semibold">Or enter your password</h1>
          <div className="flex flex-col gap-3">
            <label>Username or Email</label>
            <input
              type="text"
              className={`border border-gray-500 px-3 py-2 rounded ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label>Password</label>
            <input
              type="text"
              className={`border border-gray-500 px-3 py-2 rounded ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
            />
          </div>
          <button className="px-3 py-2 text-white rounded-md bg-green-700 hover:bg-green-800 transition-all duration-300">
            Submit
          </button>
        </form>

        <div className="space-y-3">
          <div className="flex gap-1">
            <p>Forget your password?</p>
            <a href="#" className="text-blue-600 underline">
              Click here
            </a>
          </div>
          <div className="flex gap-1">
            <p>Haven't had an account?</p>
            <Link to="/register" className="text-blue-600 underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
