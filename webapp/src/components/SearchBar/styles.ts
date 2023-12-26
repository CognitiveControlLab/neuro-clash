import { Paper, InputBase } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Paper).attrs(() => ({
  sx: {
    display: 'flex', alignItems: 'center',
  },
}))``;

export const Input = styled(InputBase).attrs(() => ({
  sx: { ml: 1, flex: 1 },
}))``;
