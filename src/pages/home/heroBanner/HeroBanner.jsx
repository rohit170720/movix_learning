import React,{useState, useEffect} from 'react';
import style from './HeroBanner.module.scss' ; 
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
 import { useSelector } from 'react-redux';
import {Img, ContentWrapper} from '../../../components' ;


const HeroBanner =() =>{
    const [background, setBackground] = useState("") ;
    const [query, setQuery] = useState("");
    const {url}  = useSelector((state)=>state.home) ;
    
    const navigate = useNavigate();
    
    const {data, loading} = useFetch("/movie/upcoming") ;

    useEffect(()=>{
        const index = Math.floor(Math.random() * data?.results.length);
        const bg = `${url?.backdrop}${data?.results[index]?.backdrop_path}` ; 
        // console.log(bg) ; 
        setBackground(bg); 
        
    },[data])
 
    const searchQueryHandler =(event)=>{
        if(event.key ==="Enter" && query.length>0) {
            navigate(`/search/${query}`)
        }
    }

    return (<div className={style.heroBanner}>     
        {!loading&&<div className={style['backdrop-img']}>
            <Img src={background}  className={style.heroBannerImg}/>
        </div>}    

        <div className={style['opacity-layer']}></div>
        <ContentWrapper>
                <div className={style.heroBannerContent}>
                    <span className={style.title}>Welcome</span>
                    <span className={style.subTitle}>Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className={style.searchInput}>
                            <input  type='text' placeholder='Search for movie or tv Show...' onKeyUp={searchQueryHandler} onChange={(e)=>{setQuery(e.target.value)}}/>
                            <button >Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
        )
}
export default HeroBanner ;