import styled from 'styled-components';
import GridLoader from 'react-spinners/GridLoader';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(GridLoader)`
  margin-top: 10rem;
`;
