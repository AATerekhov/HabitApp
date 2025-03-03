import React from 'react'
import { Outlet, NavLink, useParams } from "react-router-dom";
import './rooms.css';

const Rooms = () => {
    //TODO: Передача id для обработки в Slice adminRoom.
  const { id } = useParams();  

  return (
    <div className="user">
      <nav className="user-menu">
        <ul className='user-ul'>
          <li>
            <NavLink
              to={""}
              className={({ isActive }) => {
                return isActive ? "active-route" : "";
              }}
              end
            >
              Participants
            </NavLink>
          </li>
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
        </ul>
      </nav>      
      <Outlet />
    </div>
  );
};

export default Rooms;