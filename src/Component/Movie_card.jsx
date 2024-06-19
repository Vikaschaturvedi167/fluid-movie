import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import movie_poster from '../assets/movie.jpg';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
let posterpathurl = 'https://api.themoviedb.org/3/movie/1022789/images'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFiOTVhM2Q2YTJjMDQ2YmVmZGE5OTZiYjUxMzg4OCIsInN1YiI6IjY0MWQxYjdiZTFmYWVkMDBjNTBlY2Y1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PuIc1utVEW6ABx5kk29fJLWhmz5f1h6_uWJO3xdllo'
  }
};
const base_img_url = 'https://image.tmdb.org/t/p/w500'

function Movie_card({ data,handlepopup }) {
    let rating = data.vote_average.toFixed(1);
    const [path,setpath] = useState(null)
    const [loading ,setloading] = useState(false)
 useEffect(()=>{
  
  setloading(true)
  async function getposterpath (){
    
    let response = await axios.get(`https://api.themoviedb.org/3/movie/${data.id}/images`,options)
    let temp_data = response.data?.posters?.[0]?.file_path
 
    setpath(base_img_url+temp_data)
    setloading(false)
    
  }
  getposterpath()
  
 
 },[data])
 
    return (
        <Maindiv onClick={()=>handlepopup(data.id)}>
            <MovieDetails>
                <Imagediv>
                    {loading ? (
                        <Skeleton height={120} width={100} />
                    ) : (
                        <img src={path} alt="Movie Image" />
                    )}
                </Imagediv>
                <Titlediv>
                    {loading ? (
                            <Skeleton width={200} height={20} count={2} />
                        ) : (
                            <>
                                <h3>{data.title}</h3>
                                <p style={{ marginTop: '5px', borderRadius: '10px', color: 'grey', border: '1px solid grey', width: '50px', padding: '3px', textAlign: 'center' }}>{data.release_date.split('-')[0]==''?'TBD':data.release_date.split('-')[0]}</p>
                            </>
                      )}
                </Titlediv>
            </MovieDetails>
            <Rating_div>
            {loading ? 
                    (<Skeleton width={50} height={50} circle />) : 
                    (<h1 style={{ color:'black',borderRadius: '15px', padding: '10px', backgroundColor: `${rating > 7 ? 'green' : rating > 5 ? 'yellow' : rating === '0.0' ? 'red' : 'red'}` }}>{rating === '0.0' ? 'tbd' : rating}</h1>
                      )}
            </Rating_div>
        </Maindiv>
    );
}

export default Movie_card;

const Titlediv = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 15px;
  @media (max-width: 600px) {
    display:  flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Imagediv = styled.div`
  & img {
     border-radius: 15px;
      height: 120px;
  }
  & p { font-size: 14px;
  color: #666;
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 50px;
  padding: 3px;
  text-align: center;}
  @media (max-width: 600px) {
    & img{
      width: 100%;
      height: 200px;
    }
  }
`;

const Maindiv = styled.div`
  display: flex;
  width: 99%;
  justify-content: space-between;
  font-family: 'Open Sans', sans-serif;
  
  border-radius: 15px;
  position: relative;
  background-color: #f1f0f0; /* Set your desired background color */
  :hover {
      cursor: pointer;

  }
  ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 80%;
      height: 80%;
     
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    width: 50%;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Rating_div = styled.div`

  font-size: 15px;
  font-weight: 700;
  margin-top: 1%;
  & h1 {
    border-radius: 15px;
  padding: 10px;
  
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    margin-top: 10px;
  }
}
`;
