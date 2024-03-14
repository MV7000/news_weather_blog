import React from 'react';

import './Footer.css';
import { LinkedinOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <footer>
      <div className='footerWrapper merriweather-black'>
        <div className='contacts'>
          <h2>My contacts</h2>
          <ul className='contactList merriweather-regular'>
            <li>
              {' '}
              <a href='tel:+380673327000'>Tel:+380673327000</a>
            </li>
            <li>
              {' '}
              <a href='mailto:mwprestige@ukr.net'> E-mail:mwprestige@ukr.net</a>
            </li>
            <li>Adress:43000,Ukraine,Volyn region,Lutsk</li>
            <li>
              <a
                href='http://linkedin.com/in/volodymyr-magera-a60a0827a'
                target='blank'
              >
                {' '}
                <LinkedinOutlined className='iconFooter' spin={true} />
                My LinkEdin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
