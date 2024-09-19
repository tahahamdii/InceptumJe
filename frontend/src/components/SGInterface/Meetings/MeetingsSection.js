/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Grid, Button, CircularProgress, Box, Typography, IconButton, TextField, AppBar } from '@mui/material';
import { gridSpacing } from '../../../store/constants';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import FormModal from './FormModal';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@mui/styles";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createMeeting, getMeetings, getMeetingsBySearch } from '../../../actions/SG/meetings';
import AnimateButton from '../../uiComponents/extended/AnimateButton';
import Slider from '../../Slider/Slider';
import { useTheme } from '@mui/material/styles';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { getAllMembers } from '../../../actions/RH/members';
import { Outlet, useNavigate } from 'react-router-dom';
import { Autocomplete } from 'formik-mui';
import MuiTextField from '@mui/material/TextField';
import MeetingsCollection from './MeetingsCollection';
import Announcer from './Announcer';
import Tracker from './Tracker';

const useStyles = makeStyles({
    form: {
        marginTop: '40px',
        width: '80%',
        backgroundColor: '#ffffff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20px',
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
    leftSection: {
        margin: 'auto',
        width: '100%',
        border: '2px solid #8e172b',
        borderRadius: '0 20px 20px 0',
        padding: '50px 100px 50px 50px!important',
    },
    firstText: {
        lineHeight: 1,
        fontWeight: 500
    },
    text: {
        fontSize: '24px',
        lineHeight: 1,
        fontWeight: 400,
        marginBottom: '30px'
    },
    meet: {
        lineHeight: 1,
        fontWeight: 800,
        color: '#8e172b'
    },
    icon: {
        fontSize: '38px!important',
        color: '#8e172b!important',
        borderRadius: '50%',
    },
});

function MeetingsSection() {

    const classes = useStyles();
    const theme = useTheme();

    const members = useSelector((state) => state.members);
    const meetings = useSelector((state) => state.meetings);

    function replaceAcc(str) {
        return str
            .replace(/[àáâãäå]/g, "a")
            .replace(/[èéêë]/g, "e")
            .replace(/[^a-z0-9]/gi, '');
    }

    const filterMeetings = (meetings, query) => {
        if (!query) {
            return meetings;
        }

        return meetings.filter((meeting) => {
            var meetingName = meeting.name;
            return replaceAcc(meetingName.toLowerCase()).includes(replaceAcc(query.toLowerCase()));
        });
    };

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredMeetings = filterMeetings(meetings, searchQuery);


    console.log(members);
    console.log(meetings);

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    const [loader, setLoader] = useState(false);
    const [meetingsLoader, setMeetingsLoader] = useState(true);

    useEffect(() => {
        dispatch(getAllMembers());
        dispatch(getMeetings());
        setMeetingsLoader(!meetingsLoader);
    }, [currentId, dispatch]);

    const initDataState = {
        name: '',
        planDate: '',
        startTime: '',
        endTime: '',
        hostLink: '',
        participantLink: '',
        invitedMembers: [],
    }

    const validationDataSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Le nom de la réunion est obligatoire'),
        planDate: Yup.string().max(255).required('La date de la réunion est obligatoire'),
        startTime: Yup.string().max(255).required("L'heure de début est obligatoire"),
        endTime: Yup.string().max(255).required("L'heure de fin est obligatoire"),
        hostLink: Yup.string().max(255).required('Le lien de la réunion (hôte) est obligatoire'),
        participantLink: Yup.string().max(255).required('Le lien de la réunion (participant) est obligatoire'),
        invitedMembers: Yup.array().required('Vous devez sélectionner les membres concernés'),
    })

    // const navigate = useNavigate();
    // const [search, setSearch] = useState('');

    // const searchMeeting = () => {
    //     if (search.trim()) {
    //         dispatch(getMeetingsBySearch(search));
    //         navigate(`/meetings/search?searchQuery=${search || 'none'}`);
    //     } else {
    //         navigate('/meetings');
    //     }
    // };

    // const handleKeyPress = (e) => {
    //     if (e.keyCode === 13) {
    //         searchMeeting();
    //     }
    // };

    return (
        <Grid container spacing={gridSpacing} >
            <Grid item xs={12} sm={7} md={7} className={classes.leftSection} sx={{
                [theme.breakpoints.down('sm')]: {
                    margin: '25px 0 -100px 25px!important',
                }
            }}>
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom component="div" className={classes.firstText}>
                        <span className={classes.meet}>InceptuMeet</span>, votre application de visioconférence
                    </Typography>
                    <h2 className={classes.text}>
                        Utiliser le service InceptuMeet pour planifier une réunion
                    </h2>
                </Grid>
                <Grid item xs={12}>
                    <FormModal
                        button={
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="secondary"
                                startIcon={<VideoCallIcon />}
                                sx={{
                                    margin: 'auto',
                                    width: '200px',
                                }}
                            >
                                Nouvelle Réunion
                            </Button>
                        }
                        title='Nouvelle Réunion'
                        contentText='Créer une nouvelle réunion'
                        form={<Formik
                            initialValues={initDataState}
                            validationSchema={validationDataSchema}
                            onSubmit={async (values) => {
                                await setLoader(true);
                                await dispatch(createMeeting(values));
                                await setLoader(false);
                            }}
                        >
                            {({
                                errors,
                                handleChange,
                                handleSubmit,
                                touched,
                                values
                            }) => (
                                <Form className={classes.form} noValidate onSubmit={handleSubmit}>
                                    <Grid container xs={12} spacing={2}>
                                        <Grid item xs={12}>
                                            <Field
                                                component={MuiTextField}
                                                fullWidth
                                                name="name"
                                                id="name"
                                                onChange={handleChange}
                                                label="Nom de la Réunion"
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                component={MuiTextField}
                                                fullWidth
                                                name="planDate"
                                                id="planDate"
                                                type="date"
                                                onChange={handleChange}
                                                label="Date de la Réunion"
                                                error={Boolean(touched.planDate && errors.planDate)}
                                                helperText={touched.planDate && errors.planDate}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                component={MuiTextField}
                                                fullWidth
                                                name="startTime"
                                                id="startTime"
                                                type="time"
                                                onChange={handleChange}
                                                label="Heure de début"
                                                error={Boolean(touched.startTime && errors.startTime)}
                                                helperText={touched.startTime && errors.startTime}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                component={MuiTextField}
                                                fullWidth
                                                name="endTime"
                                                id="endTime"
                                                type="time"
                                                onChange={handleChange}
                                                label="Heure de fin"
                                                error={Boolean(touched.endTime && errors.endTime)}
                                                helperText={touched.endTime && errors.endTime}
                                            />
                                        </Grid>
                                        <Grid item xs={12} textAlign="center">
                                            <a href="javascript:window.open('https://inceptumeet.vercel.app/create', 'newwindow', 'width=1000, height=600')">
                                                <IconButton>
                                                    <AddLinkIcon className={classes.icon} />
                                                </IconButton>
                                            </a>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                multiple
                                                fullWidth
                                                options={members}
                                                getOptionLabel={(member) => member.name}
                                                name="invitedMembers"
                                                component={Autocomplete}
                                                style={{ width: 300 }}
                                                renderInput={(params) => (
                                                    <MuiTextField
                                                        {...params}
                                                        fullWidth
                                                        placeholder="Membres invités"
                                                        name="invitedMembers"
                                                        onChange={handleChange}
                                                        label="Membres invités"
                                                        error={touched['invitedMembers'] && !!errors['invitedMembers']}
                                                        helperText={touched['invitedMembers'] && errors['invitedMembers']}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={MuiTextField}
                                                fullWidth
                                                name="participantLink"
                                                id="participantLink"
                                                onChange={handleChange}
                                                label="Lien de la Réunion (Participant)"
                                                error={Boolean(touched.participantLink && errors.participantLink)}
                                                helperText={touched.participantLink && errors.participantLink}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={MuiTextField}
                                                fullWidth
                                                name="hostLink"
                                                id="hostLink"
                                                onChange={handleChange}
                                                label="Lien de la Réunion (Hôte)"
                                                error={Boolean(touched.hostLink && errors.hostLink)}
                                                helperText={touched.hostLink && errors.hostLink}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ mt: 2 }}>
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
                                                    sx={{
                                                        width: '200px',
                                                        margin: 'auto',
                                                        display: 'block'
                                                    }}
                                                >
                                                    Créer Réunion
                                                </Button>
                                            )}
                                        </AnimateButton>
                                    </Box>
                                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                                </Form>
                            )}
                        </Formik>}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
                <Slider />
            </Grid>
            <Grid item xs={12}>
                {/* <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Rechercer réunion par nom" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={searchMeeting} className={classes.searchButton} variant="contained" color="primary">Rechercher</Button>
                </AppBar> */}

                {/* <Announcer
                    message={`${filteredMeetings.length} meetings`}
                /> */}
                <Tracker
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <MeetingsCollection loader={meetingsLoader} meetings={filteredMeetings} />
            </Grid>
            <Outlet />
        </Grid>
    )
}

export default MeetingsSection

