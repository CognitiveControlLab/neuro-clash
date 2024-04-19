/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: black;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const OverlayContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const StatsOverlay = styled.div`
  display: flex;
  margin: 10px;
  border-radius: 10px;
  align-items: center;
  width: 600px;
  height: 250px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
`;

export const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: white;
`;
