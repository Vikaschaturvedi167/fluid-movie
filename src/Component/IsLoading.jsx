import React from 'react';
import styled, { keyframes } from 'styled-components';

const IsLoading = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};

export default IsLoading;

// Keyframes for the spinning animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the loader container
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
`;


const Loader = styled.div`
  border: 16px solid #f3f3f3; 
  border-top: 16px solid red; 
  border-radius: 50%; /* Makes it a circle */
  width: 120px;
  height: 120px;
  animation: ${spin} 4s linear infinite; 
`;
