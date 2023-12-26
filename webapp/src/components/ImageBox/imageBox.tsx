import { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Image,
  ImageFullScreen,
  ModalContainer,
  Overlay,
  ImageContainer,
  ToolButton,
  LikeIcon,
  ToolsContainer,
} from './styles';

interface ImageBoxProps {
  url: string;
}

function ImageBox(props: ImageBoxProps): JSX.Element {
  const {
    url,
  } = props;

  const [fullScreen, setFullScreen] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const renderTools = () => (
    <ToolsContainer>
      <ToolButton onClick={() => { setFavorite((prev) => !prev); }}>
        <LikeIcon color="secondary" $like={favorite} />
      </ToolButton>
      <ToolButton onClick={() => {}}>
        <DownloadIcon color="secondary" />
      </ToolButton>
    </ToolsContainer>
  );

  return (
    <>
      <ImageContainer>
        <Image
          onClick={() => { setFullScreen(true); }}
          src={url}
          alt=""
        />
        <Overlay>
          { renderTools() }
        </Overlay>
      </ImageContainer>
      <ModalContainer
        open={fullScreen}
        onClose={() => { setFullScreen(false); }}
      >
        <>
          <ImageFullScreen src={url} alt="" />
          { renderTools() }
        </>
      </ModalContainer>
    </>
  );
}

export default ImageBox;
