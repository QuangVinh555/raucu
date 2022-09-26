import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone, faEnvelope, faUser, faGlobe, faChevronDown, faArrowRightFromBracket, faBars} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

const cx = classNames.bind(styles);
const Header = () => {

    const navigate = useNavigate();

    const {logOutUser, authState: {isAuthLoading, isAuthenticated}} = useContext(AuthContext);

    const handleLogout = () => {
        logOutUser();
    }

    if(isAuthLoading){
      return (
          <div className="d-flex justify-content-center mt-2">
              <Spinner animation='border' variant='info' />
          </div>
      )
    }

    if(!isAuthenticated){
      return navigate('/user/login')
    }

  return (
    <div className = {cx('wrapper')}>
        <div className={cx('header')}>
        <div className={cx('header-logo')}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={cx('header-info')}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <span>Hỗ trợ 24/7: 1900 9477</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>raucu@gmail.com</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <span>Raucu_Shop</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faGlobe} />
              <span>Việt Nam</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </li>
            <li onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Đăng xuất</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header