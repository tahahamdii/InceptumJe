/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteMeeting } from '../../../actions/SG/meetings';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    deleteIcon: {
        fontSize: '28px!important',
        color: '#8e172b!important',
        borderRadius: '50%',
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
})


export default function MeetingCard({ meeting, form }) {

    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            {/* <CardMedia
                component="img"
                image="https://source.unsplash.com/random"
                alt="random"
            /> */}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {meeting.name}
                </Typography>
                <Typography>
                    <b>Date: </b> {moment(meeting?.planDate).format('DD/MM/YYYY')}
                </Typography>
            </CardContent>
            <CardActions>
                {form}
                {loader ? (
                    <CircularProgress className={classes.loader} />
                ) : (
                    <Button
                        size="small"
                        color="primary"
                        onClick={async () => {
                            await setLoader(true);
                            await dispatch(deleteMeeting(meeting?._id));
                            await setLoader(false);
                        }}
                    >
                        <DeleteIcon className={classes.deleteIcon} />
                    </Button>
                )}
                < div
                    style={{
                        color: '#8e172b',
                        cursor: 'pointer',
                        textAlign: 'right',
                        marginLeft: 'auto',
                        marginRight: '15px'
                    }}
                    onClick={() => {
                        navigate(`${meeting._id}`);
                    }}>
                    {'Plus de détails >>'}
                </div>
            </CardActions>
        </Card >
    );
}