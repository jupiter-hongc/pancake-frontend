type WebAppUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
  added_to_attachment_menu: boolean;
  allows_write_to_pm: boolean;
  photo_url: string;
};

type WebAppChat = {
  id: number;
  type: "group" | "supergroup" | "channel";
  title: string;
  username: string;
  photo_url: string;
};

type WebAppInitData = {
  query_id: number;
  user: WebAppUser;
  receiver: WebAppUser;
  chat: WebAppChat;
  chat_type: string;
  chat_instance: string;
  start_param: string;
  can_send_after: number;
  auth_date: number;
  hash: string;
};

class VConsole {
  constructor() {}
  destroy() {}
}

declare global {
  interface Window {
    VConsole: typeof VConsole;
    __metamask__?: {
      deepLinkElement?: HTMLAnchorElement;
    };
  }
}

export {};
