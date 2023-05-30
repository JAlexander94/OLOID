import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navtabs.css";

function NavTabs() {
  return (
    <ul className="nav nav-tabs">
      <img src="/images/nav-logo.png"></img>
      <li className="nav-item">
        <NavLink
          to="/"
          end="true"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="portfolio"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Portfolio
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="contact"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Contact
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="login"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default NavTabs;