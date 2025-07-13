import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика входа
    console.log('Попытка входа с:', { email, password });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="CryptoBrains Logo" className="login-logo" />
        </Link>
        <h2>С возвращением!</h2>
        <p>Введите свои данные для доступа к аккаунту.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введите ваш пароль"
            />
          </div>
          <button type="submit" className="login-submit-btn">Войти</button>
        </form>
        <div className="login-footer">
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
          <Link to="/forgot-password">Забыли пароль?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;