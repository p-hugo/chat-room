import styled from 'styled-components';

const MessagePanel = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    min-height: 80vh;
    max-height: 80vh;
    overflow-y: scroll;
    grid-area: message;
`;

export default MessagePanel;