import React from 'react';
import { DeleteOutlined, MonitorOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider } from 'antd';

import { sourceImage } from '../../../functions/imgGet';

import './BlogsCardElement.css';

import avatarImg from '../../../assets/images/blog/avatar.png';

const { Meta } = Card;

const BlogsCardElement = ({
  blog,
  title,
  imgSrc,
  imagesArr,
  id,
  funcDelete,
  setRefresh,
  setmodalShow,
  findItem,
  setImgSrc,
}) => (
  <>
    <Card
      style={{
        boxSizing: 'border-box',
        padding: '2px',
      }}
      cover={
        <img
          className='cardImg'
          alt='coverCardImage'
          src={`${sourceImage(imagesArr, imgSrc)}`}
        />
      }
    >
      <Meta
        avatar={<Avatar src={avatarImg} size='large' />}
        title={title}
        description={blog?.slice(0, 70)}
      />
      <Divider className='divider' />
      <div className='btnCardElementWrapper'>
        <Button
          className='merriweather-black-italic'
          type='default'
          shape='round'
          icon={<MonitorOutlined />}
          size={'small'}
          onClick={() => {
            findItem(id);
            setmodalShow(prev => !prev);
            setImgSrc(sourceImage(imagesArr, imgSrc));
          }}
        >
          Read
        </Button>
        {id !== '65f09ba67d6690dc6e263071' && (
          <Button
            className='merriweather-black-italic'
            type='default'
            shape='round'
            icon={<DeleteOutlined />}
            size={'small'}
            id={id}
            onClick={() => {
              funcDelete(id);
              setRefresh(prev => !prev);
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  </>
);
export default BlogsCardElement;
