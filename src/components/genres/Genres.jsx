import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const Genres =({data, className})=>{
    const {genres} = useSelector((state)=>state.home);

    return (<div className={`genres ${className||""}`}>{data?.map((g)=>{
        if(!genres[g]) return;
        return (<div className="genre" key={g}>
            {genres[g]} 

        </div>)
    })}</div>)
}

export default Genres;