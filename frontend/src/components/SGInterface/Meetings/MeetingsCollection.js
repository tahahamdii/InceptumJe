/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MeetingCard from './MeetingCard';
// import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditMeeting from './EditMeeting';

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

const theme = createTheme();

function MeetingsCollection({ loader, meetings }) {

    const classes = useStyles();
    // const dispatch = useDispatch();

    // useEffect(async() => {
    //     await dispatch(getMeetings());
    //     setLoader(!loader);
    // }, [currentId, dispatch]);

    return loader ? (
        <CircularProgress
            className={classes.loader}
        />
    ) :
        meetings.length !== 0 ? (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                    <Container sx={{ py: 8 }} maxWidth="xl">
                        <Grid container spacing={4}>
                            {meetings?.map((meeting) => (
                                <Grid item key={meeting._id} xs={12} sm={6} md={4}>
                                    <MeetingCard
                                        meeting={meeting}
                                        form={<EditMeeting meeting={meeting} />}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
                {/* Footer */}
                {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
            </Box> */}
                {/* End footer */}
            </ThemeProvider>
        ) : null
}

export default MeetingsCollection
