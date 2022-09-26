import React from 'react'
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <div className={cx('footer')}>
        <p>Thiết kế Website bởi VinhVo</p>
    </div>
  )
}

export default Footer