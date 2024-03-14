import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import logoImage from '../../assets/images/—Pngtree—vector fox_585540.png';

import './Header.css';
import Menu from './Menu/Menu';
import SideBurgerMenu from './SideBurgerMenu/SideBurgerMenu';

export default function Header() {
  const [open, setOpen] = useState(false);

  function hamburgerMenuAnimate() {
    setOpen(prev => !prev);
  }

  return (
    <div className='headerWrapper merriweather-black'>
      <div className='logoWrapper'>
        <NavLink to='/'>
          <img src={logoImage} width={70} height={70} alt='logoImage' />
        </NavLink>
      </div>
      <div className='menuWrapper'>
        <Menu hamburgerMenuAnimate={hamburgerMenuAnimate} />
        <div className='hamburgerMenuWrapper'>
          <div
            onClick={hamburgerMenuAnimate}
            className={`${open ? 'hamburger_menu open' : 'hamburger_menu'}`}
          >
            <span></span>
          </div>
          {open && (
            <SideBurgerMenu
              hamburgerMenuAnimate={hamburgerMenuAnimate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
