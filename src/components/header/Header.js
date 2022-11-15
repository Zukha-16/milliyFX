import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BurgerMenu from "./burgerMenu/BurgerMenu";
// redux
import { useSelector } from "react-redux";
// media and styles
import "./Header.scss";
import logo from "../../assets/logo_no_label.png";
import defualtImage from "../../assets/add_image.png";

const Header = () => {
  const [menuPosition, setMenuPosition] = useState(false);
  const [header, setHeader] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const listenScrollEvent = () => {
    if (window.scrollY < 73) {
      return setHeader(false);
    } else if (window.scrollY > 70) {
      return setHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-screen z-50 transition-all duration-300 ease-in-out`}
      style={{ backgroundColor: header ? "black" : "transparent" }}
    >
      <div className="container max-w-xs m-auto flex items-center justify-between my-4 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1440px]">
        <img
          src={logo}
          alt="Logo"
          width={75}
          height={100}
          onClick={() => {
            navigate("/");
          }}
          className="hover:animate-pulse hover:cursor-pointer"
        />
        <BurgerMenu
          menuPosition={menuPosition}
          setMenuPosition={setMenuPosition}
        />
        <ul className="large_screen items-center gap-6 text-white text-xl ">
          {list.map((item) => {
            return (
              <li className="links_2" key={item.name}>
                <NavLink end to={item.link}>
                  {item.name}
                </NavLink>
              </li>
            );
          })}

          {user.image ? (
            <li>
              <img
                src={!user.image === "default" ? user.image : defualtImage}
                alt="User"
                width={45}
                height={45}
                className="rounded-full border-2 border-primaryPurple transition-all duration-300 ease-in-out hover:border-primaryGreen hover:cursor-pointer"
                onClick={() => {
                  navigate("/user");
                }}
              />
            </li>
          ) : (
            <li className="links_2">
              <NavLink end to="/user/login">
                Login / Register
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

const list = [
  { name: "Home", link: "/" },
  { name: "News", link: "/news" },
  { name: "About us", link: "/about" },
  { name: "Education", link: "/education" },
  { name: "Find us", link: "/findus" },
];
