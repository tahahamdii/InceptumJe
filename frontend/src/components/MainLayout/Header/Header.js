import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';
import LogoSection from '../LogoSection/LogoSection';
// import SearchSection from './SearchSection/SearchSection';
import ProfileSection from './ProfileSection/ProfileSection';
import NotificationSection from './NotificationSection/NotificationSection';
import { IconMenu2 } from '@tabler/icons';
import Clock from 'react-live-clock';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    currentTime: {
        width: '100%',
        fontSize: '16px',
        margin: 'auto',
        display: 'block',
        textAlign: 'right'
    },
});

const Header = ({ handleLeftDrawerToggle, settings }) => {

    const theme = useTheme();
    const classes = useStyles();

    const today = new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'full',
    }).format();

    const todayCap = today.charAt(0).toUpperCase() + today.slice(1)

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                {!settings ? (
                    // <ButtonBase sx={{
                    //     borderRadius: '12px',
                    //     overflow: 'hidden',
                    //     marginLeft: '50px',
                    // }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginLeft: '50px',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            [theme.breakpoints.down('md')]: {
                                marginLeft: '0px',
                            },
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                    // </ButtonBase>
                ) : null}
            </Box>

            {/* header search */}
            {/* <SearchSection />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} /> */}

            <div className={classes.currentTime}>
                {todayCap} à <Clock
                    format={'HH:mm:ss'}
                    style={{
                        fontSize: '18px',
                        fontWeight: 800
                    }}
                    ticking={true} />
            </div>

            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
