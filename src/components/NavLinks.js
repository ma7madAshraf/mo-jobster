import React from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ toggle }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggle}
            className={({ isActive }) =>
              isActive ? "nav-link" : "nav-link active"
            }
            end
          >
            <span className="icon">{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
