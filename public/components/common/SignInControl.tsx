import "./SignInControl.scss";

import React, { useState } from "react";
import { SocialSignInButton, Form, Button, Input, Message } from "@fider/components";
import { device, actions, Failure, isCookieEnabled } from "@fider/services";
import { useFider } from "@fider/hooks";
import { useTranslation } from "react-i18next";
import { Password } from "./form/Input";

interface Captcha {
  id: string;
  data: string;
}
interface SignInControlProps {
  useEmail: boolean;
  redirectTo?: string;
  captcha?: Captcha;
}

export const SignInControl: React.FunctionComponent<SignInControlProps> = props => {
  const fider = useFider();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Failure | undefined>(undefined);
  const [answer, setAnswer] = useState("");

  const signIn = async () => {
    setError(undefined);
    const captchaID = props.captcha === undefined ? "" : props.captcha.id;
    const result = await actions.signIn({
      email,
      password,
      captchaID,
      captchaAnswer: answer
    });
    if (result.ok) {
      location.href = "/";
    } else if (result.error) {
      setError(result.error);
    }
  };

  const onSignup = async () => {
    location.href = "/signup";
  };

  const providersLen = fider.settings.oauth.length;

  if (!isCookieEnabled()) {
    return (
      <Message type="error">
        <h3>Cookies Required</h3>
        <p>Cookies are not enabled on your browser. Please enable cookies in your browser preferences to continue.</p>
      </Message>
    );
  }

  return (
    <div className="c-signin-control">
      {providersLen > 0 && (
        <div className="l-signin-social">
          <div className="row">
            {fider.settings.oauth.map((o, i) => (
              <React.Fragment key={o.provider}>
                {i % 4 === 0 && <div className="col-lf" />}
                <div
                  className={`col-sm l-provider-${o.provider} l-social-col ${
                    providersLen === 1 ? "l-social-col-100" : ""
                  }`}
                >
                  <SocialSignInButton option={o} redirectTo={props.redirectTo} />
                </div>
              </React.Fragment>
            ))}
          </div>
          <p className="info"> {t("signInControl.neverYourBehalf")} </p>
        </div>
      )}

      {providersLen > 0 && <div className="c-divider"> {t("signInControl.or")} </div>}

      {props.useEmail && (
        <div className="l-signin-email">
          <p> {t("signInControl.enterEmail")}</p>
          <Form error={error}>
            <Input
              field="email"
              type="email"
              value={email}
              autoFocus={!device.isTouch()}
              onChange={setEmail}
              placeholder="yourname@example.com"
            />
            <Password
              field="password"
              value={password}
              autoFocus={!device.isTouch()}
              onChange={setPassword}
              placeholder="Password"
            />
            {props.captcha && (
              <>
                <Input field="captchaID" type="hidden" value={props.captcha.id} />
                <div className="row">
                  <div className="col-md-6">
                    <img src={props.captcha.data} />
                  </div>
                  <div className="col-md-6">
                    <Input field="answer" value={answer} onChange={setAnswer} />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" color="positive" disabled={email === "" || password === ""} onClick={signIn}>
              {t("menu.signIn")}
            </Button>
          </Form>
          <div className="c-divider">OR</div>
          <Button color="default" size="normal" onClick={onSignup}>
            {t("common.button.joinNow")}
          </Button>
        </div>
      )}
    </div>
  );
};
