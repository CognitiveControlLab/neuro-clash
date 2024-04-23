import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;   
    height: 100vh; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events:none;
`;

export const Row = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: right;
    pointer-events:auto;

`;

export const Bar = styled(Paper)`
    background-color: white;
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    height: 50px;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
`;

export const LinkWrapper = styled.div`
    gap: 5px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: 20px;
`;

export const Link = styled.a`
    color: white;
    justify-content: center;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    cursor: default;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;
