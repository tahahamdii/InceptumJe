
const setTokenCookies = (res, accessToken,refreshToken,newAccessTokenExp,newRefreshTokenExp ) => {
    // fetch the time of accessToken
    const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now()/1000)) * 1000;
    const refreshTokenMaxAge = (newRefreshTokenExp - Math.floor(Date.now()/1000)) * 1000;

    // set Cookies for accessToken 
    res.cookie('accessToken',accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: accessTokenMaxAge,
    });

    // set Cookies for refreshToken 
    res.cookie('refreshToken',refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: refreshTokenMaxAge,
    });

    // set Cookies for isAuth
    res.cookie('is_auth',true, {
        httpOnly: false,
        secure: false,
        maxAge: refreshTokenMaxAge,
    });
}

export default setTokenCookies