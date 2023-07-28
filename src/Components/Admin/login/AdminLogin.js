import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../../Redux/adminReducer';

import { login } from '../../../Redux/userReducer';
import './AdminLogin.css'

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminAuth=Boolean(localStorage.getItem("adminToken"))

  useEffect(() => {
    if (adminAuth) {
      navigate('/admin');
    }
  }, [adminAuth, navigate])

  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/login', admin);
      const { token, user } = response.data;
      localStorage.setItem('adminToken', token);
      dispatch(adminLogin());
      dispatch(login(user));
      navigate('/admin');
    } catch (error) {
      console.log(error);
      alert('Admin login failed.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login">
        <h1>Admin Login</h1>
        <input type="text" name="email" placeholder="Enter your Email" value={admin.email} onChange={handleInputChange} />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={admin.password}
          onChange={handleInputChange}
        />
        <div className="button" onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
  
}

export default AdminLogin;
