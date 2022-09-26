import React, { useState, useContext, useEffect } from 'react';
import styles from './SanPhamAdmin.module.scss';
import classNames from 'classnames/bind';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faNoteSticky, faFloppyDisk, faArrowRightFromBracket, faHome, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../../../contexts/ProductContext';

const cx = classNames.bind(styles);

const SanPhamAdmin = () => {
    const [image, setImage] = useState();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        type: ''
    })

    const {name, description, price, type} = product;
    

    const handleChangeProduct = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    }
    console.log(image);

    const handleChangeProductImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImage(file)
    }

    // add product
    const handleSubmitAddProduct = async(e) => {
        e.preventDefault();
        
    }
    // authContext(add product)
    const {createProduct, getAllProducts} = useContext(ProductContext);
    useEffect(() => {
        getAllProducts();
    }, [])
    const handleAddProduct = async () => {
        try {
            await createProduct(product)
        alert("Thêm thành công")
        setProduct({ 
            name: '',
            description: '',
            price: '',
            type: ''
        })
        } catch (error) {
            console.log(error);
        }
    }   
    console.log(product);

  return (
    <div className={cx('wrapper')}>
        <div className={cx('container-header')}>
            <h3>Thành viên</h3>
            <div className={cx('container-header-link')}>
                <FontAwesomeIcon icon={faHome} />
                <span>Trang chủ</span>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Quản lý thành viên</span>
            </div>
        </div>
        <div className={cx('container')}>
            <div className={cx('container-title')}>
                <div className={cx('container-title-create')}>
                    <FontAwesomeIcon icon={faNoteSticky} />
                    <span>Thêm mới</span>
                </div>
                <div className={cx('container-title-btn')}>
                    <button onClick={handleAddProduct} >
                        <FontAwesomeIcon icon={faFloppyDisk}/>
                        Lưu dữ liệu
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Thoát
                    </button>
                </div>
            </div>
    
            <form className={cx('container-content')} onSubmit={handleSubmitAddProduct}>
                <div className={cx('container-form')}>
                    <label>Tên sản phẩm</label>
                    <input 
                        type="text" 
                        placeholder="Tên sản phẩm" 
                        name="name"
                        value={name}
                        onChange={handleChangeProduct}
                    />
                </div>
                <div className={cx('container-form')}>
                    <label>Mô tả</label>
                    <textarea 
                        type="text" 
                        placeholder="Mô tả" 
                        name="description"
                        value={description}
                        onChange={handleChangeProduct}
                    />
                </div>
                <div className={cx('container-form')}>
                    <label>Giá</label>
                    <input 
                        type="text" 
                        placeholder="Giá" 
                        name="price"
                        value={price}
                        onChange={handleChangeProduct}
                    />
                </div>
                <div className={cx('container-form')}>
                    <label>Hình ảnh</label>
                    <input type="file" onChange={handleChangeProductImage}  />
                    {
                        image && (<img src={image.preview} alt="" width={100} height={60}/>)
                    }
                </div>
                <div className={cx('container-form')}>
                    <label>Loại</label>
                    <input 
                        type="text" 
                        placeholder="Loại" 
                        name="type"
                        value={type}
                        onChange={handleChangeProduct}
                    />
                </div>
                <button  >
                        <FontAwesomeIcon icon={faFloppyDisk}/>
                        Lưu dữ liệu
                    </button>
            </form>
        </div>
    </div>
  )
}

export default SanPhamAdmin