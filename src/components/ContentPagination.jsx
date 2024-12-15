import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const ContentPagination=({ page,setPage, numOfPage = 6 })=>{

    const handleChange = (p) => {
        console.log('oldal:',p);
        setPage(p);
         window.scrollTo(0, 0);
      };
  return (
    <Stack spacing={2} sx={{width:'100%'}}>
     
      <Pagination count={numOfPage} variant="outlined" shape="rounded" 
       size="large"
       page={page}
       onChange={handleChange}
      />
    </Stack>
  );
}
