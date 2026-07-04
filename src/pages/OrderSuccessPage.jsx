import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";

function OrderSuccessPage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen py-12 px-4">
      <div className="max-w-[720px] mx-auto bg-white border border-[#E6E6E6] rounded-2xl p-8 md:p-12 text-center shadow-sm">
        <div className="w-24 h-24 rounded-full bg-green-50 text-[#2DC071] mx-auto flex items-center justify-center mb-6">
          <CheckCircle size={52} />
        </div>

        <h1 className="text-[32px] md:text-[40px] font-bold text-[#252B42]">
          Siparişin Alındı!
        </h1>

        <p className="text-[#737373] text-[15px] mt-4 max-w-[520px] mx-auto">
          Teşekkürler. Siparişin başarıyla oluşturuldu. Sipariş detaylarını
          hesabındaki siparişlerim sayfasından takip edebilirsin.
        </p>

        <div className="bg-[#FAFAFA] border border-[#E6E6E6] rounded-xl p-5 mt-8">
          <p className="text-[#737373] text-[13px] font-bold">
            Sipariş Durumu
          </p>
          <p className="text-[#252B42] text-[18px] font-bold mt-1">
            Hazırlanıyor
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 bg-[#23A6F0] text-white px-6 py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
          >
            <Package size={18} />
            Siparişlerime Git
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 border border-[#23A6F0] text-[#23A6F0] px-6 py-3 rounded-md font-bold hover:bg-[#EAF6FF] transition"
          >
            <ShoppingBag size={18} />
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccessPage;