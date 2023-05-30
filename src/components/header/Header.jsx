import style from './Header.module.scss' ; 
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState(style?.top);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const controllNavbar =() =>{
        // console.log(window.scrollY); 
        if(window.scrollY>200){
            if(window.scrollY>lastScrollY && !mobileMenu){
                
                setShow(style.hide) ;
            }
            else{
                setShow(style.show) ;
            }
            
        }
        else{
            setShow(style.top) ;
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(()=>{
        window.addEventListener("scroll", controllNavbar) ;

        return ()=>{
            window.removeEventListener("scroll", controllNavbar)
        }
    }, [lastScrollY]); 

    useEffect(()=>{
        window.scrollTo(0,0) ;
    }, [location])

    const openSearch =() => {
        setMobileMenu(false) ;
        setShowSearch(true) ;
    }

    const navigationHandler =(type)=>{
        if(type === "movie"){
            navigate("/explore/movie");
        }
        else {
            navigate("/explore/tv");
            
        }
        setMobileMenu(false)  ;
    }

    const openMobileMenu =() => {
        setMobileMenu(true) ;
        setShowSearch(false) ;
     }

     const searchQueryHandler =(event)=>{
        if(event.key ==="Enter" && query.length>0) {
            navigate(`/search/${query}`) ; 
            setTimeout(()=>{
                setShowSearch(false)
            }, 1000)
        }
    }
    return (
        <header className={`${style.header} ${mobileMenu?style.mobileView:""} ${show}`}>
            <ContentWrapper className={style.contentWrapper}>
            <div className={style.logo} onClick={()=>{navigate('/')}}>
                <img src={logo} alt="Logo"/>
            </div>
            <ul className={style.menuItems}>
                <li className={style.menuItem} onClick={()=>{navigationHandler("movie")}}>Movies</li>
                <li className={style.menuItem} onClick={()=>{navigationHandler("tv")}}>Tv Shows</li>
                <li className={style.menuItem}><HiOutlineSearch onClick={openSearch}/></li>
            </ul>
            <div className={style.mobileMenuItems}>
                <HiOutlineSearch onClick={openSearch} />
                {mobileMenu?<VscChromeClose onClick={()=>{setMobileMenu(false)}}/>:<SlMenu onClick={openMobileMenu}/>}
                
                

            </div>
            </ContentWrapper>
            
            {showSearch && <div className={style.searchBar}>
                <ContentWrapper>
                <div className={style.searchInput}>

                            <input  type='text' placeholder='Search for movie or tv Show...' onKeyUp={searchQueryHandler} onChange={(e)=>{setQuery(e.target.value)}}/>
                            <VscChromeClose onClick={()=>{setShowSearch(false)}}/>
                    </div>

                </ContentWrapper>
            </div>}
        </header>
    );
};

export default Header;
