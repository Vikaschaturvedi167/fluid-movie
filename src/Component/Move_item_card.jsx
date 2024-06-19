import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const base_img_url = 'https://image.tmdb.org/t/p/w500';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFiOTVhM2Q2YTJjMDQ2YmVmZGE5OTZiYjUxMzg4OCIsInN1YiI6IjY0MWQxYjdiZTFmYWVkMDBjNTBlY2Y1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PuIc1utVEW6ABx5kk29fJLWhmz5f1h6_uWJO3xdllo'
  }
};

function Move_item_card({ data, handleclick }) {
  let vote = data.vote_average.toFixed(1);
  const [path, setpath] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);

    async function getposterpath() {
      let response = await axios.get(`https://api.themoviedb.org/3/movie/${data.id}/images`, options);
      let temp_data = response.data?.posters?.[0]?.file_path;
      setpath(base_img_url + temp_data);
    }

    getposterpath();
    setloading(false);
  }, [data]);

  return (
    <MovieCard onClick={() => handleclick(data.id)}>
      <MoviePoster src={path} alt="Movie Poster" />
      <MovieInfo>
        <MovieTitle>{data.original_title}</MovieTitle>
        <MovieType>{data.media_type}</MovieType>
        <Divider />
        <MovieMetascore>
          <MetascoreDetails>
            <MetascoreLabel>METASCORE</MetascoreLabel>
            <MetascoreDescription>
              {vote > 7 ? 'Generally Favorable' : vote > 5 ? 'Mixed or Average' : vote === '0.0' ? 'TBD' : 'Flop'}
            </MetascoreDescription>
          </MetascoreDetails>
          <MetascoreValue
            style={{
              backgroundColor: `${vote > 7 ? 'green' : vote > 5 ? 'yellow' : vote === '0.0' ? 'white' : 'red'}`,
              color: `${vote === '0.0' ? 'black' : 'white'}`,
            }}
          >
            {vote === '0.0' ? 'TBD' : vote}
          </MetascoreValue>
        </MovieMetascore>
      </MovieInfo>
    </MovieCard>
  );
}

export default Move_item_card;

const MovieCard = styled.div`
  background-color: #f9f9f9;
  margin: 20px auto;
  width: 320px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  font-family: 'Roboto', sans-serif;
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const MovieTitle = styled.h2`
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const MovieType = styled.p`
  color: grey;
  padding: 3px 10px;
  border: 1px solid grey;
  width: 30%;
  margin: 0 auto;
  border-radius: 5px;
`;

const Divider = styled.hr`
  margin: 15px 0;
  border: 0;
  border-top: 1px solid #e0e0e0;
`;

const MovieMetascore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
`;

const MetascoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MetascoreLabel = styled.span`
  font-weight: bolder;
  letter-spacing: 1px;
  font-size: 0.9em;
  color: #888;
`;

const MetascoreDescription = styled.h4`
  font-size: 1em;
  color: #666;
`;

const MetascoreValue = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 15px;
`;
