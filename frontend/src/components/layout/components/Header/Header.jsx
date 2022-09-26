import React, {useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo_white from '../../../../assets/logo/logo-white.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faCartArrowDown, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../../../contexts/ProductContext';
import { AuthContext } from '../../../../contexts/AuthContext';
// import UserModal from '../../../modal/UserModal/UserModal';

const cx = classNames.bind(styles);

const navbar = [
  {
    display: 'Trang chủ',
    path: '/'
  },

  {
    display: 'Giới thiệu',
    path: '/gioithieu'
  },

  {
    display: 'Cửa hàng',
    path: '/cuahang'
  },

  {
    display: 'Danh bạ nông thôn',
    path: '/danhbanongthon'
  },

  {
    display: 'Kiến thức',
    path: '/kienthuc'
  },

  {
    display: 'Liên hệ',
    path: '/lienhe'
  },

  {
    display: 'Góc chia sẽ',
    path: '/gocchiase'
  }
]

const Header = () => {

  const navigate = useNavigate();
  const handleGioHang = () => {
    navigate('/giohang');
  }

  // auth context(logOutUser)
  const {logOutUser, authState: {user}} = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser();
  }

  // product context(search product)
  const {setSearchProduct} = useContext(ProductContext);

  return (

    <div className={cx('header', ('header-fixed'))}>
      <div className={cx('header-logo')}>
        <Link to= "/">
          <img src= {logo_white} alt="" />
        </Link>
      </div>
      
      <div className={cx('header-menu')}>
      {
        navbar.map((item, index) => (
          <div 
            key={index}          
            className={cx('header-item')}
          >
            <Link to={item.path}>
              <span>{item.display}</span>
            </Link>
          </div>
        ))
      }
      </div>

      <div className={cx('header-search')}>
        <input placeholder = "Tìm kiếm..." onChange={(e)=> setSearchProduct(e.target.value)} />
        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('header-icon')} />
      </div>

      <div className={cx('header-user-cart')}>
        <div className={cx('header-user')}>
          <span>{user.username}</span>
          <FontAwesomeIcon icon={faUser} className={cx('header-icon-user')}/>
          <div className={cx('modal')}>
            <ul className={cx('user-modal')}>
              <li>Thông tin cá nhân</li>
              <li>Ngôn ngữ</li>
              <li onClick={handleLogout}>Đăng xuất</li>
            </ul>
          </div>
          {/* <UserModal /> */}
        </div>
        <div className={cx('header-cart')}>
          <FontAwesomeIcon 
            icon={faCartArrowDown} 
            className={cx('header-icon-cart')} 
            onClick={handleGioHang}
          />
        </div>
      </div>
    </div>
  )
}

export default Header