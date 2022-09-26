import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../../contexts/ProductContext';


const cx = classNames.bind(styles);

const Pagination = (props) => {
    const {data, itemsPerPage} = props;
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const {addProduct, setAddProduct} = useContext(ProductContext);


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

    return (
        <div className={cx('container')}>
            <div className={cx('container-product')}>
            {
                currentItems.map(product => {
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
            }
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={cx('pagination')}
                pageLinkClassName={cx("page-num")}
                previousLinkClassName={cx("page-num")}
                nextLinkClassName={cx("active")}
                activeClassName={cx("active")}
            />
        </div>
    )
}

export default Pagination