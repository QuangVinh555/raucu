import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import DefaultLayout from './components/layout/DefaultLayout/DefaultLayout';
import SidebarLayout from './components/layout/SidebarLayout/SidebarLayout';
import CuaHang from './components/pages/CuaHang/CuaHang';
import DanhBaNongThon from './components/pages/DanhBaNongThon/DanhBaNongThon';
import GioiThieu from './components/pages/GioiThieu/GioiThieu';
import TrangChu from './components/pages/TrangChu/TrangChu';

import './App.css'
import ProductContextProvider from './contexts/ProductContext';
import GioHang from './components/pages/GioHang/GioHang';
import Login from './components/users/Login/Login';
import Register from './components/users/Register/Register';
import AuthContextProvider from './contexts/AuthContext';
import Admin from './components/admin/layout/AdminLayout/AdminLayout';
import TrangChuAdmin from './components/admin/page/TrangChu/TrangChuAdmin';
import SanPhamAdmin from './components/admin/page/SanPhamAdmin/SanPhamAdmin';
import ChiTietSanPham from './components/pages/ChiTietSanPham/ChiTietSanPham.';

function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <div className="App">
          <Router>
            <Routes>
              {/* Default Layout */}
              <Route path="/" element = {<DefaultLayout />}>
                <Route index element = {<TrangChu />} />
                <Route path="/gioithieu" element = {<GioiThieu />} />
                {/* <Route path="/cuahang/:slug" element = {<ChiTietSanPham />} /> */}
                <Route path = '/giohang' element = {<GioHang />} />
              </Route>
    
              {/* Sidebar Layout */}
              <Route path="/" element = {<SidebarLayout />}>
                <Route path="/cuahang" element = {<CuaHang />} />
                <Route path="/cuahang/:slug" element = {<ChiTietSanPham />} />
                <Route path = '/danhbanongthon' element = {<DanhBaNongThon />} />
              </Route>
  
              {/* Login */}
              <Route path="/user/login" element = {<Login />} />
              <Route path="/user/register" element = {<Register />} />

              {/* Admin */}
              <Route path="/admin" element = {<Admin />} >
                <Route index element = {<TrangChuAdmin />} />
                <Route path="/admin/sanpham" element = {<SanPhamAdmin />} />
              </Route>              
            </Routes>
          </Router>
        </div>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
