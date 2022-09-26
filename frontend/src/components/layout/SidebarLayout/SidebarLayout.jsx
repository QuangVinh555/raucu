import React, {useContext, useEffect} from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'

import classNames from 'classnames/bind';
import styles from './SidebarLayout.module.scss';
import Spinner from 'react-bootstrap/Spinner';

import {AuthContext} from '../../../contexts/AuthContext';
import {ProductContext} from '../../../contexts/ProductContext';

const cx = classNames.bind(styles);

const SidebarLayout = () => {
  const navigate = useNavigate();
  const {slug} = useParams();
  console.log(slug);
    // authState
  const {authState: {isAuthLoading, isAuthenticated, user}} = useContext(AuthContext);
  const {findBySlugCategory, setCategory} = useContext(ProductContext);
  useEffect(() => {
    setCategory(findBySlugCategory(slug))
  }, [slug])


  if(isAuthLoading){
      return (
          <div className="d-flex justify-content-center mt-2">
              <Spinner animation='border' variant='info' />
          </div>
      )
  }
  else if(!isAuthenticated){
    return navigate('/user/login');
  }
  else if(!user){
    return navigate('/user/login');
  }
  else if(user.admin){
    return navigate('/admin');
  }

  else
  return (
    <div className="wrapper">
        <Header />
        <div className="container" style={{display: 'flex'}}>
            <div className={cx('sidebar')}>
                <Sidebar />
            </div>
            <div className={cx('content')}>
                {/* {
                  isAuthenticated ? <Outlet /> : navigate('/user/login')
                } */}
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default SidebarLayout