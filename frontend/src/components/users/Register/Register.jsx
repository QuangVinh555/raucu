import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFaceAngry} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../../../contexts/AuthContext';

import styles from './Register.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Register = () => {

    const [register, setRegister] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const {username, password, confirmPassword} = register;

    const handleChangeRegister = (e) => {
        setRegister({...register, [e.target.name]: e.target.value});
    }

    const {registerUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Mat khau khong trung nhau");
        }
        try {
            const registerData = await registerUser(register)
            if(registerData.success) {
                navigate('/user/login');
            }
        } catch (error) {
            
        }
    }

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
                <h1>Register Form</h1>
            </div>
            <form className={cx('login-form-submit')} onSubmit = {handleSubmitRegister}>
                <div className={cx('login-form')}>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        className={cx('login-user')} 
                        name="username" placeholder="Username" 
                        id="username" 
                        value={username}
                        onChange={handleChangeRegister}
                    />
                </div>
    
                <div className={cx('login-form')}>
                    <label>Password:</label> 
                    <input 
                        type="password" 
                        className={cx('login-password')} 
                        name="password" 
                        placeholder="Password" 
                        id="password" 
                        value={password}
                        onChange={handleChangeRegister}
                    />
                </div>

                <div className={cx('login-form')}>
                    <label>Confirm password:</label> 
                    <input 
                        type="password" 
                        className={cx('login-password')} 
                        name="confirmPassword" 
                        placeholder="Confirm password" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        onChange={handleChangeRegister}
                    />
                </div>
                <button type="submit" className={cx('login-btn')}>Register</button>
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
                    <Link to = '/user/login'>
                        <span>Login now</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;