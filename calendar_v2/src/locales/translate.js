import { t } from "i18next";

export const translate = (path, text) => {
  return t(path + "." + text);
};

export const translateLoginForm = (text) => {
  const path = "LoginPage.LoginForm";
  return translate(path, text);
};

export const translateAuthentication = (text) => {
  const path = "Authentication";
  return translate(path, text);
};

export const translateRegisterForm = (text) => {
  const path = "LoginPage.RegisterForm";
  return translate(path, text);
};

export const translatePasswordForm = (text) => {
  const path = "LoginPage.PasswordForm";
  return translate(path, text);
};

export const translateMainPage = (text) => {
  const path = "MainPage";
  return translate(path, text);
};

export const translateMenu = (text) => {
  const path = "Menu";
  return translate(path, text);
};

export const translateCreateCalendarPage = (text) => {
  const path = "CreateCalendarPage";
  return translate(path, text);
};
export const translateCalendarPage = (text) => {
  const path = "CalendarPage";
  return translate(path, text);
};

export const translateAdminPage = (text) => {
  const path = "AdminPage";
  return translate(path, text);
};
