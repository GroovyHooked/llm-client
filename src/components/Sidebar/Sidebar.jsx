/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import { SidebarContent } from "./sidebar-content.jsx";
import burgerMenu from "../../assets/menu.png";
import closeMenu from "../../assets/close.png";
import "./sidebar.css";

export const Sidebar = () => {
  const screenSize = Mediaqueries();
  const buttonRef = useRef(null);
  const [isSidebarOpen, isSidebarOpenSetter] = useState(false);

  const closeOrOpenSidebar = () => {
    if (isSidebarOpen) {
      isSidebarOpenSetter(false);
      buttonRef.current.classList.remove("open");
    } else {
      isSidebarOpenSetter(true);
      buttonRef.current.classList.add("open");
    }
  };

  return (
    <div className={screenSize.isLarge ? "" : "side-bar"}>
      <button
        onClick={closeOrOpenSidebar}
        className="btn btn-burger"
        ref={buttonRef}
      >
        {!screenSize.isLarge ? (
          <img
            src={isSidebarOpen ? closeMenu : burgerMenu}
            className={isSidebarOpen ? "close-menu" : "burger-menu"}
          ></img>
        ) : null}
      </button>

      {screenSize.isLarge ? (
        <SidebarContent />
      ) : isSidebarOpen ? (
        <SidebarContent />
      ) : null}
    </div>
  );
};

