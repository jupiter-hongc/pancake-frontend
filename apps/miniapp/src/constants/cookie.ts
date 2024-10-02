import Cookie from "js-cookie";

export const getLoginCookie = () => Cookie.get("cr00");
export const removeLoginCookie = () => Cookie.remove("cr00");
