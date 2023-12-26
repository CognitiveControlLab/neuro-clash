import { useMutation } from '@apollo/client';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import SearchBar from '../../components/SearchBar/searchBar';
import { GENERATE_IMAGE } from '../../lib/graphql/mutations';
import Images from './images';
import { Content, Loading } from './styles';

function Generator() {
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const theme: any = useTheme();
  const [generateImage] = useMutation(GENERATE_IMAGE);
  const handleSubmit = async () => {
    setLoading(true);

    const { data } : any = await generateImage({
      variables: {
        prompt: value,
      },
    });

    setImages((prev) => [...prev, data.generateImage.url]);
    setLoading(false);
  };

  const hadleChange = (newValue : string) => setValue(newValue);

  return (
    <Grid container>
      <Grid item xs={1} md={2} />
      <Grid item xs={10} md={8}>
        <SearchBar
          value={value}
          onChange={hadleChange}
          onSubmit={handleSubmit}
        />
        <Content>
          { loading
            ? (
              <Loading
                color={theme?.components?.MuiSvgIcon?.styleOverrides?.colorSecondary?.color}
              />
            )
            : <Images urls={images} />}
        </Content>
      </Grid>
      <Grid item xs={1} md={2} />
    </Grid>
  );
}

export default Generator;
