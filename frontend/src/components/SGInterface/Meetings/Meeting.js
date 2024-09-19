/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Button, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MainCard from '../../uiComponents/cards/MainCard'
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeeting, getMeetingById, updateMeeting } from '../../../actions/SG/meetings';
import { useParams } from 'react-router-dom';
import CopyToClipboard from "reactjs-copy-to-clipboard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DeleteIcon from '@mui/icons-material/Delete';
import FormModal from './FormModal';
import { getAllMembers } from '../../../actions/RH/members';
import AnimateButton from '../../uiComponents/extended/AnimateButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import 'moment/locale/fr';

const useStyles = makeStyles({
    mainBox: {
        padding: '20px',
        border: '#8e172b solid 2px',
        borderRadius: '10px',
    },
    box: {
        display: 'block',
        whiteSpace: 'nowrap',
        wordBreak: 'break-all',
        margin: 'auto!important',
    },
    link: {
        textDecoration: 'none',
        color: '#8e172b'
    },
    copy: {
        cursor: 'pointer',
        fontSize: '16px',
        color: '#8e172b',
        marginLeft: '6px',

        '&:hover': {
            transform: 'scale(1.1)',
            transition: '0.3s all ease-in-out',
        }
    },
    copyLink: {
        display: 'flex',
        whiteSpace: 'nowrap',
        fontSize: '16px'
    },
    info: {
        fontSize: '16px'
    },
    title: {
        fontSize: '18px',
    },
    img: {
        width: '100%',
        padding: '20px',
        margin: 'auto',
        display: 'block',
    },
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
    editIcon: {
        fontSize: '28px!important',
        color: '#8e172b!important',
        borderRadius: '50%',
    },
    addLinkIcon: {
        fontSize: '38px!important',
        color: '#8e172b!important',
        borderRadius: '50%',
    },
    iconButton: {
        // margin: 'auto',
        // display: 'block',
        float: 'right'
    },
})

const Meeting = () => {

    const classes = useStyles();
    const [user] = useState(JSON.parse(localStorage.getItem("profile")));
    const [loader, setLoader] = useState(false);
    const [meetingLoader, setMeetingLoader] = useState(true);
    const dispatch = useDispatch();
    const [formLoader, setFormLoader] = useState(false);

    const { meeting } = useSelector((state) => state.meetings);
    const { id } = useParams();

    useEffect(async () => {
        await dispatch(getAllMembers());
        await dispatch(getMeetingById(id));
        setMeetingLoader(false);
    }, [dispatch]);

    const initDataState = {
        name: meeting?.name,
        planDate: meeting?.planDate,
        startTime: meeting?.startTime,
        endTime: meeting?.endTime,
        hostLink: meeting?.hostLink,
        participantLink: meeting?.participantLink,
        invitedMembers: meeting?.invitedMembers,
    }

    console.log(meeting?.invitedMembers)

    const validationDataSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Le nom de la réunion est obligatoire'),
        planDate: Yup.string().max(255).required('La date de la réunion est obligatoire'),
        startTime: Yup.string().max(255).required("L'heure de début est obligatoire"),
        endTime: Yup.string().max(255).required("L'heure de fin est obligatoire"),
        hostLink: Yup.string().max(255).required('Le lien de la réunion (hôte) est obligatoire'),
        participantLink: Yup.string().max(255).required('Le lien de la réunion (participant) est obligatoire'),
        invitedMembers: Yup.array().required('Vous devez sélectionner les membres concernés'),
    })

    const meetingHostLink = `${meeting?.hostLink}`;
    const meetingParticipantLink = `${meeting?.participantLink}`;

    const notifyCopy = () => toast.info('Copié dans le presse-papier', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
    });

    return meetingLoader ? (
        <CircularProgress
            className={classes.loader}
        />
    ) :
        meeting ? (
            <MainCard title={meeting?.name} key={id} >
                <Grid container xs={12}>
                    <Grid item xs={12} sm={4} md={4}>
                        <img className={classes.img} src="/images/meet.svg" alt="réunion" />
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                        <div className={classes.mainBox}>
                            <Grid container xs={12}>
                                <Grid item xs={11}>
                                    <div className={classes.box}>
                                        <Typography variant="h4" className={classes.title}>Date de la réunion: </Typography>
                                        <Typography variant="body2" className={classes.info}>{moment(meeting?.planDate).format('DD/MM/YYYY')}</Typography>
                                    </div>
                                    <div className={classes.box}>
                                        <Typography variant="h4" className={classes.title}>Heure de début: </Typography>
                                        <Typography variant="body2" className={classes.info}>{meeting?.startTime}</Typography>
                                    </div>
                                    <div className={classes.box}>
                                        <Typography variant="h4" className={classes.title}>Heure de fin: </Typography>
                                        <Typography variant="body2" className={classes.info}>{meeting?.endTime}</Typography>
                                    </div>
                                    <div className={classes.box}>
                                        <Typography variant="h4" className={classes.title}>Membres invités: </Typography>
                                        {meeting?.invitedMembers.map((member) =>
                                            <Typography variant="body2" className={classes.info}>{member.name}</Typography>
                                        )}
                                    </div>
                                    {user.result.role[0] === "SG" ? (
                                        <>
                                            <div className={classes.box}>
                                                <Typography variant="h4" className={classes.title}>Lien (Hôte): </Typography>
                                                <Typography variant="body2" className={classes.copyLink}>
                                                    {/* &nbsp; */}
                                                    <a className={classes.link} href={"javascript:window.open('" + `${meetingHostLink}` + "', 'newwindow', 'width=1000, height=600')"}>{meetingHostLink}</a>
                                                    <CopyToClipboard text={meetingHostLink} onCopy={notifyCopy}>
                                                        <ContentCopyIcon className={classes.copy} />
                                                    </CopyToClipboard>
                                                </Typography>
                                            </div>
                                            <div className={classes.box}>
                                                <Typography variant="h4" className={classes.title}>Lien (Participant): </Typography>
                                                <Typography variant="body2" className={classes.copyLink}>
                                                    {/* &nbsp; */}
                                                    <a className={classes.link} href={"javascript:window.open('" + `${meetingParticipantLink}` + "', 'newwindow', 'width=1000, height=600')"}>{meetingParticipantLink}</a>
                                                    <CopyToClipboard text={meetingParticipantLink} onCopy={notifyCopy}>
                                                        <ContentCopyIcon className={classes.copy} />
                                                    </CopyToClipboard>
                                                </Typography>
                                            </div>
                                        </>
                                    ) : (
                                        <div className={classes.box}>
                                            <Typography variant="h4" className={classes.title}>Lien : </Typography>
                                            <Typography variant="body2" className={classes.copyLink}>
                                                {/* &nbsp; */}
                                                <a className={classes.link} href={"javascript:window.open('" + `${meetingParticipantLink}` + "', 'newwindow', 'width=1000, height=600')"}>{meetingParticipantLink}</a>
                                                <CopyToClipboard text={meetingParticipantLink} onCopy={notifyCopy}>
                                                    <ContentCopyIcon className={classes.copy} />
                                                </CopyToClipboard>
                                            </Typography>
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={1}>
                                    {user.result.role[0] === "SG" ? (
                                        <>
                                            <FormModal
                                                button={
                                                    <IconButton className={classes.iconButton}>
                                                        <EditIcon className={classes.editIcon} />
                                                    </IconButton>
                                                }
                                                title='Editer Réunion'
                                                contentText='Modifier les détails de cette réunion'
                                                form={<Formik
                                                    initialValues={initDataState}
                                                    validationSchema={validationDataSchema}
                                                    onSubmit={async (values) => {
                                                        await setLoader(true);
                                                        await dispatch(updateMeeting(id, values));
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
                                                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                                            <Grid container xs={12} spacing={2}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        fullWidth
                                                                        name="name"
                                                                        defaultValue={meeting?.name}
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        label="Nom de la Réunion"
                                                                        error={Boolean(touched.name && errors.name)}
                                                                        helperText={touched.name && errors.name}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <TextField
                                                                        fullWidth
                                                                        name="planDate"
                                                                        defaultValue={meeting?.planDate}
                                                                        type="date"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        label="Date de la Réunion"
                                                                        error={Boolean(touched.planDate && errors.planDate)}
                                                                        helperText={touched.planDate && errors.planDate}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <TextField
                                                                        fullWidth
                                                                        name="startTime"
                                                                        defaultValue={meeting?.startTime}
                                                                        type="time"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        label="Heure de début"
                                                                        error={Boolean(touched.startTime && errors.startTime)}
                                                                        helperText={touched.startTime && errors.startTime}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <TextField
                                                                        fullWidth
                                                                        name="endTime"
                                                                        defaultValue={meeting?.endTime}
                                                                        type="time"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        label="Heure de fin"
                                                                        error={Boolean(touched.endTime && errors.endTime)}
                                                                        helperText={touched.endTime && errors.endTime}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} textAlign="center">
                                                                    <a href="javascript:window.open('https://inceptumeet.vercel.app/create', 'newwindow', 'width=1000, height=600')">
                                                                        <IconButton>
                                                                            <AddLinkIcon className={classes.addLinkIcon} />
                                                                        </IconButton>
                                                                    </a>
                                                                </Grid>
                                                                {/* <Grid item xs={12}>
                                                        <Autocomplete
                                                            multiple
                                                            id="tags-standard"
                                                            options={members}
                                                            getOptionLabel={(member) => member.name}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    fullWidth
                                                                    {...params}
                                                                    name="invitedMembers"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Membres invités"
                                                                    error={Boolean(touched.invitedMembers && errors.invitedMembers)}
                                                                    helperText={touched.invitedMembers && errors.invitedMembers}
                                                                />
                                                            )}
                                                        />
                                                    </Grid> */}
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        fullWidth
                                                                        name="participantLink"
                                                                        defaultValue={meeting?.participantLink}
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        label="Lien de la Réunion (Participant)"
                                                                        error={Boolean(touched.participantLink && errors.participantLink)}
                                                                        helperText={touched.participantLink && errors.participantLink}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        fullWidth
                                                                        name="hostLink"
                                                                        defaultValue={meeting?.hostLink}
                                                                        onBlur={handleBlur}
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
                                                                            Editer Réunion
                                                                        </Button>
                                                                    )}
                                                                </AnimateButton>
                                                            </Box>
                                                        </form>
                                                    )}
                                                </Formik>}
                                            />
                                            {formLoader ? (
                                                <CircularProgress className={classes.loader} />
                                            ) : (
                                            <IconButton
                                                onClick={async () => {
                                                    await setFormLoader(true);
                                                    await dispatch(deleteMeeting(meeting?._id));
                                                    await setFormLoader(false);
                                                    await window.location.reload();
                                                }}
                                                className={classes.iconButton}>
                                                <DeleteIcon className={classes.editIcon} />
                                            </IconButton>
                                            )}
                                        </>
                                    ) : (null)}
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </MainCard >
        ) : (
            <Typography align='center' sx={{
                fontSize: '20px',
                marginTop: '150px',
            }}>
                La réunion que vous recherchez n'existe pas
            </Typography>
        )
}

export default Meeting
