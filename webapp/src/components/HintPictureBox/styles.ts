import { Button, Modal, Stack } from '@mui/material';
import styled from 'styled-components';
import HelpIcon from '@mui/icons-material/Help';

export const Overlay = styled.div`
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  justify-content: flex-end;
  display: flex;
`;

export const ToolsContainer = styled(Stack).attrs(() => ({
  direction: { xs: 'row' },
  spacing: { xs: 1 },
}))`
  margin: 5px;
`;

export const ToolButton = styled(Button).attrs(() => ({
  variant: 'contained',
  color: 'secondary',
}))`
  width: 1rem;
  min-width: 1rem;
  height: 1rem;
  border-radius: 5px;
  padding: 15px;
`;

export const Image = styled.img`
  display: block;
  opacity: 1;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
`;

export const ImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  max-height: 300px;
  min-width: 300px;
  min-height: 300px;
  border: solid;
  border-radius: 10px;
  &:hover ${Overlay} {
    opacity: 1;
  }
`;

export const ImageFullScreen = styled.img`
  width: auto;
  height: auto; 
  min-height: 50vh;
  min-width: 50vh;
  max-width: 100%;
  max-height: 100%;
`;

export const ModalContainer = styled(Modal)`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
`;

export const NotDiscoverdIcon = styled(HelpIcon)`
  font-size: 200px;
`;
