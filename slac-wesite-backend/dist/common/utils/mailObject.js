import { APP_LINK } from "../../config/serverConfig.js";
export const verifyEmailMail = function (verificationToken) {
    return {
        subject: 'Welcome to the app. Please verify your email',
        text: `
      Welcome to the app. Please verify your email by clicking on the link below:
     ${APP_LINK}/verify/${verificationToken}
    `
    };
};
//# sourceMappingURL=mailObject.js.map