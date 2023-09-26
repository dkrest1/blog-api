import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { token } from "../redux/AccessTokenSlice";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../redux/AccessTokenSlice";
import { user } from "../redux/UserDataSlice";
import { getUser } from "../redux/UserDataSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getPending, pending } from "../redux/PendingSlice";

export const Login = () => {
  const userData = useSelector(user);
  const accessToken = useSelector(token);
  const isPending = useSelector(pending);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const notify = (status) => toast(status);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    dispatch(getPending(true));
    axios
      .post("http://localhost:3000/auth/login", formValues)
      .then(function (response) {
        if (response.statusText === "Created") {
          let data = response.data.access_token;
          dispatch(getToken(data));
          // setToken(data)
          Cookies.set("token", data, { expires: 1 });
          const headers = {
            Authorization: `Bearer ${data}`,
          };
          axios
            .get("http://localhost:3000/user/me", { headers })
            .then(function (response) {
              if (response.statusText === "OK") {
                let data = response.data;
                dispatch(getUser(data));
                let status = "Login Successful!";
                notify(status);
                setTimeout(() => {
                  navigateTo("/");
                }, 2000);
                dispatch(getPending(false));
              }
            })
            .catch(function (error) {
              console.log(error);
              let status = error.response.data.message;
              notify(status);
              dispatch(getPending(false));
            });
        }
        dispatch(getPending(false));
      })
      .catch(function (error) {
        console.log(error);
        let status = error.response.data.message;
        notify(status);
        dispatch(getPending(false));
        // setIsPending(false)
      });
  };
  const handleForgotPassword = (event) => {
    event.preventDefault();
    navigateTo("/forgot-password");
  };
  // console.log(userData)
  return (
    <div className="h-full">
      <div className="h-full bg-gray-100 bg-opacity-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg md:p-14">
          <ToastContainer />
          <h2 className="text-2xl font-bold mb-4 text-center font-mono md:text-3xl">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
              <button
                className="self-end text-xs mt-2 text-blue-600"
                onClick={handleForgotPassword}
              >
                Forgot Password
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLoginSubmit}
                disabled={isPending}
                // onClick={handleLoginSubmit}
              >
                Sign In
              </button>
              <Link to="/">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
            </div>
            <div>
              <p className=" text-xs mt-3 md:text-base md:mt-4">
                Don't have an account?{" "}
                <Link className=" underline" to="/sign-up">
                  Sign Up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
