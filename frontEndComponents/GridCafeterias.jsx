import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from "./Auth";
import { CafeteriaPresentation } from './CafeteriaPresentation';


const GridCafeterias = (props) => {
    const auth = useAuth();

    return (
        <div>
            <Box sx={{ width: '100%' }}>

                <Grid container height={300} rowSpacing={35} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {
                            props.data.map((cafeteria, index) =>(
                                <Grid item xs={6}>
                                    <CafeteriaPresentation cafeteria={cafeteria}/>
                                </Grid>
                            ))
                        }
                </Grid>
            </Box>
            <p>{props.isFetching ? 'Fetching users...' : ''}</p>   
        </div>
    );
  }

export default GridCafeterias;
  
