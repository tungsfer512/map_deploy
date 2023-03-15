import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next'
const SearchForm = () => {
  const { t, i18n } = useTranslation();
  return (
    <Paper
      component="form"
      elevation={0}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flexGrow: 1, mr: 1 }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, boxShadow: "none" }}
        placeholder={t('search')}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}

export default SearchForm