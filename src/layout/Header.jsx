function Header() {
  const navLinks = ["Home", "Shop", "About", "Blog", "Contact", "Pages"];

  return (
    <header>
      <div className="hidden md:flex bg-[#252B42] text-white h-[46px] items-center justify-between px-[38px] text-[14px] font-bold">
        <span>📞 (225) 555-0118</span>
        <span>michelle.rivera@example.com</span>
        <span>Follow Us and get a chance to win 80% off</span>
        <span>Follow Us :</span>
      </div>

      <div className="flex items-center justify-between h-[58px] px-[38px] bg-white">
        <h1 className="text-[24px] leading-[32px] font-bold text-[#252B42]">
          Bandage
        </h1>

        <nav className="hidden md:flex gap-[15px]">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[14px] leading-[24px] font-bold text-[#737373]"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 text-[#23A6F0] text-[14px] font-bold">
          <a href="#">Login / Register</a>
          <span>🔍</span>
          <span>🛒</span>
          <span>♡</span>
        </div>

        <div className="flex md:hidden gap-4 text-[#252B42]">
          <span>🔍</span>
          <span>🛒</span>
          <span>☰</span>
        </div>
      </div>
    </header>
  );
}

export default Header;