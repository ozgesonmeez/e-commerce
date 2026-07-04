import { ArrowLeft, Mail, User, Save } from "lucide-react";
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
    toast.success("Kullanıcı bilgileri güncellendi!");
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
          <div className="bg-[#23A6F0] px-6 md:px-8 py-8 text-white">
            <p className="text-[14px] font-bold opacity-90">
              Bandage Account
            </p>
            <h1 className="text-[28px] md:text-[34px] font-bold mt-2">
              Kullanıcı Bilgilerim
            </h1>
            <p className="text-[14px] mt-2 opacity-90">
              Profil bilgilerini buradan görüntüleyebilir ve düzenleyebilirsin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0">
            <aside className="border-b md:border-b-0 md:border-r border-[#E6E6E6] p-6 bg-[#FAFAFA]">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white border border-[#E6E6E6] text-[#23A6F0] flex items-center justify-center shadow-sm">
                  <User size={38} />
                </div>

                <h2 className="text-[#252B42] font-bold text-[18px] mt-4">
                  {user?.name || "Kullanıcı"}
                </h2>

                <p className="text-[#737373] text-[13px] mt-1 break-all">
                  {user?.email || "E-posta bilgisi yok"}
                </p>
              </div>
            </aside>

            <section className="p-6 md:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="font-bold text-[#252B42]">
                    Ad Soyad
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />

                    <input
                      className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
                      {...register("name")}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#252B42]">
                    E-posta
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />

                    <input
                      type="email"
                      className="w-full border border-[#E6E6E6] rounded-md py-3 pl-11 pr-4 text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div className="bg-[#FAFAFA] border border-[#E6E6E6] rounded-xl p-4 text-[#737373] text-[13px]">
                  Bu bilgiler şu an sadece frontend üzerinde güncellenir.
                  Backend profil güncelleme endpoint’i bağlandığında kalıcı hale getirilebilir.
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#23A6F0] text-white py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
                >
                  <Save size={18} />
                  Değişiklikleri Kaydet
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PersonalInfoPage;