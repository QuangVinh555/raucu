import { createContext, useReducer, useState } from "react";
import productReducer from "../reducers/productReducer";
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({children}) => {
    const [productState, dispatch] = useReducer(productReducer, {
        product: null,
        products: []
    });

    const {products} = productState;

    // localStorage
    const storageKey = 'product';

    // Get all products
    const getAllProducts = async () => {
        const response = await axios.get('http://localhost:8000/product/');
        if(response.data.success) {
            dispatch({
                type: 'SET_ALL_PRODUCTS',
                payload: response.data.products
            })
        }
    }
    // Find by slug sản phẩm
    function findBySlug(slug) {
        return products.find(item => item.slug === slug);
    }
    // find by slug danh mục
    function findBySlugCategory(type) {
        return products.filter(item => item.type === type);
        
    }

    // state category type
    const [category, setCategory] = useState([]);
    console.log(category);


    // create product 
    const createProduct = async (newProduct) => {
       try {
            const response = await axios.post('http://localhost:8000/product/create', newProduct)
                if(response.data.success) {
                    dispatch({
                        type: 'ADD_PRODUCT',
                        payload: response.data.product
                    })
                    return response.data;
                }
       } catch (error) {
            console.log(error);
       }
    }

    // thêm vào giỏ hàng
    const [addProduct, setAddProduct]= useState([]);

    // tổng giá tiền
    const [total, setTotal]= useState(null);

    // search product
    const [searchProduct, setSearchProduct] = useState('');

    // số lượng sản phẩm thêm vào giỏ hàng
    const [amount, setAmount] = useState(1);

    const productContextData = {
        productState,
        getAllProducts,
        addProduct,
        setAddProduct,
        total,
        setTotal,
        searchProduct,
        setSearchProduct,
        storageKey,
        createProduct,
        findBySlug,
        findBySlugCategory   ,
        category,
        setCategory ,
        amount,
        setAmount,
    }

    return (
        <ProductContext.Provider value = {productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;