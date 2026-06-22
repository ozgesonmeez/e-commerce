import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../api/api";
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
const password = watch("password");
const selectedRole = watch("role");
const [roles, setRoles] = useState([]);

useEffect(() => {
  api
    .get("/roles")
    .then((res) => {
    console.log(res.data);
      setRoles(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  const onSubmit = (data) => {
    console.log(data);
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
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
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
  {...register("role")}
>
  <option value="">Role seçiniz</option>

  {roles
    .filter((role) => role.code !== "admin")
    .map((role) => (
      <option key={role.id} value={role.code}>
        {role.name}
      </option>
    ))}
</select>
<p>Selected Role: {selectedRole}</p>
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

    <input
      type="text"
      placeholder="Store Phone"
      className="border p-3 rounded-md"
      {...register("store.phone", {
        required: "Store phone is required",
      })}
    />

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

    <input
      type="text"
      placeholder="Store Bank Account"
      className="border p-3 rounded-md"
      {...register("store.bank_account", {
        required: "IBAN is required",
      })}
    />
  </>
)}


        <button
          type="submit"
          className="bg-[#23A6F0] text-white py-3 rounded-md font-bold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;