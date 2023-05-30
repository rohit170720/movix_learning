import React, {useState, useEffect} from 'react';
import style from './SearchResult.module.scss' ;
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchDataFromAPi } from '../../utils/api';
import { ContentWrapper,
    //  MovieCard, Spinner 
    } from '../../components';
import noResults from '../../assets/no-results.png' 
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCars';




const SearchResult =() =>{
    const [data, setData] = useState(null) ; 
    const [pageNum, setPageNum] = useState(1) ; 
    const [loading, setLoading] = useState(false) ;

    const {query} = useParams() ; 

    const fetchInitialData =() =>{
        setLoading(true) ;
        fetchDataFromAPi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{ setData(res)
            setPageNum((prev)=>prev+1) ;
            setLoading(false) ;
        })
    }

    const fetchNextPageData =() =>{
        fetchDataFromAPi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res)=>{ 
                if(data?.results){
                    setData({...data, results:[...data?.results, ...res.results] }); 
                }
                else {
                    setData(res);
                }
                setPageNum((prev)=>prev+1) ;
        })
    }

    useEffect(()=>{
        setPageNum(1);
        fetchInitialData() ; 
    }, [query])


    return (<div className={style.searchResultsPage}>
        {loading && <Spinner initial={true}/>}
        {!loading && (<ContentWrapper>
            {data?.results?.length>0 ?(<>
            <div className={style.pageTitle}>
                {`Search ${data?.total_results>1?"results":"result"} of '${query}'`}


            </div>
            <InfiniteScroll
            className={style.content}
            dataLength={data?.results?.length||[]}
            next={fetchNextPageData}
            hasMore={pageNum<= data?.total_pages} 
            loader 

            >
                {data?.results?.map((item, index)=>{
                    if(item.media_type==="person") return ; 
                    return (<MovieCard key={index} data={item} fromSearch={true}/>)
                })}
            </InfiniteScroll>
            </>):(
                <span className={style.resultsNotFound}>
                    Sorry Results not Found
                </span>
            )}
        </ContentWrapper>)}

    </div>) ; 
}
export default SearchResult ;