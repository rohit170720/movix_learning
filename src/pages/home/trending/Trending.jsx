import { useEffect, useState } from "react";
import { ContentWrapper, SwitchTabs } from "../../../components";

import style from '../Home.module.scss'
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";



const Trending =()=>{
    const [timeWindow, setTimeWindow] = useState("day") ;
    const onTabChange =(tab)=>{
        setTimeWindow(tab==="Day"?'day':'week')
    }

  

    const {data, loading} = useFetch(`/trending/all/${timeWindow}`) ;

    return (<div className={style.carouselSection}><ContentWrapper className={style.contentWrapper}>
            <span className={style.carouselTitle}>Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>        
        </ContentWrapper >
        <Carousel data={data?.results} loading={loading} />

        </div>) ;

}

export default Trending ;