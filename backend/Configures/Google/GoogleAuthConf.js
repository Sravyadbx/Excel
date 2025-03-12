import { google } from "googleapis";
import constants from "../../Constants/constants.js";
const { scopes, client_id, client_secret, redirect_uri } =constants.GoogleConstants;

const genGoogleAuthUrlAndClient = async () => {
  const authClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );

  const authUrl = authClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: 'consent',
  });


  return { authClient, authUrl };
};

export { genGoogleAuthUrlAndClient };
