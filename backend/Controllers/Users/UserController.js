import { genGoogleAuthUrlAndClient } from "../../Configures/Google/GoogleAuthConf.js";

import { UserAuthObjHolder } from "../../Utils/Users/userClass.js";

const loginUserOAuthController = async (req, res) => {
  try {
    const data = await genGoogleAuthUrlAndClient();

    // stroe the authclient so further accesible in any file.

    UserAuthObjHolder.setAuthClinetAndUrlInUserClass(data);

    if (data) {
      return res
        .status(200)
        .json({ message: "auth url and client generate sucessfully", data });
    }
    return res.status(500).json({
      message: "failed in generation of the auth client and the auth url",
    });
  } catch (error) {
    return new Error(error);
  }
};

const handelCallBackUrlController = async (req, res) => {
  try {
    const { code } = req.query;
    console.log(code)
    if (code !== undefined) {
      try {
        const authClient = UserAuthObjHolder.authClient;

        const data = await authClient.getToken(code);
        console.log("data" ,data);
        UserAuthObjHolder.setAuthClient(UserAuthObjHolder.authClient);
        UserAuthObjHolder.setAuthTokenInUserClass(data.tokens);
        authClient.setCredentials(data.tokens);

        return res.status(200).json({
          message: "Token obtained successfully",
          tokens: data.tokens,
        });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Error exchanging code for token", error:error?.message });
      }
    } else {
      return res.status(400).json({ message: "No code found in the request" });
    }
  } catch (error) {
    return new Error(error);
  }
};

export { loginUserOAuthController, handelCallBackUrlController };
