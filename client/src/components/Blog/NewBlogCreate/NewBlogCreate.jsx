import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { db } from '../../../functions/firestore/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

import './NewBlogCreate.css';
import BlogModalPortal from '../BlogModalPortal/BlogModalPortal';
import BlogExitRequest from '../BlogExitRequest/BlogExitRequest';

export default function NewBlogCreate({
  setModalBlog,
  data,
  setRefreshAll,
  blogPagination,
}) {
  const { register, getValues, handleSubmit } = useForm();
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [closeModal, setCloseModal] = useState(false);
  const [emptyInputOne, setEmptyInputOne] = useState(false);
  const [emptyInputTwo, setEmptyInputTwo] = useState(false);
  const [imagesArr, setImagesArr] = useState([]);
  const imagesArrRef = ref(db, 'images/');

  const api_url = import.meta.env.VITE_PROD_BASE_URL;

  let newObj = {};
  const valuesArr = Object.values(getValues());
  const newValue = () => {
    const simplifyedValue = valuesArr?.map(elem => {
      return typeof elem === 'object' ? [...elem][0]?.name : elem;
    });
    for (let i = 0; i <= 2; i++) {
      newObj[Object.keys(getValues())[i]] = simplifyedValue[i];
    }
    return newObj;
  };

  const onSubmit = data => console.log(data);

  const submitImage = () => {
    if (file !== null) {
      const storageRef = ref(db, `images/${file.name}`);
      uploadBytes(storageRef, file).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setImagesArr(prev => [
            ...prev,
            { url, name: snapshot.ref._location.path_ },
          ]);
        });
      });
    } else alert('Please load image for Your blog');
  };

  const readDatabase = () => {
    listAll(imagesArrRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(url => {
          setImagesArr(prev => [...prev, { url, name: item._location.path_ }]);
        });
      });
    });
  };

  useEffect(() => {
    readDatabase();
  }, []);

  const viewImage = e => {
    const fileType = /image\/(png|jpg|jpeg)/i;
    const file = e.target.files[0];
    if (!file.type.match(fileType)) {
      alert('Please input only image');
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = e => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const sendDataToDataBase = async () => {
    try {
      await axios.post(`${api_url}/write-item`, {
        content: newObj,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    newValue();

    if (refresh === true) {
      sendDataToDataBase();
    }
  }, [refresh]);

  return (
    <>
      {closeModal && (
        <BlogModalPortal>
          <BlogExitRequest
            setModalBlog={setModalBlog}
            setCloseModal={setCloseModal}
          />
        </BlogModalPortal>
      )}
      <div className='newBlogContainer'>
        <h1>Create Your BLOG</h1>
        <div className='btnExitWrapper'>
          <button
            type='button'
            className='exitBtn'
            onClick={() => setCloseModal(prev => !prev)}
          >
            ❌
          </button>
        </div>
        <div className='blogImageWrapper'>
          <form>
            <label htmlFor='loadImg'>Load image</label>
            <input
              {...register('imageBlog')}
              id='loadImg'
              type='file'
              accept='image/*'
              onChange={viewImage}
            ></input>
            {emptyInputOne && emptyInputTwo && (
              <button
                type='submit'
                className='imageChoice'
                onClick={e => {
                  e.preventDefault();
                  submitImage();
                  blogPagination(data.data.totalBlogs);
                  setRefresh(prev => !prev);
                  setRefreshAll(prev => !prev);
                  setTimeout(() => {
                    setModalBlog(prev => !prev);
                    setRefresh(prev => !prev);
                    setRefreshAll(prev => !prev);
                  }, 1000);
                }}
              >
                Save Your Blog
              </button>
            )}
          </form>
          <img
            className='blogImage'
            src={fileDataURL}
            height={100}
            width={150}
          />
        </div>
        <div className='newBlogWrapper'>
          <form id='formBlog' onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('titleBlog')}
              type='text'
              id='titleBlog'
              placeholder='Type Blog Title'
              onInput={e => {
                e.target.value !== ''
                  ? setEmptyInputOne(prev => true)
                  : setEmptyInputOne(prev => false);
              }}
            />
            <textarea
              {...register('textBlog')}
              id='textBlog'
              cols='120'
              rows='30'
              placeholder='Type your BLOG'
              onInput={e => {
                e.target.value !== ''
                  ? setEmptyInputTwo(prev => true)
                  : setEmptyInputTwo(prev => false);
              }}
            ></textarea>
          </form>
        </div>
      </div>
    </>
  );
}
