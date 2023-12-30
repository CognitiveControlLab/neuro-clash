import { Box } from '@mui/material';
import styled from 'styled-components';
import { ButtonBase } from '../../styles/shared';

export const Icon = styled.img`
  height: 3rem;
  width: 3rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 2rem 1rem 2rem;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 2rem 1rem 2rem;
`;

export const DrawerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;

export const IconSection = styled(Box).attrs(() => ({
  sx: { display: 'flex' },
}))``;

export const LoginSection = styled(Box).attrs(() => ({
  sx: { display: 'flex' },
}))`
  align-items: center;
`;

export const NavigationSection = styled(Box).attrs(() => ({
  sx: { display: { xs: 'none', md: 'flex' } },
}))`
  margin: 0 1rem 0 1rem;
  flex-grow: 1;
  justify-content: start;
`;

export const ToolsSection = styled(Box).attrs(() => ({
  sx: { display: { xs: 'none', md: 'flex' } },
}))`
  margin: 0 1rem 0 1rem;
`;

export const NavigationButtonBase = styled(ButtonBase)`
  margin: 0 0 0 1rem;
`;

export const NavigationButton = styled(NavigationButtonBase).attrs(() => ({
  variant: 'text',
  color: 'primary',
}))``;

export const LoginButton = styled(NavigationButtonBase).attrs(() => ({
  variant: 'contained',
  color: 'primary',
}))``;

export const SignupButton = styled(NavigationButtonBase).attrs(() => ({
  variant: 'outlined',
  color: 'primary',
}))``;

export const BrandIconContainer = styled.div`

`;
