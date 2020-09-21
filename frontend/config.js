 import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? "https://recipeblog.com" : "http://localhost:8000/api";
export const APP_NAME = publicRuntimeConfig.APP_NAME;