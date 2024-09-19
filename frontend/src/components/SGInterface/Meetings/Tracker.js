import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    searchGrid: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    searchButtonGrid: {
        width: '100%',
        height: '100%',
    },
    searchInput: {
        width: '100%',
        display: 'flex',
    },
    searchInputGrid: {
        width: '100%',
    },
    searchIcon: {
        fontSize: '50px',
        color: '#82171f',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        width: '10%',
        marginTop: '40px'
    },
})

function Tracker({ searchQuery, setSearchQuery }) {

    const classes = useStyles();

    const navigate = useNavigate();
    const onSubmit = (e) => {
        navigate(`?s=${searchQuery}`);
        e.preventDefault();
    };

    return (
        <div>
            <form
                action="/"
                method="get"
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <Grid container xs={12} sm={12} md={12} className={classes.searchGrid}>
                    <Grid item xs={12} sm={8} md={8} className={classes.searchInputGrid}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Rechercher une réunion par nom"
                            value={searchQuery}
                            onInput={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            id="tracker"
                            placeholder="Introduire le nom de la réunion"
                            name="tracker"
                            className={classes.searchInput}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className={classes.searchButtonGrid}>
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="secondary"
                                type="submit"
                                sx={{
                                    margin: 'auto!important',
                                    display: 'block',
                                    width: '250px',
                                }}
                            >
                                Rechercher
                            </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Tracker