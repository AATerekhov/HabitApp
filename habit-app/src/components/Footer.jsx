import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
    <footer className="footer">
        <hr className="footer-line" />
        <div className="footer-content">
            <img src="/basket.png" alt="Логотип" className="footer-logo"/>            
            <p>© 2025 Habits tracker. Учебный проект Otus.</p>
        </div>
    </footer>
    )
}

export default Footer