/* eslint-disable no-unused-vars */
import { Avatar, Divider, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTheme, styled } from '@mui/material/styles';
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import Header from "../../../components/MainLayout/Header/Header";
import { makeStyles } from "@mui/styles";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateUserProfileData } from "../../../actions/userProfile";
import AnimateButton from "../../../components/uiComponents/extended/AnimateButton";
import { cities } from "../../../components/data";
import ProfilePictureModal from "../../../components/modals/ProfilePictureModal";

const Main = styled('main')(({ theme }) => ({
    ...theme.typography.mainContent,
    width: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
}));

const useStyles = makeStyles({
    profileSection: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        margin: '4px auto 0 auto',
        display: 'block',
        paddingTop: '20px',
        paddingBottom: '20px',
        border: '#8e172b 2px solid'
    },
    settingsSection: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        margin: '4px auto 0 auto',
        display: 'block',
        padding: '20px',
        border: '#8e172b 2px solid'
    },
    profileContent: {
        margin: 'auto',
        display: 'block',
        width: '260px',
    },
    avatar: {
        width: '260px',
        height: '260px',
        color: '#ffffff',
        margin: 'auto',
    },
    name: {
        width: '100%',
        marginTop: '18px',
        fontSize: '22px',
    },
    role: {
        fontSize: '16px',
        color: '#616161',
    },
    loader: {
        color: '#8e172b!important',
        margin: 'auto',
        display: 'block',
    },
    loading: {
        margin: '20 auto 10 auto',
        cursor: 'not-allowed!important',
        width: '50%!important',
        display: 'block!important',
    },
});

function SettingsPage() {

    const theme = useTheme();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const initState = {
        firstName: user.result.firstName,
        lastName: user.result.lastName,
        phone: user.result.phone,
        city: user.result.city,
        address: user.result.address,
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().max(255).required('Prénom est obligatoire'),
        lastName: Yup.string().max(255).required('Nom est obligatoire'),
        phone: Yup.string().length(8, 'Le N° de Téléphone doit contenir exactement 8 chiffres').required('N° de Téléphone est obligatoire'),
        city: Yup.string().max(255).required('Ville est obligatoire'),
        address: Yup.string().max(255).required('Adresse est obligatoire'),
    })

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        bgcolor: theme.palette.background.default,
                        transition: theme.transitions.create('width')
                    }}
                >
                    <Toolbar>
                        <Header settings />
                    </Toolbar>
                </AppBar>
                <Main theme={theme}>
                    <Grid container xs={12}>
                        <Grid item xs={12} sm={6} md={3} className={classes.profileSection}>
                            <div className={classes.profileContent}>
                                <ProfilePictureModal
                                    avatar={
                                        <Avatar
                                            src={`/uploads/${user.result.profilePicture}`}
                                            className={classes.avatar}
                                        />
                                    }
                                    title="Photo de profil"
                                />
                                <Typography variant="h4" align="center" className={classes.name}>
                                    {user.result.name}
                                </Typography>
                                <Typography variant="subtitle2" align="center" className={classes.role}>
                                    {user.result.role[0] === "SG" ? "Secrétaire Général" : null}
                                    {user.result.role[0] === "RH" ? "Responsable Ressources Humaines" : null}
                                    {user.result.role[0] === "Member" ? `Membre ${user.result.rank}` : null}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} className={classes.settingsSection}>
                            <Formik
                                initialValues={initState}
                                validationSchema={validationSchema}
                                onSubmit={async (values) => {
                                    await setLoader(true);
                                    await dispatch(updateUserProfileData(values));
                                    await setLoader(false);
                                }}
                            >
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    touched,
                                }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container spacing={6}>
                                            <Grid item container spacing={2} xs={12} sm={8} md={8}>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
                                                        <InputLabel htmlFor="outlined-adornment-firstName">Prénom</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-firstName"
                                                            name="firstName"
                                                            defaultValue={user.result.firstName}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Prénom"
                                                            inputProps={{}}
                                                        />
                                                        {touched.firstName && errors.firstName && (
                                                            <FormHelperText error id="standard-weight-helper-text-firstName">
                                                                {errors.firstName}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
                                                        <InputLabel htmlFor="outlined-adornment-lastName">Nom</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-lastName"
                                                            name="lastName"
                                                            defaultValue={user.result.lastName}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Nom"
                                                            inputProps={{}}
                                                        />
                                                        {touched.lastName && errors.lastName && (
                                                            <FormHelperText error id="standard-weight-helper-text-lastName">
                                                                {errors.lastName}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                                                        <InputLabel htmlFor="outlined-adornment-phone">N° de Téléphone</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-phone"
                                                            name="phone"
                                                            defaultValue={user.result.phone}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="N° de Téléphone"
                                                            inputProps={{}}
                                                        />
                                                        {touched.phone && errors.phone && (
                                                            <FormHelperText error id="standard-weight-helper-text-phone">
                                                                {errors.phone}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth error={Boolean(touched.city && errors.city)} sx={{ ...theme.typography.customInput }}>
                                                        {/* <InputLabel htmlFor="outlined-adornment-city">Ville</InputLabel> */}
                                                        <TextField
                                                            id="outlined-adornment-city"
                                                            name="city"
                                                            defaultValue={user.result.city}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Ville"
                                                            inputProps={{}}
                                                            select
                                                        >
                                                            {cities.map((city) => (
                                                                <MenuItem value={city.municipale}>{city.label}</MenuItem>
                                                            ))}
                                                        </TextField>
                                                        {touched.city && errors.city && (
                                                            <FormHelperText error id="standard-weight-helper-text-city">
                                                                {errors.city}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
                                                        <InputLabel htmlFor="outlined-adornment-address">Adresse</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-address"
                                                            name="address"
                                                            defaultValue={user.result.address}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Adresse"
                                                            inputProps={{}}
                                                        />
                                                        {touched.address && errors.address && (
                                                            <FormHelperText error id="standard-weight-helper-text-address">
                                                                {errors.address}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} sx={{
                                                margin: 'auto auto 10px auto',
                                                display: 'block',
                                                width: '220px',
                                            }}>
                                                <Box sx={{
                                                    margin: 'auto',
                                                    display: 'block',
                                                    width: '180px',
                                                }}>
                                                    <AnimateButton>
                                                        {loader ? (
                                                            <CircularProgress className={classes.loader} />
                                                        ) : (
                                                            <Button
                                                                fullWidth
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                                color="secondary"
                                                            >
                                                                Enregistrer
                                                            </Button>
                                                        )}
                                                    </AnimateButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </Grid>
                        <Divider />
                    </Grid>
                </Main>
            </Box>
        </>
    );
}

export default SettingsPage;
