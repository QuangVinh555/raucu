import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouseChimney, faIdBadge, faBars, faEnvelope, faProcedures, faFlag} from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet} from 'react-router-dom';
import Header from '../../../admin/components/Header/Header';
import Footer from '../../../admin/components/Footer/Footer';
import {AuthContext} from '../../../../contexts/AuthContext';

const cx = classNames.bind(styles);

const mainAdmin = [
    {
        display: "Trang chủ",
        icon: faHouseChimney,
        path: "/admin"
    },

    {
        display: "Quản lý website",
        icon: faIdBadge,
        path: "/admin/website"
    },

    {
        display: "Quản lý giao diện",
        icon: faBars,
        path: "/admin/trangchu"
    },

    {
        display: "Quản lý thư liên hệ",
        icon: faEnvelope,
        path: "/admin/thu-lien-he"
    },

    {
        display: "Quản lý sản phẩm",
        icon: faProcedures,
        path: "/admin/sanpham"
    },

    {
        display: "Quản lý banner",
        icon: faFlag,
        path: "/admin/banner"
    }

]

const Admin = () => {

    const navigate = useNavigate();
    const {authState: {user}} = useContext(AuthContext);
    if(!user){
        return navigate('/user/login')
    }
    if(!user.admin){
        return navigate('/');
    }
   
  return (
    <div className = {cx('wrapper')}>
        <div className = {cx('sidebar')}>
            <div className = {cx('sidebar-header')}>
                <div className = {cx('sidebar-avatar')}>
                    <img src = 'https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg' alt = '' width={60} />
                </div>

                <div className = {cx('sidebar-user')}>
                    <h3>Admin</h3>
                    <span>Xem Website | </span>
                    <span>Xóa Cache</span>
                </div>
            </div>

            <div className = {cx('sidebar-content')}>
                <h3>CHỨC NĂNG HỆ THỐNG</h3>
            </div>

            <div className = {cx('sidebar-container')}>
                <ul>
                    {
                        mainAdmin.map((item, index) => (
                            <Link to = {item.path} key = {index}>
                                <FontAwesomeIcon icon={item.icon} />
                                <li>{item.display}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>

        <div className = {cx('container')}>
            <Header />
            <div className = {cx('')}>
                <Outlet />
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default Admin