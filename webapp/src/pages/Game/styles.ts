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
  justify-content: center;
`;

export const StatsOverlay = styled.div`
  display: flex;
  margin: 80px;
  border-radius: 80px;
  width: 50%;
`;
