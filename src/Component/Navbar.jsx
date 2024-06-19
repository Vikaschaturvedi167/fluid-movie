import React, { useState } from 'react';
import styled from 'styled-components';
import movie_logo from '../assets/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: pink;
  color: white;
`;

const Navlogo = styled.div`
  img {
    height: 50px; /* Adjust height as needed */
    width: auto; /* Maintain aspect ratio */
  }

  :hover {
    cursor: pointer;
    filter: brightness(85%); /* Adjust brightness on hover */
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  cursor: pointer;
`;

function Navbar({ setintial, setsearchvalue }) {
  const [searchinput, setsearchinput] = useState('');

  function handleclick() {
    if (searchinput !== '') {
      setintial(false);
      setsearchvalue(searchinput);
    }
  }

  return (
    <NavbarContainer>
      <Navlogo
        onClick={() => {
          setintial(true);
          setsearchvalue(searchinput);
        }}
      >
        <img src={movie_logo} alt="Logo" className='logo' />
      </Navlogo>
      <SearchContainer>
        <SearchInput
          type="text"
          onChange={(e) => setsearchinput(e.target.value)}
          placeholder='Search movie'
          className='search-input'
        />
        <SearchIcon icon={faSearch} onClick={handleclick} className='search-icon' />
      </SearchContainer>
    </NavbarContainer>
  );
}

export default Navbar;
