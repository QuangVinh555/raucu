import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ChiTietSanPham.module.scss';
import {ProductContext} from '../../../contexts/ProductContext';
const cx = classNames.bind(styles);
const ChiTietSanPham = () => {
    const {slug} = useParams();

    const {findBySlug, addProduct, setAddProduct, amount, setAmount} = useContext(ProductContext);

    // console.log(amount);
    const [slugProduct, setSlugProduct] = useState(undefined);
    // console.log(slugProduct);
    
    useEffect(() => {
        setSlugProduct(findBySlug(slug));
    }, [slug])


    if(slugProduct === undefined){
        return slugProduct
    }
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array((slugProduct.images.data.data)))
    );

    slugProduct.amount = amount;
    const handleAddToCart = () => {
        console.log(slugProduct.amount);
        const newProduct = {
            id: slugProduct._id,
            name: slugProduct.name,
            price: slugProduct.price,
            images: `data:image/jpg;base64,${base64String}`,
            type: slugProduct.type,
            amount: slugProduct.amount

        }
        setAddProduct([...addProduct, newProduct]);
        alert("Thêm thành công");
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                <div className={cx('menu-left')}>
                    <img src={`data:image/jpg;base64,${base64String}`} alt = ""  width = {200}/>    
                </div>
                <div className={cx('menu-right')}>
                    <div className={cx('menu-right-title')}>
                        <span>Trang Chủ /</span>
                        <span>Trái cây</span>
                    </div>
                    <h1>{slugProduct.name}</h1>
                    <div className={cx('menu-right-line')}>

                    </div>
                    <h2>{slugProduct.price}đ</h2>
                    <div className={cx('menu-right-shipper')}>
                        <ul>
                            <li>Gọi mua hàng 1900 636 648</li>
                            <li>Đảm bảo tươi ngon</li>
                            <li>Giao hàng trực tiếp từ vườn</li>
                            <li>Đổi trả trong vòng 24h</li>
                        </ul>
                    </div>
                   <div className={cx('menu-right-btn')}>
                        <div className={cx('menu-right-amount')}>
                            <button onClick={()=> amount <= 0 ? 1 : setAmount(amount - 1)}>-</button>
                            <span>{amount}</span>
                            <button onClick={() => setAmount(amount + 1)}>+</button>
                        </div>
                        <div className={cx('menu-right-pay')}>
                            <button onClick={handleAddToCart}>Thêm vào giỏ</button>
                        </div>
                   </div>

                </div>
            </div>
            <div>
                <p>
                Tăng cường hệ miễn dịch

Lượng vitamin C dồi dào có trong thanh long sạch Bình Thuận là một chất rất tốt cho hệ miễn dịch; giúp cơ thể chống lại một số loại vi khuẩn, chống viêm nhiễm. Ngoài ra, thanh long còn cung cấp một lượng lớn canxi và sắt, có thể giúp phát triển xương, răng chắc khỏe và hỗ trợ hình thành các tế bào hồng cầu trong máu.

Tốt cho tim mạch

Thanh long sạch Bình Thuận có thể giúp cải thiện sức khỏe tim mạch bằng cách giảm cholesterol xấu và cung cấp các cholesterol tốt. Bên cạnh đó, thanh long rất giàu chất béo không bão hòa đơn, giúp tim chúng ta được nghỉ ngơi trong tình trạng tốt nhất.

Ngăn ngừa tiểu đường

Thanh long cung cấp lượng chất xơ dồi dào để kiểm soát lượng đường trong máu và ngăn ngừa nguy cơ mắc bệnh tiểu đường.

Giảm cân an toàn

Nếu bạn có ý định giảm cân, hãy thêm thanh long sạch Bình Thuận vào chế độ ăn. Vì trong thanh long ngoài các vitamin ra thì còn chưa rất nhiều chất xơ, ít hàm lượng calo. Điều này sẽ giúp cơ thể bạn nhanh no, giảm cảm giác thèm ăn.

Phòng chống ung thư

Theo tạp chí Medical Daily, ngoài vitamin thì thanh long còn chứa chất beta- carotene, hợp chất giúp làm giảm khối u và khả năng ung thư, đặc biệt là ung thư ruột kết. Thêm vào đó, chất lycopene nằm trong phần màu đỏ của thanh long còn giúp phòng ngừa ung thư tiền liệt tuyến.

Hỗ trợ tiêu hóa

Trong thanh long sạch Bình Thuận có nhiều các vi nguyên tố như vitamin C, vitamin B1, B2, B3, canxi, photpho, sắt. Hạt thanh long chứa các axit béo không bão hòa da như Omega-3, Omega-6 có tác dụng làm giảm chất triglyceride, giúp giảm nguy cơ tim mạch, hỗ trợ tiêu hoá và cải thiện làn da.

Quá trình sản xuất thanh long sạch Bình Thuận
Thanh long sạch Bình Thuận của vườn chú Thiện được canh tác theo hướng hữu cơ, không sử dụng phân bón hóa học, chỉ dùng phân hữu cơ, phân chuồng và phân xanh từ các trái thanh long đã hoai mục, rất tốt cho sức khỏe người tiêu dùng.


                </p>
            </div>
        </div>
    )
}

export default ChiTietSanPham;