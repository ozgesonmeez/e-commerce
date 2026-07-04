import { ArrowLeft, Lock, ShieldCheck, Save, EyeOff } from "lucide-react";
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
    toast.success("Şifre başarıyla güncellendi!");
    reset();
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-[900px] mx-auto">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-[#23A6F0] font-bold mb-6"
        >
          <ArrowLeft size={18} />
          Hesabım'a Dön
        </Link>

        <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#252B42] px-6 md:px-8 py-8 text-white">
            <p className="text-[14px] font-bold opacity-90">
              Bandage Account
            </p>
            <h1 className="text-[28px] md:text-[34px] font-bold mt-2">
              Şifre ve Güvenlik
            </h1>
            <p className="text-[14px] mt-2 opacity-90">
              Hesabının güvenliğini buradan yönetebilirsin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            <aside className="border-b md:border-b-0 md:border-r border-[#E6E6E6] p-6 bg-[#FAFAFA]">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white border border-[#E6E6E6] text-[#23A6F0] flex items-center justify-center shadow-sm">
                  <ShieldCheck size={40} />
                </div>

                <h2 className="text-[#252B42] font-bold text-[18px] mt-4">
                  Güvenli Hesap
                </h2>

                <p className="text-[#737373] text-[13px] mt-2">
                  Güçlü bir şifre kullanarak hesabını daha güvenli hale
                  getirebilirsin.
                </p>
              </div>
            </aside>

            <section className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div>
                  <label className="font-bold text-[#252B42]">
                    Mevcut Şifre
                  </label>

                  <div className="relative mt-2">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />

                    <input
                      type="password"
                      placeholder="Mevcut şifren"
                      className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
                      {...register("currentPassword", {
                        required: "Mevcut şifre zorunludur",
                      })}
                    />
                  </div>

                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-bold text-[#252B42]">
                    Yeni Şifre
                  </label>

                  <div className="relative mt-2">
                    <EyeOff
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />

                    <input
                      type="password"
                      placeholder="Yeni şifre"
                      className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
                      {...register("newPassword", {
                        required: "Yeni şifre zorunludur",
                        minLength: {
                          value: 6,
                          message: "Şifre en az 6 karakter olmalıdır",
                        },
                      })}
                    />
                  </div>

                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-bold text-[#252B42]">
                    Yeni Şifre Tekrar
                  </label>

                  <div className="relative mt-2">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />

                    <input
                      type="password"
                      placeholder="Yeni şifre tekrar"
                      className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
                      {...register("confirmPassword", {
                        required: "Şifre tekrar zorunludur",
                        validate: (value) =>
                          value === newPassword || "Şifreler eşleşmiyor",
                      })}
                    />
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="bg-[#FAFAFA] border border-[#E6E6E6] rounded-xl p-4 text-[#737373] text-[13px]">
                  Bu sayfa şu an frontend validasyonu yapar. Backend şifre
                  güncelleme endpoint’i bağlandığında gerçek şifre değişikliği
                  yapılabilir.
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#23A6F0] text-white py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
                >
                  <Save size={18} />
                  Şifreyi Güncelle
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SecurityPage;