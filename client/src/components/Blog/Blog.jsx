import React, { useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './Blog.css';
import BlogsCardElement from './BlogsCardElement/BlogsCardElement';
import BlogModalPortal from './BlogModalPortal/BlogModalPortal';
import NewBlogCreate from './NewBlogCreate/NewBlogCreate';

import axios from 'axios';
import BlogReadModal from './BlogReadModal/BlogReadModal';

import { db } from '../../functions/firestore/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { readDatabase } from '../../functions/firestore/getData';

export default function Blog() {
  const [modalBlog, setModalBlog] = useState(false);
  const [modalReadBlog, setModalReadBlog] = useState(false);

  const [data, SetData] = useState(null);
  const [dataItem, setDataItem] = useState();
  const [allImage, setAllImage] = useState(null);
  const [current, setCurrent] = useState(1);
  const [refreshAll, setRefreshAll] = useState(false);
  const [imagesArr, setImagesArr] = useState([]);
  const [imgSrc, setImgSrc] = useState();

  const api_url = import.meta.env.VITE_PROD_BASE_URL;

  const imagesArrRef = ref(db, 'images/');

  const blogPagination = page => {
    setCurrent(page);
    setRefreshAll(prev => !prev);
  };

  useEffect(() => {
    if (data?.data.result.length === 0) {
      blogPagination(current - 1);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${api_url}/pagination?page=${current}&limit=4`
        );
        SetData(prev => result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    readDatabase(setImagesArr, imagesArrRef);
  }, [refreshAll]);

  const deleteItem = async id => {
    if (window.confirm('Are You sure you want to delete this blog?')) {
      try {
        await axios.delete(`${api_url}/delete-item/${id}`);
      } catch (error) {
        console.log(error.message);
      }
    }
    setRefreshAll(prev => !prev);
  };

  const deleteImage = name => {
    const storageRef = ref(db, name);

    deleteObject(storageRef)
      .then(() => {
        alert('file deleted');
      })
      .then(() => {
        window.location.href = window.location.href;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const findItem = async id => {
    try {
      const result = await axios.get(`${api_url}/find-item/${id}`);
      setDataItem(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {modalReadBlog && (
        <BlogReadModal
          setmodalShow={setModalReadBlog}
          dataItem={dataItem}
          findItem={findItem}
          imgSrc={imgSrc}
        ></BlogReadModal>
      )}
      <div className='container'>
        {modalBlog && (
          <BlogModalPortal>
            <NewBlogCreate
              setModalBlog={setModalBlog}
              allImage={allImage}
              setAllImage={setAllImage}
              setRefreshAll={setRefreshAll}
              refreshAll={refreshAll}
              data={data}
              blogPagination={blogPagination}
            />
          </BlogModalPortal>
        )}
        <div
          className='blogsContainer'
          style={{ display: modalBlog ? 'none' : 'flex' }}
        >
          <div className='btnBlogAddWrapper'>
            <Button
              type='primary'
              shape='round'
              size='large'
              icon={<HighlightOutlined />}
              onClick={() => setModalBlog(prev => true)}
            >
              Add new blog
            </Button>
          </div>
          <div
            className={modalReadBlog ? 'spinerVisible' : 'blogCardsContainer'}
          >
            <div className='blogCardsWrapper'>
              {data?.data.result.length === 0 && (
                <>
                  <Spin
                    size='large'
                    spinning={data?.data.result.length === 0 ? true : false}
                  />
                  <p className='spinerText'>Please wait</p>
                </>
              )}
              {data?.data.totalBlogs > 0 ? (
                data?.data.result.map(elem => {
                  return (
                    <div
                      key={elem._id}
                      id={elem._id}
                      className='cardElementWrapper'
                    >
                      <BlogsCardElement
                        imgSrc={elem.content?.imageBlog}
                        imagesArr={imagesArr}
                        funcDelete={deleteItem}
                        id={elem._id}
                        title={elem.content?.titleBlog}
                        blog={elem.content?.textBlog}
                        setRefresh={setRefreshAll}
                        setmodalShow={setModalReadBlog}
                        modalReadBlog={modalReadBlog}
                        deleteImage={deleteImage}
                        findItem={findItem}
                        data={data}
                        setImgSrc={setImgSrc}
                      />
                    </div>
                  );
                })
              ) : (
                <div className='emptyString'>
                  <h2>Share your thoughts with the world</h2>
                </div>
              )}
            </div>
          </div>
          <Pagination
            current={current}
            total={data?.data.totalBlogs}
            pageSize={4}
            hideOnSinglePage={true}
            onChange={blogPagination}
            size={window.screen.width > 500 ? 'default' : 'small'}
          />
        </div>
      </div>
    </>
  );
}
