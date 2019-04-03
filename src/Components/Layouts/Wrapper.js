import styled from 'styled-components';

const Wrapper = styled.div`
  width: 90vw;
  display: grid;
  grid-template-areas: 
  "message message"
  "message message"
  "input input"
  ;
  grid-row-gap: 10px;
  margin: 0 auto;
`;


export default Wrapper;