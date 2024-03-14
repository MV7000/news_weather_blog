import React from 'react';
import Menu from '../Menu/Menu';

import './SideBurgerMenu.css';

export default function SideBurgerMenu({ hamburgerMenuAnimate }) {
  return (
    <div className='sideBurger'>
      <Menu hamburgerMenuAnimate={hamburgerMenuAnimate} />
    </div>
  );
}
