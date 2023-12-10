import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, clearStore } from "../features/user/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setDropdown(!dropdown)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={dropdown ? "show-dropdown dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore("Logging out..."));
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
