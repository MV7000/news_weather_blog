import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Menu({hamburgerMenuAnimate}) {
  return (
    <>
      <nav>
        <ul
          onClick={() =>    
            window.innerWidth <= 900?hamburgerMenuAnimate():null
          }
        >
          <li>
            <NavLink activeclassname='active' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname='active' to='news'>
              Top News
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname='active' to='weather'>
              About city
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname='active' to='blog'>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname='active' to='contacts'>
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
