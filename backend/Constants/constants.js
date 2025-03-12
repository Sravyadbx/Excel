import dotenv from "dotenv";

dotenv.config();

const constants = {
  DBURI:process.env.DBURI,
  PORT: process.env.PORT | 8080,
  GoogleConstants:{

    authClient:"",
    scopes :[
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/userinfo.profile "
    ],

    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URIS.split(",")[0], // Use first redirect URI


  },
  // redis
  redis_host:process.env.REDIS_HOST,
  redis_port:process.env.REDIS_PORT,
  redis_password:process.env.REDIS_PASSWORD,
  // web-push
  web_push_publicKey:process.env.WEB_PUSH_PUBLIC_KEY,
  web_push_privateKey:process.env.WEB_PUSH_PRIVATE_KEY,

};

export default constants;
