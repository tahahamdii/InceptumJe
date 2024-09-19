import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from '../../uiComponents/Logo';

import config from '../../../config';

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.basename}>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
