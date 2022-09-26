import React, {useContext, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import {ProductContext} from '../../../../contexts/ProductContext';

const cx = classNames.bind(styles);

const productList = [
  {
    name: "Rau củ",
    path: "/cuahang/raucu"
  },

  {
    name: "Hải sản",
    path: "/cuahang/haisan"
  },

  {
    name: "Trái cây",
    path: "/cuahang/traicay"
  },

  {
    name: "Đồ uống",
    path: "/cuahang/douong"
  },

  {
    name: "Đồ khô",
    path: "/cuahang/dokho"
  },

  {
    name: "Thịt trứng",
    path: "/cuahang/thittrung"
  }
];

const Sidebar = () => {

  const {slug} = useParams();
  
  const {productState: {products}} = useContext(ProductContext);
  

  
  // stateTitle
  const [title, setTitle] = useState('Cửa hàng');

  const handleChangeTitle = (titleDisplay) => {
    setTitle(titleDisplay);
  }

  return (
    <div className={cx('sidebar')}>
      <div className={cx('sidebar-title')}>
        <span>TRANG CHỦ / </span>  
        <span>{title}</span>
      </div>

      {/* Danh mục sản phẩm */}
      <div className={cx('sidebar-category')}>
        <h3>DANH MỤC SẢN PHẨM</h3>
        <div className={cx('sidebar-category-list')}>
        {
          productList.map((item, index) => (
            <Link to={item.path} key={index} onClick={()=>handleChangeTitle(item.name)}>
              <span>{item.name}</span>
            </Link>
          ))
        }
        </div>
      </div>

      {/* Lọc theo giá */}
      <div className={cx('sidebar-category')}>
        <h3>LỌC THEO GIÁ</h3>
        <div className={cx('sidebar-category-price')}>
          <div className={cx('sidebar-category_around-left')}></div>
          <div className={cx('sidebar-category_line')}></div>
          <div className={cx('sidebar-category_around-right')}></div>
        </div>
        <div className={cx('sidebar-category-filter')}>
          <button className={cx('sidebar-category_btn-filter')}>Lọc</button>
          <span>Giá 29,000đ - 195,000đ</span>
        </div>
      </div>

      {/* Sản phẩm */}
      <div className={cx('sidebar-category')}>
        <h3>SẢN PHẨM</h3>
        <div className={cx('sidebar-category-list')}>
        {
          products.map((product, index) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array((product.images.data.data)))
            );
            return (
              (product.type === 'traicay') ?
                <Link key={product._id} to = "/cuahang/traicay" className={cx("sidebar-category-list-item")}>
                  <img src={`data:image/jpg;base64, ${base64String}`} alt ="" width="80" height="80" />
                  <div className={cx("sidebar-category-list-item-info")}>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                  </div>
                </Link>
              :
              ("")
            )            
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Sidebar