import { User, Lock, ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen py-12 px-4">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-[32px] font-bold text-[#252B42] mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <AccountCard
            to="/profile/personal-info"
            icon={<User />}
            title="Personal Information"
            text="Update your name, email and account details."
          />

          <AccountCard
            to="/profile/security"
            icon={<Lock />}
            title="Password & Security"
            text="Change your password securely."
          />

          <AccountCard
            to="/orders"
            icon={<ShoppingBag />}
            title="Previous Orders"
            text="View your past orders."
          />

          <AccountCard
            to="/favorites"
            icon={<Heart />}
            title="Wishlist"
            text="Manage your favorite products."
          />
        </div>
      </div>
    </main>
  );
}

function AccountCard({ to, icon, title, text }) {
  return (
    <Link
      to={to}
      className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
    >
      <div className="text-[#23A6F0] mb-4">{icon}</div>
      <h2 className="text-[20px] font-bold text-[#252B42] mb-2">
        {title}
      </h2>
      <p className="text-[#737373] text-sm">{text}</p>
    </Link>
  );
}

export default ProfilePage;