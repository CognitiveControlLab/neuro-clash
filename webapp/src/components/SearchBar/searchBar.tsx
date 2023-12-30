import {
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import { Container, Input } from './styles';

interface SearchBarProps {
  value: string;
  onChange: (value : string) => void;
  onSubmit: (value: string) => void;
}

function SearchBar(props : SearchBarProps) {
  const {
    value,
    onChange,
    onSubmit,
  } = props;

  const intl = useIntl();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event : SyntheticEvent) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Input placeholder={intl.formatMessage({ id: 'search.place_holder' })} value={value} onChange={handleChange} />
        <IconButton type="submit">
          <SearchIcon color="secondary" />
        </IconButton>
      </Container>
    </form>
  );
}

export default SearchBar;
