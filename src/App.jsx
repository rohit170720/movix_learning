import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromAPi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux'; 
import { getApiConfiguration , getGenres} from './store/homeSlice';
import {Home, Explore, SearchResult, Details,pageNotFound } from './pages'
import { Header,Footer } from './components';

function App() {
  const {url}  = useSelector((state)=>state.home) ;
  const dispatch = useDispatch() ; 



  useEffect(()=>{
    fetchApiConfig() ; 
    genresCall();
  },[]) ; 

  const fetchApiConfig =()=>{
    fetchDataFromAPi('/configuration').then((res)=>{
      // console.log(res) ;
      
      const url= {
        backdrop: `${res.images.secure_base_url}original`,
        poster:`${res.images.secure_base_url}original`,
        profile:`${res.images.secure_base_url}original`
      }
      dispatch(getApiConfiguration(url)) ;
    })
  }

  const genresCall = async ()=>{
    let promises =  [] ;
    let endPoints = ["tv", "movie"] ; 
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromAPi(`/genre/${url}/list`)) 
    })

    const data = await Promise.all(promises) ; 
    // console.log(data)

    data.map(({genres})=>{

      return genres.map((item)=>(allGenres[item.id]= item.name))

    })

    // console.log("all genres",allGenres);
    dispatch(getGenres(allGenres))
  }

  return (

    <div className='App'>
      
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:mediaType/:id" element={<Details />}/>
        <Route path="/search/:query" element={<SearchResult />}/>
        <Route path="/explore/:mediaType" element={<Explore/>}/>
        <Route path='/*' element={<pageNotFound/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      
    </div>
  )
}

export default App
