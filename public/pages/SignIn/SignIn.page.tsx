import "./SignIn.page.scss";

import React from "react";
import { SignInControl, TenantLogo, LegalNotice } from "@fider/components";
import { Fider } from "@fider/services";
import { withTranslation, WithTranslation } from "react-i18next";

interface SignInPageProps extends WithTranslation {
  captchaID?: string;
  captchaData?: string;
}
class SignInPage extends React.Component<SignInPageProps, {}> {
  // private onEmailSent = (email: string) => {
  //   const { t } = this.props;
  //   notify.success(<span dangerouslySetInnerHTML={{ __html: t("signIn.emailSent", { email }) }} />);
  // };

  public render() {
    const { t } = this.props;
    const messages = {
      locked: () => (
        <>
          <p
            className="welcome"
            dangerouslySetInnerHTML={{ __html: t("signIn.tenantLocked", { tenantName: Fider.session.tenant.name }) }}
          />
          <p>{t("signIn.reactivateSite")}</p>
        </>
      ),
      private: () => (
        <>
          <p
            className="welcome"
            dangerouslySetInnerHTML={{ __html: t("signIn.needInvite", { tenantName: Fider.session.tenant.name }) }}
          />
          <p>{t("signIn.haveAnAccount")}</p>
        </>
      )
    };
    return (
      <div id="p-signin" className="page container">
        <div className="message">
          <TenantLogo size={100} />
          {Fider.session.tenant.isPrivate ? messages.private() : messages.locked()}
        </div>
        <SignInControl
          useEmail={true}
          captcha={
            this.props.captchaID !== undefined && this.props.captchaData !== undefined
              ? { id: this.props.captchaID, data: this.props.captchaData }
              : undefined
          }
          redirectTo={Fider.settings.baseURL}
        />
        <LegalNotice />
      </div>
    );
  }
}

export default withTranslation()(SignInPage);
