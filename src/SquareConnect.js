import { Button } from '@mui/material';
import React, { Fragment } from 'react'
import { OAuthApi } from 'square';

// Create an instance of the OAuthApi
const oauthApi = new OAuthApi({
    accessToken: "string"
});

const SquareConnect = () => {

    const handleLogin = async (username, password) => {
        try {
            // Call the authenticate endpoint to validate the user's credentials
            const response = await oauthApi.obtainToken({
                clientId: 'YOUR_CLIENT_ID',
                clientSecret: 'YOUR_CLIENT_SECRET',
                grantType: 'password',
                username,
                password,
            });

            // Handle the authentication response
            const { access_token } = response.data;
            // Store the access token or perform any other necessary actions
        } catch (error) {
            // Handle authentication error
        }
    };

    return (
        <Fragment>
            <Button onClick={() => handleLogin()}>handleLogin</Button>
        </Fragment>
    )
}

export default SquareConnect