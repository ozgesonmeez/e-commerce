import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SecurityPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = () => {
    toast.success("Password changed successfully!");
    reset();
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-12 px-4">
      <div className="max-w-[700px] mx-auto bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-[#23A6F0] font-bold mb-6"
        >
          <ArrowLeft size={18} />
          Back to Account
        </Link>

        <h1 className="text-[28px] font-bold text-[#252B42] mb-6">
          Password & Security
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="border border-[#E6E6E6] rounded-md p-3"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </p>
          )}

          <input
            type="password"
            placeholder="New Password"
            className="border border-[#E6E6E6] rounded-md p-3"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">
              {errors.newPassword.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Confirm New Password"
            className="border border-[#E6E6E6] rounded-md p-3"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#23A6F0] text-white py-3 rounded-md font-bold mt-4"
          >
            Change Password
          </button>
        </form>
      </div>
    </main>
  );
}

export default SecurityPage;