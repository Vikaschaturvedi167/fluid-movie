import React, { useState } from 'react';
import styled from 'styled-components';
import Move_item_card from './Move_item_card';
import '../CSS/Mostrated.css';

function MostRated({ movielist, mainloading }) {
  const [isopen, setisopen] = useState(false);
  const [movieid, setmovieid] = useState(null);

  function handleclick(id) {
    if (id !== null) {
      setisopen(true);
      setmovieid(id);
    } else {
      setisopen(false);
    }
  }

  return (
    <Main_Container className='most_rated_container'>
    
      <h2>Popular Movies</h2>
      <hr />
      <Maindiv className='most_rated_list'>
        {mainloading ? (
          <LoadingContainer>
            <LoadingText>Fetching data...</LoadingText>
            <Spinner />
          </LoadingContainer>
        ) : (
          movielist.map((item, key) => (
            <Move_item_card key={key} data={item} handleclick={handleclick} />
          ))
        )}
      </Maindiv>
    </Main_Container>
  );
}

export default MostRated;

const Main_Container = styled.div`
  margin: 15px;
  & hr {
    margin-top: 15px;
  }
`;

const Maindiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 25px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 5px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: span 3; /* Adjust this to span the correct number of columns */

  @media screen and (max-width: 1024px) {
    grid-column: span 2; /* Adjust this to span the correct number of columns */
  }

  @media screen and (max-width: 768px) {
    grid-column: span 1; /* Adjust this to span the correct number of columns */
  }
`;

const LoadingText = styled.h2`
  margin-bottom: 20px;
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
