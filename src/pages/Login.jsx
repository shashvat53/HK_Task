import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/HKLogo.png";
import LoginGIF from "../assets/signin.gif";
import { authenticate, LoginApi } from "../helper/auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  // i have used useCookie-hook for set cookies or remove cookie
  const [cookies, setCookie] = useCookies(["User"]);

  const navigate = useNavigate();

  // i have used react-hook-form library for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   calling Login Api
  const onSubmit = async (data) => {
    try {
      const res = await LoginApi(data);
      // console.log(res.token, "777");
      if (res?.token) {
        toast.success("LogedIn successfully");
        return authenticate(
          res?.token,
          () => {
            navigate("/");
          },
          setCookie
        );
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#894AFF] to-[#B824FF] flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <div className=" max-w-[350px] bg-white  rounded-md px-6 py-4 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-20 h-20 mx-auto mb-4">
              <img src={LoginGIF} alt="sign gif" />
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full border  rounded-md flex justify-between overflow-hidden">
                <input
                  {...register("email", {
                    required: "email is required",
                  })}
                  type="email"
                  className="py-2 px-4 outline-none  w-full"
                  placeholder="email"
                />
                <i className="bg-gray-300 text-right py-3 px-3 w-10 border-l fa-solid fa-user"></i>
              </div>

              {errors.email && (
                <p className="error text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}

              <div className="border rounded-md flex justify-between  w-full overflow-hidden">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  className="py-2 px-4 outline-none w-full"
                  placeholder="Password"
                />
                <i className="bg-gray-300 text-right py-3 px-3 border-l fa-solid fa-key"></i>
              </div>
              {errors.password && (
                <p className="error text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}

              <button
                className="group px-6 py-2  hover:bg-gradient-to-l from-[#894AFF] to-[#B824FF] border border-[#894AFF]   hover:text-white hover:border hover:border-[#894AFF]   rounded-full text-black hover:scale-100 transition-all block font-medium"
                type="submit"
              >
                Login{" "}
              </button>
            </div>
            <p className="text-xs w-[330px] mt-2 mb-6 text-center">
              This site is protected by developer and
              <span className="text-[#0F7B8F] cursor-pointer ml-1">
                Terms of Services
              </span>{" "}
              apply.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
