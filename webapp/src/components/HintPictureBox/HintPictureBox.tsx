import { useState } from 'react';
import {
  Image,
  ImageFullScreen,
  ModalContainer,
  ImageContainer,
  NotDiscoverdIcon,
} from './styles';

interface HintPictureBoxProps {
  url: string | undefined
}

function HintPictureBox(props : HintPictureBoxProps) {
  const {
    url,
  } = props;

  const [fullScreen, setFullScreen] = useState(false);

  return (
    <>
      <ImageContainer>
        { url
          ? (
            <Image
              onClick={() => { setFullScreen(true); }}
              src={url}
              alt=""
            />
          ) : (
            <NotDiscoverdIcon />
          )}
      </ImageContainer>
      <ModalContainer
        open={fullScreen}
        onClose={() => { setFullScreen(false); }}
      >
        <ImageFullScreen src={url} alt="" />
      </ModalContainer>
    </>
  );
}

export default HintPictureBox;
