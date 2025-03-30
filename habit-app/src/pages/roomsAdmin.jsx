import React from 'react'
import { Outlet, NavLink } from "react-router-dom";
import './rooms.css';
import { useSelector } from 'react-redux';

const Rooms = () => {  
  const isAdmin = useSelector(state => state.admin.isAdmin);
  return (
    <div className="user">
      <nav className="user-menu">
        <ul className='user-ul'>
          {isAdmin && (<li>
            <NavLink
              to={""}
              className={({ isActive }) => {
                return isActive ? "active-route" : "";
              }}
              end
            >
              Participants
            </NavLink>
          </li>)}
            <li>
              <NavLink
                to={"rewords"}
                className={({ isActive }) => {
                  return isActive ? "active-route" : "";
                }}
              >
                Rewords
              </NavLink>
            </li>
          <li>
            <NavLink
              to={"habits"}
              className={({ isActive }) => {
                return isActive ? "active-route" : "";
              }}
            >
              Habits
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"coins"}
              className={({ isActive }) => {
                return isActive ? "active-route" : "";
              }}
            >
              Coins
            </NavLink>
          </li>
        </ul>
      </nav>      
      <Outlet />
    </div>
  );
};

export default Rooms;