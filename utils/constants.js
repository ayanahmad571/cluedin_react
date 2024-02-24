export const API_BASE_URL =
  'https://3s0yl5owik.execute-api.eu-west-2.amazonaws.com';
export const IOS_APP_VERSION = 'i2.3';
export const ANDROID_APP_VERSION = 'a2.3';
export const REVCAT_API = {
  ios: 'appl_SiVgGfCQDyhpRZZyQotfgMyDJDD',
  android: 'goog_XYncuqDsiHFiYzmRSSNcVMCGtBD',
};
export const MAX_RETRIES = 3;
export const DEFAULT_THEME_COLOR = '#FF3333';
export const CLUEDIN_THEME = {
  black: '#000',
  dark_red: '#6A040F',
  light_red: '#D00000',
  orange: '#E85D04',
  yellow: '#FAA307',
  white: '#f5f3f4',
  dark_grey: '#3f3f3f',
  light_grey: '#858585',
  deep_blue: '#003beb',
  light_blue: '#245bff',
};
export const CLUEDIN_DARK_SCHEME = {
  background: CLUEDIN_THEME.black,
  text_on_background: CLUEDIN_THEME.white,
  header_background: CLUEDIN_THEME.black,
  header_background_text: CLUEDIN_THEME.white,
  general_danger_text: CLUEDIN_THEME.light_red,
  general_email_link: CLUEDIN_THEME.light_blue,
  login: {
    input_background: CLUEDIN_THEME.white,
    input_background_text: CLUEDIN_THEME.black,
    btn_enabled_bg: CLUEDIN_THEME.orange,
    btn_disabled_bg: CLUEDIN_THEME.dark_grey,
    btn_enabled_txt: CLUEDIN_THEME.white,
    btn_disabled_txt: CLUEDIN_THEME.black,
  },
  otp: {
    otp_input_border: CLUEDIN_THEME.dark_grey,
  },
  logout: {
    btn_bg: CLUEDIN_THEME.light_red,
    btn_bg_text: CLUEDIN_THEME.white,
  },
  about: {
    btn_bg: CLUEDIN_THEME.dark_red,
    btn_bg_text: CLUEDIN_THEME.white,
  },
  help: {
    container1_bg: CLUEDIN_THEME.dark_grey,
    container1_bg_text: CLUEDIN_THEME.white,
    container2_bg: CLUEDIN_THEME.dark_grey,
    container2_bg_text: CLUEDIN_THEME.white,
  },
  home: {
    row1_bg: CLUEDIN_THEME.orange,
    row1_bg_text: CLUEDIN_THEME.black,
    row2_bg: CLUEDIN_THEME.dark_grey,
    row2_bg_text: CLUEDIN_THEME.white,
    row3_bg: CLUEDIN_THEME.dark_grey,
    row3_bg_text: CLUEDIN_THEME.white,
    clue_btn_bg: CLUEDIN_THEME.white,
    used_ans_bg: CLUEDIN_THEME.light_red,
    used_ans_bg_text: CLUEDIN_THEME.black,
  },
  leader: {
    rank_bg: CLUEDIN_THEME.orange,
    rank_bg_text: CLUEDIN_THEME.white,
  },
  navigator: {
    background: CLUEDIN_THEME.black,
    backgroundText: CLUEDIN_THEME.white,
    box: CLUEDIN_THEME.white,
    boxText: CLUEDIN_THEME.black,
    premiumAccent: CLUEDIN_THEME.orange,
  }
};
