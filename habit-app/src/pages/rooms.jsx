import React from 'react'
import { Outlet, NavLink } from "react-router-dom";
import './rooms.css';

const Rooms = () => {
  return (
    <div className="user">
      <nav className="user-menu">
        <ul>
          <li>
            <NavLink
              to={""}
              className={({ isActive }) => {
                return isActive ? "active-route" : "";
              }}
              end
            >
              Administration
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"confirmations"}
              className={({ isActive }) => {
                return isActive ? "active-route" : "";
              }}
            >
              Confirmations
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Rooms;