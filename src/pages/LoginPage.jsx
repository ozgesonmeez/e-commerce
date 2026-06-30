import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "../store/actions/clientActions.js";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      setIsLoading(true);

      const userData = await dispatch(loginUser(loginData));

  if (data.rememberMe) {
  localStorage.setItem("token", userData.token);
}

      toast.success("Login successful!");
      history.push("/");
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Email or password is incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto py-20">
      <h1 className="text-[32px] font-bold text-center mb-8">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-md"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
        />

        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-md"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message}
          </p>
        )}

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("rememberMe")} />
          Remember Me
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#23A6F0] text-white py-3 rounded-md font-bold disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;