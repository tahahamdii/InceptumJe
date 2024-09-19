import { makeStyles } from '@mui/styles';
import logo from '../../assets/images/inceptum.png';
// import logo from '../../assets/images/inceptumicon.png';

const useStyles = makeStyles({
    logo: {
        width: '130px',
        height: '60px',
        margin: 'auto',
        display: 'block',
    }
})

function Logo() {

    const classes = useStyles();

    return (
        <img src={logo} alt="INCEPTUM_LOGO" className={classes.logo} />
    )
}

export default Logo;
