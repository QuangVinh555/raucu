import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind';
import 'animate.css'
import styles from './TrangChu.module.scss';
import {AuthContext} from '../../../contexts/AuthContext';

import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();

const cx = classNames.bind(styles);

const category = [
  {
    name: 'Trái cây',
    icon: 'http://mauweb.monamedia.net/vuonrau/wp-content/uploads/2019/05/p11-100x100-1.jpg',
    path: '/cuahang/traicay'
  },
  {
    name: 'Hải sản',
    icon: 'http://mauweb.monamedia.net/vuonrau/wp-content/uploads/2019/05/4-zalm-loin-white-100x100.png',
    path: '/cuahang/haisan'
  },
  {
    name: 'Đồ uống',
    icon: 'http://mauweb.monamedia.net/vuonrau/wp-content/uploads/2019/05/p12-100x100-1.jpg',
    path: '/cuahang/douong'
  },
  {
    name: 'Rau củ',
    icon: 'http://mauweb.monamedia.net/vuonrau/wp-content/uploads/2019/05/p9-100x100-1.jpg',
    path: '/cuahang/raucu'
  },
  {
    name: 'Đồ khô',
    icon: 'http://mauweb.monamedia.net/vuonrau/wp-content/uploads/2019/05/p8-100x100.jpg',
    path: '/cuahang/dokho'
  },
  {
    name: 'Thịt trứng',
    icon: 'http://mauweb.monamedia.net/vuonrau/wp-content/uploads/2019/05/p2-100x100-1.jpg',
    path: '/cuahang/thittrung'
  }
]

const TrangChu = () => {

  const {authState: {isAuthenticated}} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={cx('container')}>
      
      <div className={cx('container-banner')}>
        <div className={cx('container-sparkle1')}>
          
        </div>

        <div className={cx('container-textbox')}>
          <h2>GIAO TẬN TAY NGƯỜI DÙNG NHANH</h2>
          <h1>THỰC PHẨM ORGANIC</h1>
          <h3>Chúng tôi cung cấp các sản phẩm hữu cơ chất lượng cao</h3>
          <Link to = "/cuahang">
            <span className={cx('container-btn')}>MUA NGAY
              <FontAwesomeIcon icon={faAngleRight} className={cx('container-icon')} />
            </span>
          </Link>
        </div>
      </div>

      <div className={cx('container-category')} data-aos="fade-up">
        <FontAwesomeIcon icon ={faAngleLeft} className={cx('container-category-icon')}/>
        {
          category.map((item, index) => (
            <div key = {index} className={cx('container-category-item')}>
              <Link to = {item.path}>
                <img src={item.icon} alt= "" />
                <span>{item.name}</span>
              </Link>
            </div>
          ))
        }
        <FontAwesomeIcon icon ={faAngleRight} className={cx('container-category-icon')} />
      </div>

      <div className={cx('container-advertisement')}>
          <div className={cx('container-advertisement-img1')} data-aos="fade-right" data-aos-duration="1000"></div>
          <div className={cx('container-advertisement-img2')} data-aos="fade-left" data-aos-duration="1000"></div>
      </div>

      <div className={cx('container-product')}>

      </div>

      <div className={cx('container-promotion')}>

      </div>

      <div className={cx('container-user')}>

      </div>

      <div className={cx('container-news')}>

      </div>
    </div>
  )
}

export default TrangChu