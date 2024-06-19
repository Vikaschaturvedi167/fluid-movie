import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IsLoading from './IsLoading';

const url = 'https://api.themoviedb.org/3/movie/';
const trailer_url = 'https://api.themoviedb.org/3/movie/299536/videos?language=en-US'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFiOTVhM2Q2YTJjMDQ2YmVmZGE5OTZiYjUxMzg4OCIsInN1YiI6IjY0MWQxYjdiZTFmYWVkMDBjNTBlY2Y1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PuIc1utVEW6ABx5kk29fJLWhmz5f1h6_uWJO3xdllo'
  }
};

const Popup = ({ movieid, handlepopup }) => {
  
  const [moviedata, setmoviedata] = useState(null);
  const [trailer,settrailer] = useState([])
  const [trailerloading,settrailerloading] = useState(false)
  const [loading,setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    let name = ''
    async function getmoviedetail() {
      let data = await axios.get(url + movieid, options);
      let result =data.data;
      get_trailer(result.title)
      setmoviedata(result);
      
    }
    getmoviedetail();
    //////get trailer///////
    async function get_trailer(name){
     settrailerloading(true)
      let response =await axios.get(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,options)
      let result = response.data
      let arr = result.results.filter((item)=>item.type=='Trailer')
       settrailer(arr)
       settrailerloading(false)
    }
    
    ////////////////////////
   
    setloading(false)
    return () => {
      setloading(false)
      setmoviedata(null);
    };
  }, [movieid]);
  console.log(moviedata);
  return (
    <PopupContainer>
      {moviedata &&!loading&&!trailerloading ? (
        <PopupContent>
          <CloseButton onClick={() => handlepopup(null)}>&times;</CloseButton>
          
          <Left>
            {trailer.length>=1 &&!trailerloading ?<iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer[0]['key']}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Movie Trailer"
              style={{ borderRadius: "15px 0 0 15px" }}
            ></iframe>:<h2>No Video found</h2>}
          </Left>
          <Right>
            <Title>{moviedata.title}</Title>
            <Tags>
            {moviedata.genres.map((item,index)=>{
              return <p key={index}>{item.name}</p>
            })}
            </Tags>
            <Info>
              <strong>Available Languages:</strong>
              <div style={{display:'flex',gap:'10px'}}>
                {moviedata?.spoken_languages?.reduce((acc, item) => {
                  let newLanguage = item.english_name ? item.english_name : '';
                  if (newLanguage) {
                    acc.push(newLanguage);
                  }
                  return acc;
                }, []).map((language, index) => (
                  <LanguageTag key={index}>{language}</LanguageTag>
                ))}
              </div>
            </Info>
            <Overview><strong>Overview:</strong> {moviedata.overview}</Overview>
            <ReleaseDate><strong>Release Date:</strong> {moviedata.release_date}</ReleaseDate>
            <Overview><strong>Ratings:</strong>{moviedata.vote_average.toFixed(1) === '0.0' ? 'tbd' : ` ${moviedata.vote_average.toFixed(1)}/10`}</Overview>
          </Right>
        </PopupContent>
      ) : (
        <IsLoading />
      )}
    </PopupContainer>
  );
};

export default Popup;

const PopupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
   /* White background */
   background-color: rgba(202, 202, 202, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const PopupContent = styled.div`
  width: 80%;
  max-height: 80vh; 
  background-color: #ffffff; 
  border-radius: 15px;
  overflow-y: auto; 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  position: relative;
  color: #333333; 
  min-height: 450px;
  padding: 20px;
  @media screen and (max-width: 720px){
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow-y: scroll;
      padding: 20px;
      min-height: 100px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #cccccc;
  border: none;
  border-radius: 50%;
  color: #333333; 
  font-size: 20px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: #aaaaaa; 
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px 0 0 15px;

  @media screen and (max-width: 720px){
    /* margin-top: 100px; */
    width: 100%;
    height: 200px;
    
   
  }
  
`;

const Right = styled.div`

  flex: 1;
  padding-left: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-height: 450px;

  overflow-y: scroll;
  @media screen and (max-width: 720px){
    /* margin-top: 100px; */
    margin-top: 20px;
    padding-top: 100px;
    
   
  }

`;

const Title = styled.h1`
 
  color: #333333; 
  font-size: 2.5em;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif; 
`;
const Tags = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  & > p {
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 5px;
    font-size: 0.9em;
    color: #333333; 
    font-family: 'Open Sans', sans-serif;
  }
`;

const Info = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #333333; 
  font-size: 1.1em;
  font-family: 'Lato', sans-serif; 

  strong {
    color: #333333; 
    font-weight: bold;
  }
`;

const LanguageTag = styled.span`
  display: inline-block;
 
  padding: 5px 10px;
  border: 1px solid #cccccc; 
  border-radius: 12px;
  font-size: 0.9em;
  color: #333333; 
  font-family: 'Ubuntu', sans-serif; 
`;
const Overview = styled.p`
  margin-top: 10px;
  font-size: 1.1em;
  color: #333333; 
  
  font-family: 'Merriweather', serif;
`;

const ReleaseDate = styled.p`
margin-top: 20px;
  font-size: 1.1em;
  color: #333333; 
  
  font-family: 'Raleway', sans-serif; 
`;
