import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? "https://blog.com" : "http://locahost:8001"
export const APP_NAME = publicRuntimeConfig.APP_NAME;