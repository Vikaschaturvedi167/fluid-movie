import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Movie_card from './Movie_card';
import Popup from './Popup';
import IsLoading from './IsLoading';  // Make sure to import the IsLoading component
import { useSearchParams } from 'react-router-dom';

function Searched_list({ movielist, searchvalue, setsearchparam, mainloading,setintial }) {
  const [isopen, setisopen] = useState(false);
  const [movieid, setmovieid] = useState(null);
  const [filtervalue, setfiltervalue] = useState('');

  useEffect(() => {
    let obj = {
      'sort_by': filtervalue
    };
    setsearchparam(obj);
  }, [filtervalue]);

  function handlepopup(id) {
    setmovieid(id ? id : null);
    setisopen(!isopen);
  }

  return (
    <Maindiv>
      {isopen && movieid && <Popup movieid={movieid} handlepopup={handlepopup} />}
      
      <HomeButton onClick={()=>setintial(true)}>
        <HomeButtonText>Home</HomeButtonText>
      </HomeButton>
      {searchvalue !== '' && <h4 style={{marginTop:'20px'}}>{`Search Result for "${searchvalue}"`}</h4>}
      
      <Topdiv></Topdiv>
      <hr />
      <Filterdiv>
        <select name="" id="" onChange={(e) => setfiltervalue(e.target.value)}>
          <option value="">Sort by</option>
          <option value="popularity.asc">Popularity</option>
         
        </select>
      </Filterdiv>
      <Cardlist>
      {mainloading ? (
          <LoadingContainer>
            <LoadingText>Fetching data...</LoadingText>
            <Spinner />
          </LoadingContainer>
        ) : (
          movielist.length > 0 ? (
            movielist.map((item, key) => (
              <div style={{ display: 'flex', flexDirection: 'column' }} key={key}>
                <Movie_card data={item} handlepopup={handlepopup} />
                <hr style={{ borderTop: '1px solid lightgreen', fontSize: '1px', width: '60%', marginTop: '25px' }} />
              </div>
            ))
          ) : (
            <NoResults>
              <h2>No Movies Found</h2>
              <p>Error for "{searchvalue}"</p>
            </NoResults>
          )
        )}
      </Cardlist>
    </Maindiv>
  );
}

export default Searched_list;


const HomeButton = styled.button`
  background-color: #dcdcdc;
  color: #040404;
  border: none;
  padding: 10px 10px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b6b6b6;
  }

  &:active {
    background-color: #555;
  }
`;
const HomeButtonText = styled.span`
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }
`;
const Filterdiv = styled.div`
  margin-top: 10px;
  font-family: 'Open Sans', sans-serif;
  & > select {
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    background-color: #f9f9f9;
    cursor: pointer;
    &:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    option {
      padding: 10px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      background-color: #f9f9f9;
    }
  }
`;

const Topdiv = styled.div`
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
`;

const Maindiv = styled.div`
  width: 95%;
  margin: 25px;
  font-family: 'Lato', sans-serif;
`;

const Cardlist = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Merriweather', serif;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
`;

const LoadingText = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
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