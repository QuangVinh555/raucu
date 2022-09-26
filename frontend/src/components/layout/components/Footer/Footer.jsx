import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import logoWhite from '../../../../assets/logo/logo-white.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationPin, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faInstagram, faFacebook, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx('footer')}>
      <div className={cx('footer-column')}>
        <div className={cx('footer-column-layout')}>
          <img src={logoWhite} alt = "" />
          <ul>
            <li>
              <FontAwesomeIcon icon={faLocationPin} />
              319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              0822033738
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              voquangvinh555@gmail.com
            </li>
            <li>
              <FontAwesomeIcon icon = {faFacebook} />
              voquangvinh
            </li>
          </ul>
        </div>
        <div className={cx('footer-column-layout')}>
          <h2>SẢN PHẨM</h2>
          <ul>
            <li>Rau củ</li>
            <li>Hải sản</li>
            <li>Trái cây</li>
            <li>Đồ uống</li>
            <li>Thịt trứng</li>
          </ul>
        </div>
        <div className={cx('footer-column-layout')}>
          <h2>DANH MỤC</h2>
          <ul>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Cửa hàng</li>
            <li>Kiến thức</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className={cx('footer-column-layout')}>
          <h2>DỊCH VỤ</h2>
          <ul>
            <li>Rau củ</li>
            <li>Hải sản</li>
            <li>Trái cây</li>
            <li>Đồ uống</li>
            <li>Thịt trứng</li>
          </ul>
        </div>
        <div className={cx('footer-column-layout', 'footer-column-layout-2')}>
          <h2>ĐĂNG KÝ</h2>
          <p>Đăng ký nhận được thông tin mới nhất từ chúng tôi</p>
          <input type="text" placeholder="Email..." />
          <div className={cx('footer-mxh')}>
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faYoutube} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer