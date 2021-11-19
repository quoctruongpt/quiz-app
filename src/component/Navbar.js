import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">

      <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <NavLink
            activeClassName="active"
            className="nav-item active"
            exact={true}
            to="/"
          >
            <li className="text-white me-5">Trang chủ</li>
          </NavLink>
          <NavLink
            activeClassName="active"
            className="nav-item active"
            to="/list"
          >
            <li className="text-white">Danh sách</li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}
