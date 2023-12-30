import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Background = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const RoutesContainer = styled.div`
  display: flex;
  overflow: auto;
`;
