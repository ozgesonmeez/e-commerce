import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Lock,
  UserPlus,
} from "lucide-react";

import api from "../api/api";

function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const password = watch("password");

  const [isLoading, setIsLoading] =
    useState(false);

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      setIsLoading(true);

      await api.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Hesabın başarıyla oluşturuldu."
      );

      history.push("/login");
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Kayıt başarısız oldu!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-10 md:py-12 px-4">
      <div className="max-w-[620px] mx-auto bg-white border border-[#E6E6E6] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#EAF6FF] text-[#23A6F0] flex items-center justify-center mx-auto mb-4">
            <UserPlus size={28} />
          </div>

          <h1 className="text-[30px] font-bold text-[#252B42]">
            Sign Up
          </h1>

          <p className="text-[#737373] text-[14px] mt-2">
            Bandage hesabını oluştur ve
            alışverişe başla.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div>
            <label className="font-bold text-[#252B42] text-[14px]">
              Name
            </label>

            <div className="relative mt-2">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
              />

              <input
                type="text"
                placeholder="Name"
                className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                {...register("name", {
                  required:
                    "Name is required",
                  minLength: {
                    value: 3,
                    message:
                      "Minimum 3 characters",
                  },
                })}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

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
                  required:
                    "Email is required",
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
                  required:
                    "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number and special character",
                  },
                })}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-bold text-[#252B42] text-[14px]">
              Confirm Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                {...register(
                  "confirmPassword",
                  {
                    required:
                      "Confirm password is required",
                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  }
                )}
              />
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {
                  errors.confirmPassword
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <label className="font-bold text-[#252B42] text-[14px]">
              Role
            </label>

            <div className="w-full border border-[#E6E6E6] bg-[#FAFAFA] text-[#252B42] rounded-md p-3 mt-2 font-bold">
              Customer
            </div>

            <p className="text-[#737373] text-sm mt-2">
              Yeni hesaplar güvenli şekilde
              müşteri rolüyle oluşturulur.
            </p>
          </div>

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
              ? "Kayıt oluşturuluyor..."
              : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-[#737373] text-[14px] mt-6">
          Zaten hesabın var mı?{" "}
          <Link
            to="/login"
            className="text-[#23A6F0] font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;