// const serverAddress = 'https://conciergeapidemo.moveeasy.com';
const serverAddress =
  process.env.REACT_APP_MOVEEASY_ENV === "development"
    ? "https://conciergeapidemo.moveeasy.com"
    : process.env.REACT_APP_MOVEEASY_ENV === "production"
    ? "https://conciergeapi.moveeasy.com"
    : process.env.REACT_APP_MOVEEASY_ENV === "preprod"
    ? "https://conciergepreprod.moveeasy.com"
    : "https://conciergeapidemo.moveeasy.com";
export const max_refresh_time = 60000;
export default serverAddress;
