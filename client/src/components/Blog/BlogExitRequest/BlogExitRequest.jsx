import './BlogExitRequest.css';
import imgModal from '../../../assets/images/—Pngtree—vector fox_585540.png';

export default function BlogExitRequest({ setModalBlog, setCloseModal }) {
  return (
    <div className='exitWrapper'>
      <div className='titleWrapper'>
        <h1>Are you sure you want to exit?</h1>
      </div>
      <div className='imgModalWrapper'>
        <img className='imgModal' src={imgModal} alt='imageModal' />
      </div>
      <div className='buttonsExitWrapper'>
        <button type='button' onClick={() => setModalBlog(prev => !prev)}>
          Yes
        </button>
        <button type='button' onClick={() => setCloseModal(prev => !prev)}>
          No
        </button>
      </div>
    </div>
  );
}
