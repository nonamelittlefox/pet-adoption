export const CONFIG_PUSHER = {
  APP: {
    APP_KEY: 'mypusherappkey2',
    WWS_PORT: 8000,
    WS_PORT: 8080,
    WS_HOST: 'pusher.vw-dev.com',
    HTTP_PORT: 8000,
    FORCE_TLS: true,
    HTTP_HOST: 'pusher.vw-dev.com',
    CLUSTER: 'mt1',
  },
  NOTICE: {
    CHANNEL: 'izumi_web_app_notice_channel',
    EVENT: 'izumi_web_app_notice_event',
  },
  MESSAGE: {
    CHANNEL: 'izumi-app-chat',
    EVENT: 'message-group-',
  },
};
