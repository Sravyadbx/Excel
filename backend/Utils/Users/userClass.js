class UserAuthObjHolder {
  static authClient;
  static authUrl;
  static tokenStore;
  constructor() {}

  static setAuthClinetAndUrlInUserClass = (obj) => {
    UserAuthObjHolder.authClient = obj.authClient;
    UserAuthObjHolder.authUrl = obj.authUrl;
    UserAuthObjHolder.tokenStore=obj.credentials
  };

  static setAuthTokenInUserClass=(val)=> UserAuthObjHolder.tokenStore=val;
  

  static setAuthClient=(val)=>this.authClient=val;

}

export { UserAuthObjHolder };
