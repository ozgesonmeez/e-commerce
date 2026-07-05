import { Link } from "react-router-dom";
import { Home, SearchX, ShoppingBag } from "lucide-react";

function NotFoundPage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen py-12 px-4 flex items-center">
      <div className="max-w-[720px] mx-auto bg-white border border-[#E6E6E6] rounded-2xl p-8 md:p-12 text-center shadow-sm">
        <div className="w-24 h-24 rounded-full bg-[#EAF6FF] text-[#23A6F0] mx-auto flex items-center justify-center mb-6">
          <SearchX size={52} />
        </div>

        <p className="text-[#23A6F0] text-[18px] font-bold">404</p>

        <h1 className="text-[32px] md:text-[42px] font-bold text-[#252B42] mt-2">
          Sayfa Bulunamadı
        </h1>

        <p className="text-[#737373] text-[15px] mt-4 max-w-[520px] mx-auto">
          Aradığın sayfa taşınmış, silinmiş ya da hiç oluşturulmamış olabilir.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#23A6F0] text-white px-6 py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
          >
            <Home size={18} />
            Ana Sayfaya Dön
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 border border-[#23A6F0] text-[#23A6F0] px-6 py-3 rounded-md font-bold hover:bg-[#EAF6FF] transition"
          >
            <ShoppingBag size={18} />
            Alışverişe Git
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;