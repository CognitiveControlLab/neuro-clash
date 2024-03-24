import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex: 1;
`;

export const OverlayContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export const StatsOverlay = styled.div`
  display: flex;
  margin: 10px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
`;
