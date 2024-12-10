import logo_around from "../../images/logo_around.png";

function Header() {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo_around} alt="Logo Around" />
      </header>
    </>
  );
}

export default Header;
