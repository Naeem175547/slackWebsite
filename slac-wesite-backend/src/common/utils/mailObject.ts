
import { APP_LINK ,MAIL_ID} from "../../config/serverConfig.js";

export const verifyEmailMail = function (verificationToken:string) {
  return {
    subject: 'Welcome to the app. Please verify your email',
    text: `
      Welcome to the app. Please verify your email by clicking on the link below:
     ${APP_LINK}/verify/${verificationToken}
    `
  };
};