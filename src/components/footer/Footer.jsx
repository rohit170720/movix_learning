import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import style from './Footer.module.scss' ; 

const Footer = () => {
    return (
        <footer className={style["footer"]}>
            <ContentWrapper className={style['contentWrapper']}>
                <ul className={style["menuItems"]}>
                    <li className={style["menuItem"]}>Terms Of Use</li>
                    <li className={style["menuItem"]}>Privacy-Policy</li>
                    <li className={style["menuItem"]}>About</li>
                    <li className={style["menuItem"]}>Blog</li>
                    <li className={style["menuItem"]}>FAQ</li>
                </ul>
                <div className={style["infoText"]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className={style["socialIcons"]}>
                    <span className={style["icon"]}>
                        <FaFacebookF />
                    </span>
                    <span className={style["icon"]}>
                        <FaInstagram />
                    </span>
                    <span className={style["icon"]}>
                        <FaTwitter />
                    </span>
                    <span className={style["icon"]}>
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;