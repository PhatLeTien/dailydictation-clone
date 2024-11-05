import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from '../ContextAPI/authContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

const Login = ({ theme }) => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Lấy hàm login từ AuthContext
  const [loginData, setLoginData] = useState({}); 
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [loginData]);

  // Hàm onchange
  const onChange = (event) => {
    let target = event.target;
    setLoginData({
      ...loginData,
      [target.name]: target.value
    });
  };

  // Hàm submit
  const onSubmit = async (event) => {
    event.preventDefault();
    let valid = validateForm();
    if (valid) {
      // Sử dụng hàm login từ AuthContext
      try {
        await login(loginData.email, loginData.password);
        navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
      } catch (error) {
        console.error(error.message);
      }
    }
    setIsSubmitted(true);
  };

  // Kiểm tra nhập liệu
  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!loginData.email) {
      errors.email = "Please enter email";
    } else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email);
      if (!valid) {
        errors.email = "Email is not valid";
      }
    }

    if (!loginData.password) {
      errors.password = "Please enter password";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      isValid = false;
    } else {
      setFormErrors({});
    }

    return isValid;
  };

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

        <form className="space-y-4 mb-8" onSubmit={onSubmit}>
          <h1 className="text-2xl font-semibold">Or enter your password</h1>
          <div className="flex flex-col gap-3">
            <label>Username or Email</label>
            <input
              type="text"
              name="email" // Đặt name cho input
              onChange={onChange} // Thêm hàm onChange
              className={`border border-gray-500 px-3 py-2 rounded ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
            />
            {formErrors.email && <span className="text-red-500">{formErrors.email}</span>} {/* Hiện thông báo lỗi */}
          </div>
          <div className="flex flex-col gap-3">
            <label>Password</label>
            <input
              type="password" // Đổi type thành password
              name="password" // Đặt name cho input
              onChange={onChange} // Thêm hàm onChange
              className={`border border-gray-500 px-3 py-2 rounded ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
            />
            {formErrors.password && <span className="text-red-500">{formErrors.password}</span>} {/* Hiện thông báo lỗi */}
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
