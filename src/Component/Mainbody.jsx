import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MostRated from './MostRated';
import Searched_list from './Searched_list';
import { styled } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
const url = 'https://api.themoviedb.org/3/search/movie?query=avengers&include_adult=false&language=en-US&page=1';
const initial_url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFiOTVhM2Q2YTJjMDQ2YmVmZGE5OTZiYjUxMzg4OCIsInN1YiI6IjY0MWQxYjdiZTFmYWVkMDBjNTBlY2Y1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PuIc1utVEW6ABx5kk29fJLWhmz5f1h6_uWJO3xdllo'
  }
};
function Mainbody({initial,searchvalue,setintial}) {
 const [movielist,setmovielist] = useState([])
 const [mainloading,setmainloading] = useState(false)
 const [searchparam,setsearchparam] = useSearchParams()
  useEffect(()=>{
    setmainloading(true)
    async function getmovies(){
      let sort = ''
      if(searchparam.get('sort_by')!==''){
        sort = `&sort_by=${searchparam.get('sort_by')}`
      }
        ///Decides if its 1st time  page load or any serch request is already made
        let response = await axios.get(initial?initial_url:
          `https://api.themoviedb.org/3/search/movie?query=${searchvalue}&include_adult=false&language=en-US&page=1${sort}`
          ,options)
        let result = response.data
        let arr = result.results
        if(sort=='&sort_by=popularity.asc'){
          arr.sort((a,b)=>b.popularity-a.popularity)
        
        }
        else if(sort=='&sort_by=primary_release_date.asc'){
          arr.sort((a,b)=>new Date(b.release_date)-new Date(a.release_date))
        }
        setmovielist(arr)
        setmainloading(false)
      
    }
    getmovies()
  },[initial,searchvalue,searchparam])

  return (
    <div>
      {initial?<MostRated movielist={movielist} mainloading={mainloading}/>:<Searched_list  movielist={movielist} searchvalue={searchvalue}  setsearchparam={setsearchparam}  mainloading={mainloading} setintial={setintial}/>}
    </div>
  )
}

export default Mainbody

