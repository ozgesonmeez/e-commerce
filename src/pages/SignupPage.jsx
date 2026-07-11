import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Lock,
  Store,
  Phone,
  Landmark,
  CreditCard,
  UserPlus,
} from "lucide-react";

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

  const roles = useSelector((state) => state.client.roles || []);

  const password = watch("password");
  const selectedRole = watch("role");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const selectedRoleObj = roles.find((role) => role.code === data.role);

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

      await api.post("/auth/register", formData);

      toast.success("Hesabını aktifleştirmek için e-postandaki linke tıkla!");
      history.push("/login");
    } catch (error) {
      console.log("Signup error:", error);
      toast.error("Kayıt başarısız oldu!");
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
            Bandage hesabını oluştur ve alışverişe başla.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
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
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
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
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-bold text-[#252B42] text-[14px]">
              Role
            </label>

            <select
              className="w-full border border-[#E6E6E6] rounded-md p-3 mt-2 focus:outline-none focus:border-[#23A6F0]"
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

            <p className="text-[#737373] text-sm mt-2">
              Selected Role:{" "}
              <span className="font-bold text-[#23A6F0]">
                {selectedRole}
              </span>
            </p>
          </div>

          {selectedRole === "store" && (
            <div className="bg-[#FAFAFA] border border-[#E6E6E6] rounded-xl p-4 flex flex-col gap-5">
              <h2 className="text-[#252B42] font-bold text-[18px]">
                Store Information
              </h2>

              <div>
                <label className="font-bold text-[#252B42] text-[14px]">
                  Store Name
                </label>

                <div className="relative mt-2">
                  <Store
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                  />

                  <input
                    type="text"
                    placeholder="Store Name"
                    className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                    {...register("store.name", {
                      required: "Store name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                    })}
                  />
                </div>

                {errors.store?.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.store.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-bold text-[#252B42] text-[14px]">
                  Store Phone
                </label>

                <div className="relative mt-2">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                  />

                  <input
                    type="text"
                    placeholder="05XXXXXXXXX"
                    className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                    {...register("store.phone", {
                      required: "Store phone is required",
                      pattern: {
                        value: /^05\d{9}$/,
                        message: "Phone must be a valid Türkiye phone number",
                      },
                    })}
                  />
                </div>

                {errors.store?.phone && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.store.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-bold text-[#252B42] text-[14px]">
                  Store Tax ID
                </label>

                <div className="relative mt-2">
                  <Landmark
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                  />

                  <input
                    type="text"
                    placeholder="TXXXXVXXXXXX"
                    className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                    {...register("store.tax_no", {
                      required: "Tax ID is required",
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: "Tax ID format must be TXXXXVXXXXXX",
                      },
                    })}
                  />
                </div>

                {errors.store?.tax_no && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.store.tax_no.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-bold text-[#252B42] text-[14px]">
                  Store Bank Account
                </label>

                <div className="relative mt-2">
                  <CreditCard
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                  />

                  <input
                    type="text"
                    placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX"
                    className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-[#23A6F0]"
                    {...register("store.bank_account", {
                      required: "IBAN is required",
                      pattern: {
                        value: /^TR\d{24}$/,
                        message:
                          "IBAN must start with TR and contain 26 characters",
                      },
                    })}
                  />
                </div>

                {errors.store?.bank_account && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.store.bank_account.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#23A6F0] text-white py-3 rounded-md font-bold transition ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[#1b8fd4] hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? "Kayıt oluşturuluyor..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-[#737373] text-[14px] mt-6">
          Zaten hesabın var mı?{" "}
          <Link to="/login" className="text-[#23A6F0] font-bold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;