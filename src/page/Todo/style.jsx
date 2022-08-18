import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerWrapper = styled.div`
  border: 2px solid black;
  height: 90%;
  width: 500px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;
