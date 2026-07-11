import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "../store/actions/clientActions.js";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      setIsLoading(true);

      await dispatch(
        loginUser(loginData, data.rememberMe)
      );

      toast.success("Giriş başarılı!");

      const previousPath =
        location.state?.from?.pathname ||
        location.state?.from ||
        "/";

      history.replace(previousPath);
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Email veya şifre hatalı."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-12 px-4">
      <div className="max-w-[480px] mx-auto bg-white border border-[#E6E6E6] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#EAF6FF] text-[#23A6F0] flex items-center justify-center mx-auto mb-4">
            <LogIn size={28} />
          </div>

          <h1 className="text-[30px] font-bold text-[#252B42]">
            Login
          </h1>

          <p className="text-[#737373] text-[14px] mt-2">
            Hesabına giriş yap ve alışverişe devam et.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div>
            <label className="font-bold text-[#252B42] text-[14px]">
              Email
            </label>

            <div className="relative mt-2">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Please enter a valid email",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-bold text-[#252B42] text-[14px]">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 text-[#737373] text-[14px] font-bold cursor-pointer">
            <input
              type="checkbox"
              {...register("rememberMe")}
            />
            Remember Me
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#23A6F0] text-white py-3 rounded-md font-bold transition ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[#1b8fd4] hover:-translate-y-0.5"
            }`}
          >
            {isLoading
              ? "Giriş yapılıyor..."
              : "Login"}
          </button>
        </form>

        <p className="text-center text-[#737373] text-[14px] mt-6">
          Hesabın yok mu?{" "}
          <Link
            to="/signup"
            className="text-[#23A6F0] font-bold"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;