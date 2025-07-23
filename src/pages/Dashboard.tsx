import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Button,
    Grid,
    ButtonGroup,
    Box,
} from '@mui/material';
import { RootState, AppDispatch } from '../redux/store';
import { setFilter, setSearch, openPOCModal } from '../features/pocs/pocSlice';
import POCCard from '../components/POCCard';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, filter, search } = useSelector((state: RootState) => state.pocs);
    const filteredPOCs = list.filter((poc) => {
        const matchesFilter = filter === 'all' || poc.status === filter;
        const matchesSearch = poc.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <>
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" color='#06ff58' component="div" sx={{ flexGrow: 1 }}>
                        Xoriant POC Portal
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <TextField
                        label="Search POCs"
                        variant="outlined"
                        fullWidth
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />

                    <ButtonGroup variant="outlined" aria-label="POC status filter">
                        {['all', 'Active', 'Completed', 'Planned'].map((status) => (
                            <Button
                                key={status}
                                variant={filter === status ? 'contained' : 'outlined'}
                                onClick={() => dispatch(setFilter(status))}
                                sx={{ textTransform: 'none' }}
                                color='success'
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>

                <Grid container spacing={3}>
                    {filteredPOCs.map((poc) => (
                        <Grid sx={{ cursor: 'pointer' }} key={poc._id}>
                            <POCCard
                                poc={poc}
                                onClick={() => {
                                    console.log('card clicked: ', poc)
                                    dispatch(openPOCModal(poc));
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Dashboard;
