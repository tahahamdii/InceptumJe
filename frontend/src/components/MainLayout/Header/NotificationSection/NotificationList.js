/* eslint-disable no-useless-concat */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-template-curly-in-string */
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material';
import { IconCalendarTime } from '@tabler/icons';
import moment from 'moment';
import 'moment/locale/fr';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

const NotificationList = (props) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem("profile")));

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {props?.notifications?.length ? (
                props?.notifications?.slice(0)?.reverse()?.map((notif) => {

                    const meetingHostLink = `${notif.hostLink}`;
                    const meetingParticipantLink = `${notif.participantLink}`;

                    return (
                        <>
                            {notif.category === "meeting" && (
                                <ListItemWrapper key={notif._id}
                                    onClick={() => {
                                        if (window.location.pathname === `/meetings/${notif.meetingId}`) {
                                            navigate(`meetings/${notif.meetingId}`);
                                        } else {
                                            navigate(`meetings/${notif.meetingId}`);
                                            window.location.reload();
                                        }
                                    }}
                                >
                                    <ListItem alignItems="center">
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{
                                                    color: theme.palette.success.dark,
                                                    backgroundColor: theme.palette.success.light,
                                                    border: 'none',
                                                    borderColor: theme.palette.success.main
                                                }}
                                            >
                                                <IconCalendarTime stroke={1.5} size="1.3rem" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={notif.title} />
                                        <ListItemSecondaryAction>
                                            <Grid container justifyContent="flex-end">
                                                <Grid item xs={12}>
                                                    <Typography variant="caption" display="block" gutterBottom>
                                                        {moment(notif.createdAt).locale("fr").fromNow()}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Grid container direction="column" className="list-container">
                                        <Grid item xs={12} sx={{ pb: 2 }}>
                                            <Typography variant="subtitle2">{notif.message}
                                                <>
                                                    {notif.action !== "cancel" ?
                                                        user.result.role[0] === "SG" ? (
                                                            <a href={"javascript:window.open('" + `${meetingHostLink}` + "', 'newwindow', 'width=1000, height=600')"}>{meetingHostLink}</a>
                                                        ) : (
                                                            <>
                                                                <a href={"javascript:window.open('" + `${meetingParticipantLink}` + "', 'newwindow', 'width=1000, height=600')"}>{meetingParticipantLink}</a>
                                                                {/* {user.result.role[0] === "SG" ? (
                                                                    <a href={meetingHostLink} target='_blank' rel="noreferrer">{meetingHostLink}</a>
                                                                ) : (
                                                                    <a href={meetingParticipantLink} target='_blank' rel="noreferrer">{meetingParticipantLink}</a>
                                                                )} */}
                                                            </>
                                                        ) : (
                                                            null
                                                        )
                                                    }
                                                </>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItemWrapper>
                            )
                            }
                            <Divider />
                        </>
                    );
                })
            ) : (
                <ListItemWrapper>
                    <ListItem alignItems="center">
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                <Typography variant="subtitle2">Aucune notification à afficher !</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                </ListItemWrapper>
            )}
        </List >
    );
}

export default NotificationList;
