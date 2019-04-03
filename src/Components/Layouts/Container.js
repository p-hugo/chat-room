import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.single ? `1fr` : `1fr 2fr`)};
  justify-items: ${props => (props.single ? `center` : `left`)};
`;

export default Container;
