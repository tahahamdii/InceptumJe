/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useRef } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { updateUserProfilePicture } from '../../actions/userProfile';

import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
    dialogContent: {
        textAlign: 'left'
    },
    button: {
        cursor: 'pointer',
    },
    twoBtnsContainer: {
        margin: '10px auto',
        width: '100%',
        display: 'flex',
    },
    addBtn: {
        color: '#8e172b!important',
        border: '1px solid #8e172b!important',
        marginRight: '1%!important',
        display: 'block',
        width: '44%',
    },
    deleteBtn: {
        color: '#8e172b!important',
        border: '1px solid #8e172b!important',
        display: 'block',
        width: '55%',
    },
    submitBtn: {
        width: '100%!important',
        backgroundColor: '#8e172b!important',
        margin: 'auto!important',
        display: 'block',
    },
    btnContainer: {
        display: 'block',
    },
    form: {
        margin: 'auto',
        width: '280px',
        display: 'block',
    },
    profile: {
        color: '#ffffff',
        backgroundColor: '#6f2e39!important',
        width: '300px!important',
        height: '300px!important',
        fontSize: '120px!important',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        borderRadius: '50%',
        left: 0,
        right: 0,
        border: '3px solid white',
    },
    profileUserImg: {
        color: '#ffffff',
        backgroundColor: '#6f2e39!important',
        width: '300px!important',
        height: '300px!important',
        fontSize: '120px!important',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        borderRadius: '50%',
        left: 0,
        right: 0,
        border: '3px solid white',
    },
    iconButton: {
        margin: 'auto',
        display: 'block',
    },
    icon: {
        fontSize: '38px!important',
        color: '#8e172b!important',
        border: '1px solid #8e172b',
        borderRadius: '50%'
    },
    loader: {
        color: '#8e172b!important',
        margin: 'auto',
        display: 'block',
    },
});

const CloseDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function ProfilePictureModal({ avatar, title }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [maxWidth, setMaxWidth] = useState('md');
    const [fullWidth, setFullWidth] = React.useState(true);
    const inputRef = useRef(null);

    const triggerFileSelectPopup = () => inputRef.current.click();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [selectedImage, setSelectedImage] = useState(null);

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setSelectedImage(reader.result);
            });
        }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage(null);
    };

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const [userPicture, setUserPicture] = useState({
        profilePicture: ''
    });

    const deleteProfilePicture = () => {
        setUserPicture(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setLoader(true);
        await dispatch(updateUserProfilePicture(userPicture));
        await setLoader(false);
        await setOpen(false);
    }

    const renderPreview = (selectedImage, profilePicture) => {
        if (selectedImage) {
            return (
                <div>
                    <Avatar className={classes.profileUserImg} src={selectedImage}>
                    </Avatar>
                    <IconButton onClick={removeSelectedImage} className={classes.iconButton}>
                        <DeleteIcon className={classes.icon} />
                    </IconButton>
                </div>
            )
        } else {
            return (
                <Avatar className={classes.profileUserImg} src={profilePicture}>
                </Avatar>
            )
        }
    }

    return (
        <div>
            <div className={classes.button} onClick={handleClickOpen}>
                {avatar}
            </div>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <CloseDialogTitle id="form-dialog-title" onClose={handleClose}>
                    {title}
                </CloseDialogTitle>
                <DialogContent dividers>
                    {renderPreview(selectedImage, `/uploads/${user.result.profilePicture}`)}
                    <form className={classes.form} onSubmit={handleSubmit} encType="multiple/form-data">
                        <div className={classes.btnContainer}>
                            <div
                                variant='contained'
                                onChange={onSelectFile}
                                className={classes.twoBtnsContainer}
                            >
                                <input
                                    type='file'
                                    accept='image/*'
                                    ref={inputRef}
                                    filename="profilePicture"
                                    onChange={(e) => {
                                        setUserPicture({ ...userPicture, profilePicture: e.target.files[0] })
                                    }}
                                    style={{ display: 'none' }}
                                />
                                <Button className={classes.addBtn} onClick={triggerFileSelectPopup}>
                                    Ajouter photo
                                </Button>
                                <Button className={classes.deleteBtn} type='submit' onClick={deleteProfilePicture && handleSubmit}>
                                    Supprimer photo
                                </Button>
                            </div>
                            {loader ? (
                                <CircularProgress className={classes.loader} />
                            ) : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitBtn}
                                >
                                    Confirmer
                                </Button>
                            )}
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}