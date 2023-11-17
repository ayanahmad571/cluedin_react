export const API_BASE_URL = 'https://3s0yl5owik.execute-api.eu-west-2.amazonaws.com';
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
}
export const CLUEDIN_DARK_SCHEME = {
    background : CLUEDIN_THEME.black,
    text_on_background: CLUEDIN_THEME.white,
    header_background: CLUEDIN_THEME.black,
    header_background_text: CLUEDIN_THEME.white,
    general_danger_text: CLUEDIN_THEME.light_red,
    login: {
        input_background: CLUEDIN_THEME.white,
        btn_enabled_bg: CLUEDIN_THEME.orange,
        btn_disabled_bg: CLUEDIN_THEME.dark_grey,
        btn_enabled_txt: CLUEDIN_THEME.white,
        btn_disabled_txt: CLUEDIN_THEME.black,
    },
    otp: {
        otp_input_border: CLUEDIN_THEME.dark_grey,
    },
};
