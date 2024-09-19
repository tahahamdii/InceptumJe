/* eslint-disable no-unused-vars */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    dialogContent: {
        textAlign: 'left'
    },
    button: {
        cursor: 'pointer'
    }
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

export default function FormModal({ button, title, contentText, form }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className={classes.button} onClick={handleClickOpen}>
                {button}
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
                    <DialogContentText className={classes.dialogContent}>
                        {contentText}
                    </DialogContentText>
                    {form}
                </DialogContent>
            </Dialog>
        </div>
    );
}