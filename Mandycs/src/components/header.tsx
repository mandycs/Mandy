import React from 'react';
import '../styles/header.css';
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedinIn } from "react-icons/fa";
import logo from '../assets/logo_mandy.png';
const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/"><img src={logo} alt="Mandycs" className='logo'/></a></li>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/about">Acerca de</a></li>
                    <li><a href="/contact">Contacto</a></li>
                    <li><a href="https://github.com/mandycs"><DiGithubBadge className='github'/></a></li>
                    <li><a href="https://www.linkedin.com/in/mandy-cort%C3%A9s-sim%C3%B3n-83115b293/"><FaLinkedinIn className='linkedin'/></a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

