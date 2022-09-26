import React, {useContext} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import {AuthContext} from '../../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';


const cx = classNames.bind(styles);

const DefaultLayout = () => {

  const navigate = useNavigate();

   // authState
  const {authState: {isAuthLoading, isAuthenticated, user}} = useContext(AuthContext);

  if(isAuthLoading){
      return (
          <div className="d-flex justify-content-center mt-2">
              <Spinner animation='border' variant='info' />
          </div>
      )
  }

  if(!user){
    return navigate('/user/login')
  }

  if(user.admin){
    return navigate('/admin')
  }

  else
      return (
        <div className={cx('wrapper')}>
              <Header />
              <div className={cx('container')}>
                {
                  isAuthenticated ? <Outlet /> : navigate('/user/login')
                }
              </div>
              <Footer />
        </div>   
      )
}

export default DefaultLayout