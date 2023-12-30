import { Button, IconButton as MUIIconButton } from '@mui/material';
import styled from 'styled-components';

export const IconButton = styled(MUIIconButton)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const ButtonBase = styled(Button)`
  color: ${({ theme }) => theme.palette.text.primary};
`;
