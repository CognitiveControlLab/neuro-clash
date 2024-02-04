import styled from 'styled-components';

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;    
`;

export const Row = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: right;
`;

export const Bar = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    height: 50px;
    align-items: center;
    justify-content: space-between;
`;
