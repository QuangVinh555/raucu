import React, {useContext, useEffect} from 'react';
import classNames from 'classnames/bind';
import styles from './CuaHang.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../../contexts/ProductContext';

import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Link} from 'react-router-dom';
import Pagination from '../../modal/Paginate/Pagination';
AOS.init();
const cx = classNames.bind(styles);



const CuaHang = ({category}) => {  

  // product context(get all products)
  const {productState: {products}, getAllProducts} = useContext(ProductContext)  

  // product context(add product to cart)
  const {addProduct, setAddProduct} = useContext(ProductContext);
  // product context(total)
  // const {setTotal} = useContext(ProductContext);

  // product context(search product)
  const {searchProduct} = useContext(ProductContext);

  useEffect(()=> {
    getAllProducts();
  }, [])

  // product context(localStorage)
  // const {storageKey} = useContext(ProductContext);
  // localStorage.setItem(storageKey, JSON.stringify(addProduct));

  const handleAddCart = (id, images, name, price, amount) => {
      const newProduct = {
        id: id,
        images: images,
        name: name,
        price: price,
        amount: amount,
      }
      setAddProduct([...addProduct, newProduct]);
      alert("Đã thêm thành công");
      
  }

  // const searchInputProduct = useRef();
  // console.log(searchInputProduct.current.innerText);

  // search product
  const search = () =>{ 
    const searchInputProduct =document.querySelectorAll('.container-product-list-search');
    searchInputProduct.forEach(product =>{
      // console.log(product);
      if(product.innerText.toLowerCase().includes(searchProduct)){
        product.classList.remove(cx('hide'));
      }
      else{
        product.classList.add(cx('hide'));
      }
    })
  };

  useEffect(()=> {
    search();
  }, [searchProduct])

  // const {category} = useContext(ProductContext);
    console.log(category);

  return (
    <div className={cx('container')} >
          {/* hiển thị kết quả  */}
          <div className={cx('container-display')}>
            <span>Hiển thị 1-12 trong 20 kết quả</span>
            <select>
              <option value = "">Thứ tự mặc định</option>
              <option value = "">Thứ tự theo mức độ phổ biến</option>
              <option value = "">Thứ tự theo điểm đánh giá</option>
              <option value = "">Mới nhất</option>
              <option value = "">Thứ tự theo giá: Thấp đến cao</option>
              <option value = "">Thứ tự theo giá: Cao đến thấp</option>
            </select>
          </div>

          {/* container product */}
          <div className={cx('container-product')}>
                  {/* {
                    products.map(product => {
                      const base64String = btoa(
                        String.fromCharCode(...new Uint8Array((product.images.data.data)))
                      );
                      return (
                        <div className= {cx('container-product-list', 'container-product-list-search')} key= {product._id}>
                          <Link to = {`/cuahang/${product.slug}`}>
                            <img src={`data:image/jpg;base64,${base64String}`} width="200" />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}đ</p>
                          </Link>
                            <FontAwesomeIcon icon={faCartPlus} className={cx('container-product-cart')} onClick={()=>handleAddCart(product._id,`data:image/jpg;base64,${base64String}` ,product.name, product.price, product.amount)} />
                        </div>
                      )
                    })
                  } */}
                <Pagination itemsPerPage={4} data={products} />

          </div>
          {/* <div className={cx('container-pagination')}>
                <Pagination itemsPerPage={4} />
          </div> */}
    </div>
  )
}

export default CuaHang