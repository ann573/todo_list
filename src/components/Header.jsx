import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../context/AuthContext";
const Header = () => {
  const accessToken = localStorage.getItem("accessToken") || null;
  const user = JSON.parse(localStorage.getItem("user")) || null;
  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.reload();
  }
  return (
    <header className="bg-green-500 p-3 flex justify-between">
      {accessToken ? (
        <>
          <p>
            Welcome back! <span className="font-bold">{user?.username}</span>
          </p>
          <button onClick={logout} className="bg-red-500 p-1 rounded-lg">
            {" "}
            Đăng xuất
          </button>
        </>
      ) : (
        <section className="flex gap-5 text-white font-bold items-center">
          <p>Bạn chưa đăng nhập, hãy đăng nhập nhé?</p>
          <Link to="/login" className="bg-orange-500 p-1 rounded-md">
            Đăng nhập
          </Link>
        </section>
      )}
    </header>
  );
};

export default Header;
