import styled from 'styled-components';
import { ButtonBase } from '../../styles/shared';

export const Container = styled.div`
  display: flex;
  overflow: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Image = styled.img`
  height: 50vh;
`;

export const Title = styled.label`
  font-size: 36px;
`;

export const Button = styled(ButtonBase).attrs(() => ({
  variant: 'contained',
  color: 'primary',
}))`
  margin: 1rem;
`;
