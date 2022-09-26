import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserModal.module.scss';


const cx = classNames.bind(styles);

const UserModal = () => {
  return (
    <div className={cx('modal')}>
          <ul className={cx('user-modal')}>
            <li>Thông tin cá nhân</li>
            <li>Ngôn ngữ</li>
            <li>Đăng xuất</li>
          </ul>
    </div>
  )
}

export default UserModal