import React, {useContext, useState} from 'react';
import classNames from 'classnames/bind';
import {Link, useNavigate} from 'react-router-dom';
import styles from './GioHang.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faSquareMinus, faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import { ProductContext } from '../../../contexts/ProductContext';

const cx = classNames.bind(styles);

const GioHang = () => {

    // thêm vào giỏ hàng
    const {addProduct, setAddProduct} = useContext(ProductContext);

    // tổng tiền
    // const {total} = useContext(ProductContext);

    const navigate = useNavigate();
    const handleCuaHang = () => {
        navigate('/cuahang');
    }

    // cộng trừ
    const [count, setCount] = useState();
    
    
      
    // product context(localStorage)
    const {storageKey} = useContext(ProductContext);

    // Xóa sản phẩm trong giỏ hàng 
    const handleDelete = (id) => {    
        const newProduct = addProduct.filter(product => product.id !== id);
        setAddProduct(newProduct);
        
      localStorage.removeItem(storageKey, JSON.stringify(addProduct));
    }

    if(addProduct.length <= 0){
        return <h1>Chưa có sản phẩm nào</h1>
    }
    // const totalPrice = addProduct.reduce((prevTotal, currentTotal)=> {
    //     return prevTotal.price + currentTotal.price
    // });

    var totalPrice = 0;
    for(var item of addProduct){
        totalPrice += item.price
    }

  return (
    <div className={cx('cart')}>
        <div className={cx('container-left')}>
            <form>
                <table  >
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addProduct.map((product)=>(
                            <tr key={product.id}>
                            <td>
                                <FontAwesomeIcon icon={faTrashAlt} className={cx('container-left-delete')} onClick={()=>handleDelete(product.id)} />
                                <Link to= '/'>
                                    <img src ={product.images} alt="" width="100" />
                                    <span>{product.name}</span>
                                </Link>
                            </td>
                            <td>
                                <span>{product.price}</span>
                            </td>
                            <td>
                                <FontAwesomeIcon icon={faSquareMinus} className={cx('container-left-up_down')}  />
                                <span className={cx('container-left-price')}>{product.amount}</span>
                                <FontAwesomeIcon icon={faSquarePlus} className={cx('container-left-up_down')} />
                            </td>

                            <td>
                                <span className={cx('container-left-total')}>{product.price * product.amount}</span>
                            </td>
                        </tr>
                        ))}
                          
                    </tbody>
                </table>
            </form>

            <div className={cx('container-left-btn')}>
                <button type="button" onClick={handleCuaHang}>Tiếp tục xem sản phẩm</button>
                <button type="button">Cập nhật giỏ hàng</button>
            </div>
        </div>

        <div className={cx('container-right')}>
            <div className={cx('container-right-title')}>
                <h4>Cộng giỏ hàng</h4>
            </div>
            <div className={cx('container-right-price-temp')}>
                <span>Tạm tính</span>
                <span>{totalPrice}</span>
            </div>
            <div className={cx('container-right-delivery')}>
                <span>Giao hàng</span>
                <div className={cx('container-right-delivery-info')}>
                    <p>Giao hàng miễn phí</p>
                    <p>Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán</p>
                    <p>Tính phí giao hàng</p>
                </div>
            </div>
            <div className={cx('container-right-price')}>
                <span>Tổng</span>
                <span>{totalPrice}</span>
            </div>
            <button className={cx('container-right-pay')}>Tiến hành thanh toán</button>
            <div className={cx('container-right-discount')}>
                <span>Phiếu ưu đãi</span>
                <input type="text" placeholder="Mã ưu đãi" />
                <button type="button">Áp dụng</button>
            </div>
        </div>
    </div>
  )
}

export default GioHang