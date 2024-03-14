import React from 'react';

import './BlogReadModal.css';

import { Button } from 'antd';

export default function BlogReadModal({ setmodalShow, dataItem, imgSrc }) {
  return (
    <div className='modalReadContainer'>
      <div className='modalReadWrapper'>
        <div className='btnReadModalCloseWrapper'>
          <Button
            type='default'
            shape='round'
            size={'medium'}
            onClick={() => setmodalShow(prev => !prev)}
          >
            ❌Close
          </Button>
        </div>
        <div className='imageModalReadWrapper'>
          <img src={imgSrc} alt='blogImage' />
        </div>
        <div className='modalReadTitleWrapper'>
          <h1> {dataItem?.data?.content.titleBlog} </h1>
        </div>
        <div className='modalReadTextWrapper'>
          <div className='modalReadText'>
            {dataItem?.data?.content.textBlog}
          </div>
        </div>
      </div>
    </div>
  );
}
