import { useEffect, useState } from "react";
import { ContentWrapper, SwitchTabs } from "../../../components";

import style from '../Home.module.scss'
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";



const TopRated =()=>{
    const [endPoint, setEndPoint] = useState("movie") ;
    const onTabChange =(tab)=>{
        setEndPoint(tab==="Movies"?'movie':'tv')
    }

  

    const {data, loading} = useFetch(`/${endPoint}/top_rated`) ;

    return (<div className={style.carouselSection}><ContentWrapper className={style.contentWrapper}>
            <span className={style.carouselTitle}>Top Rated</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>        
        </ContentWrapper >
        <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>

        </div>) ;

}

export default TopRated ;