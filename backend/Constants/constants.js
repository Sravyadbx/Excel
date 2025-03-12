import dotenv from "dotenv";
import cred from "../o_auth.json"  with {type:'json'};

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

    client_id:cred.web.client_id,
    client_secret:cred.web.client_secret,
    redirect_uri:cred.web.redirect_uris[0],


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
