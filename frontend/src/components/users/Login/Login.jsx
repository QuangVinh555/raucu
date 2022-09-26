import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFaceAngry} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';


import styles from './Login.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Login = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const {username, password} = login;

    const handleChangeLogin = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const {loginUser} = useContext(AuthContext);

    const hanldeSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(login);
            if(loginData.success) {
                return navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // authState
    const {authState: {isAuthLoading, isAuthenticated}} = useContext(AuthContext);

    if(isAuthLoading){
        return (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    }

    else if(isAuthenticated){
         return navigate('/');
    }
    else
 
    return (
        <div className = {cx('wrapper')}>
            <div className={cx('login')}>
                <div className={cx('login-title')}>
                    <h1>Login Form</h1>
                </div>
                <form className={cx('login-form-submit')} onSubmit={hanldeSubmitLogin}>
                    <div className={cx('login-form')}>
                        <label>Username:</label>
                        <input 
                            type="text" 
                            className={cx('login-user')} 
                            name="username" 
                            placeholder="Username" id="username" 
                            value={username}
                            onChange={handleChangeLogin}
                        />
                    </div>
        
                    <div className={cx('login-form')}>
                        <label>Password:</label> 
                        <input 
                            type="text" 
                            className={cx('login-password')} 
                            name="password" 
                            placeholder="Password" 
                            id="password" 
                            value={password}
                            onChange={handleChangeLogin}
                        />
                    </div>
                    <button type="submit" className={cx('login-btn')}>Login</button>
                </form>
                <div className={cx('login-container')}>
                    <p>Or login with</p>
                    <div className={cx('login-content')}>
                        <button className={cx('login-btn-facebook')}>
                            <FontAwesomeIcon icon={faFaceAngry} />
                            <h4>Facebook</h4>
                        </button>
                        <button className={cx('login-btn-google')}>
                            <FontAwesomeIcon icon={faFaceAngry} />
                            <h4>Google</h4>
                        </button>
                    </div>
                    <div className={cx('login-footer')}>
                        <span>Not a member?</span>
                        <Link to = '/user/register'>
                            <span>Register now</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;