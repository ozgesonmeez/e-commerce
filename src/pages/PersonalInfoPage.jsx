import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../store/actions/clientActions.js";

function PersonalInfoPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.client.user);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data) => {
    const updatedUser = {
      ...user,
      name: data.name,
      email: data.email,
    };

    dispatch(setUser(updatedUser));
    toast.success("Profile updated successfully!");
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
          Personal Information
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="font-bold text-[#252B42]">Full Name</label>
            <input
              className="w-full border border-[#E6E6E6] rounded-md p-3 mt-2"
              {...register("name")}
            />
          </div>

          <div>
            <label className="font-bold text-[#252B42]">Email</label>
            <input
              type="email"
              className="w-full border border-[#E6E6E6] rounded-md p-3 mt-2"
              {...register("email")}
            />
          </div>

          <button
            type="submit"
            className="bg-[#23A6F0] text-white py-3 rounded-md font-bold mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}

export default PersonalInfoPage;