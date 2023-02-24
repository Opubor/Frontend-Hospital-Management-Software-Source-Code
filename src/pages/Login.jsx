import React, { useState, useContext, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/Ai";
import { AiOutlineFolderOpen } from "react-icons/Ai";
import bedbg from "../assets/doctor-g54d4d9aa7_1920.jpg";
import { MdEmail } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { Navigate } from "react-router-dom";
import { loginContext } from "./context/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const { login, loggedIn } = useContext(loginContext);
  const submitLogin = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  if (loggedIn) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div
      className="lg:max-h-screen lg:overflow-hidden lg:py-32 flex justify-center items-center lg:flex-row lg:h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.300), rgba(0, 0, 0, 0.300)),url(${bedbg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="backdrop-blur-3xl backdrop-brightness-75 backdrop-opacity-100 flex flex-col lg:flex-row">
        <div className="p-8 lg:p-16">
          <div className="flex flex-col gap-2 justify-center items-center">
            {" "}
            <h2 className="text-base lg:text-2xl lg:px-0 text-white font-bold">
              HOSPITAL MANAGEMENT SOFTWARE
            </h2>
            <h1 className="text-sm text-white">
              by <span className="text-base text-white">OPUBOR TONY</span>
            </h1>
          </div>
          <div className="pt-16">
            <h1 className="text-base text-white mb-4">Welcome...</h1>
            <form onSubmit={submitLogin}>
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  className="py-2 px-2 border border-gray-300 rounded-md focus:border-blue-300 outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="py-2 px-2 border border-gray-300 rounded-md focus:border-blue-300 outline-none"
                  onChange={handleChange}
                />
              </div>

              <button className="bg-indigo-700 px-24 py-2 rounded-lg font-semibold text-white text-lg hover:bg-indigo-500">
                {"Login"}
              </button>
            </form>
          </div>
        </div>
        {/* <div className="bg-gray-50 p-8 lg:px-16">
          <div>
            <p>Login as...</p>
            <div className="grid lg:grid-cols-2 gap-2 py-2">
              <div className="p-2 border-2 border-blue-900 rounded-xl">
                <p className="font-bold">Doctor</p>
                <p>peterdavid@gmail.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border-2 border-blue-900 rounded-xl">
                <p className="font-bold">Nurse</p>
                <p>jessicasandra@gmail.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border-2 border-blue-900 rounded-xl">
                <p className="font-bold">Pharmacist</p>
                <p>walkerkunle@gmail.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border-2 border-blue-900 rounded-xl">
                <p className="font-bold">Labouratorist</p>
                <p>ejiropaul@gmail.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border-2 border-blue-900 rounded-xl">
                <p className="font-bold">Accountant</p>
                <p>taiwoade@gmail.com</p>
                <p>password</p>
              </div>
              <div className="p-2 border-2 border-blue-900 rounded-xl">
                <p className="font-bold">Receptionist</p>
                <p>okosaqueen@gmail.com</p>
                <p>password</p>
              </div>
            </div>
            <p className="pb-2">
              <span className="font-bold">Note:</span> Admin login is restricted
              but you can view admin panel screenshots below
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 text-base text-indigo-900">
            <div>
              <a className="flex gap-2 items-center " href="/AppModules">
                <span>
                  {React.createElement(AiOutlineFolderOpen, { size: "20" })}
                </span>
                View Modules
              </a>
              <a className="flex gap-2 items-center " href="/adminScreenshots">
                <span>
                  {React.createElement(AiOutlineCamera, { size: "20" })}
                </span>
                View Admin Panel Screenshots
              </a>
            </div>
            <div>
              <p className="">For Customization:</p>
              <a
                className="flex gap-2 items-center "
                href="mailto:opubortony@gmail.com"
              >
                {React.createElement(MdEmail, { size: "20" })}
                opubortony@gmail.com
              </a>
              <a className="flex gap-2 items-center " href="tel:09139124809">
                {React.createElement(MdAddIcCall, { size: "20" })} 09139124809
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
