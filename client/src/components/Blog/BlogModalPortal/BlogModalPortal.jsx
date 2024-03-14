import React from 'react';
import { createPortal } from 'react-dom';

import './BlogModalPortal.css';

export default function BlogModalPortal({ children }) {
  const portalModal = document.getElementById('modalPortal');
  return createPortal(
    <>
      <div className='modalPortalContainer'>
        <div className='modalPortalWrapper'>
          PORTAL
          {children}
        </div>
      </div>
    </>,
    portalModal
  );
}
