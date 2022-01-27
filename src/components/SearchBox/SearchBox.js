import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBox = () => {
  return (
    <div className="w-full px-2 py-10 flex justify-center">
      <TextField
        id="outlined-basic"
        label="Buscar"
        variant="outlined"
        sx={{ width: '50%' }}
      />
    </div>
  );
};

export default SearchBox;
