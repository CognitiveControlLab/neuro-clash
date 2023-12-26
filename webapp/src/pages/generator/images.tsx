import { Grid } from '@mui/material';
import ImageBox from '../../components/ImageBox';

interface ImagesProps {
  urls: string[]
}

function Iamges(props: ImagesProps) {
  const {
    urls,
  } = props;

  return (
    <Grid container spacing={1}>
      { urls.map((url : string) => (
        <Grid item xs={12} md={4}>
          <ImageBox url={url} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Iamges;
