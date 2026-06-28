import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import api from "../api/api";
import { fetchRoles } from "../store/actions/clientActions.js";

function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "customer",
    },
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.client.roles);

  const password = watch("password");
  const selectedRole = watch("role");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const selectedRoleObj = roles.find(
      (role) => role.code === data.role
    );

    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: selectedRoleObj.id,
    };

    if (data.role === "store") {
      formData.store = {
        name: data.store.name,
        phone: data.store.phone,
        tax_no: data.store.tax_no,
        bank_account: data.store.bank_account,
      };
    }

    try {
      setIsLoading(true);

      const response = await api.post("/signup", formData);

      console.log("Signup success:", response.data);

      toast.success(
        "You need to click link in email to activate your account!"
      );

      history.push("/login");
    } catch (error) {
      console.log("Signup error:", error);
      toast.error("Signup failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto py-20">
      <h1 className="text-[32px] font-bold text-center mb-8">
        Sign Up
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-3 rounded-md"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
        />

        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message}
          </p>
        )}

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
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
              message:
                "Password must contain uppercase, lowercase, number and special character",
            },
          })}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-3 rounded-md"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <select
          className="border p-3 rounded-md"
          defaultValue="customer"
          {...register("role", {
            required: "Role is required",
          })}
        >
          {roles
            .filter((role) => role.code !== "admin")
            .sort((a, b) => {
              if (a.code === "customer") return -1;
              if (b.code === "customer") return 1;
              return 0;
            })
            .map((role) => (
              <option key={role.id} value={role.code}>
                {role.name}
              </option>
            ))}
        </select>

        <p className="text-[#737373] text-sm">
          Selected Role: {selectedRole}
        </p>

        {selectedRole === "store" && (
          <>
            <input
              type="text"
              placeholder="Store Name"
              className="border p-3 rounded-md"
              {...register("store.name", {
                required: "Store name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
            />

            {errors.store?.name && (
              <p className="text-red-500 text-sm">
                {errors.store.name.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Store Phone"
              className="border p-3 rounded-md"
              {...register("store.phone", {
                required: "Store phone is required",
                pattern: {
                  value: /^05\d{9}$/,
                  message: "Phone must be a valid Türkiye phone number",
                },
              })}
            />

            {errors.store?.phone && (
              <p className="text-red-500 text-sm">
                {errors.store.phone.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Store Tax ID"
              className="border p-3 rounded-md"
              {...register("store.tax_no", {
                required: "Tax ID is required",
                pattern: {
                  value: /^T\d{4}V\d{6}$/,
                  message: "Tax ID format must be TXXXXVXXXXXX",
                },
              })}
            />

            {errors.store?.tax_no && (
              <p className="text-red-500 text-sm">
                {errors.store.tax_no.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Store Bank Account"
              className="border p-3 rounded-md"
              {...register("store.bank_account", {
                required: "IBAN is required",
                pattern: {
                  value: /^TR\d{24}$/,
                  message:
                    "IBAN must start with TR and contain 26 characters",
                },
              })}
            />

            {errors.store?.bank_account && (
              <p className="text-red-500 text-sm">
                {errors.store.bank_account.message}
              </p>
            )}
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#23A6F0] text-white py-3 rounded-md font-bold disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;