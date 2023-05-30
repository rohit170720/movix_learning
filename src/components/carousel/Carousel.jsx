import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import style from './Carousel.module.scss' ; 
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel =({data, loading, endPoint, title})=>{
    const carouselContainer = useRef();
    const {url} = useSelector((state)=>state.home) ; 
    const navigate = useNavigate() ;

    const navigation =(dir)=>{
        const container = carouselContainer.current ;
        console.log("carouselContainer",container.scrollLeft, container.offsetWidth);
        const scrollAmount =dir==="left"?container.scrollLeft-(container.offsetWidth+20):container.scrollLeft+(container.offsetWidth+20) ;

        container.scrollTo({
            left:scrollAmount,
            behavior:"smooth" ,
        })

    }


    const skItem =()=>{
        return (
            <div className={style.skeletonItem}>
                <div className={`${style.posterBlock} skeleton`}></div>
                    <div className={`${style.textBlock} skeleton`}>
                        <div className={`${style.title} skeleton`}>
                        </div>
                        <div className={`${style.date} skeleton`}>
                        </div>

                    </div>

                
            </div>
        )
    }

    return (<div className={style.carousel}>
            <ContentWrapper className={style.contentWrapper}>
                {title && <div className={style.carouselTitle}>
                    {title}</div>}
                <BsFillArrowLeftCircleFill
                className={`${style.carouselLeftNav} ${style.arrow}`}
                onClick={()=>navigation("left")}
                />
                <BsFillArrowRightCircleFill
                className={`${style.carouselRightNav} ${style.arrow}`}
                onClick={()=>navigation("right")}
                />
                    {!loading ? (
                        <div className={style.carouselItems} ref={carouselContainer}>
                            {data?.map((item)=>{
                                const posterUrl = item.poster_path? `${url.poster}${item.poster_path}`:PosterFallback ;
                                return (
                                    <div 
                                    className={style.carouselItem} 
                                    key={item.id}
                                    onClick={()=>navigate(`/${item.media_type?item.media_type:endPoint}/${item.id}`)}
                                    >
                                       <div className={style.posterBlock}>
                                        <Img src={posterUrl} alt={item.original_title}/>
                                        <CircleRating rating={item.vote_average.toFixed(1)} className={style.circleRating}/>
                                        <Genres data={item.genre_ids.slice(0,2)} className={style.genres}/>

                                        </div> 
                                        <div className={style.textBlock}>
                                            <span className={style.title}>
                                                {item.title || item.name}
                                            </span>
                                            <span className={style.date}>
                                                {dayjs(item.first_air_date||item.release_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    </div>

                                )
                            })}

                        </div>
                    ): (
                        <div className={style.loadingSkeleton}>
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )}
            </ContentWrapper>
            </div>) ;
}

export default Carousel ; 