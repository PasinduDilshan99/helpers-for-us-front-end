// DEV
const PROTOCOL = "http";
const DOMAIN = "localhost";
const PORT = "8090";
const CONTEXT_ROOT = "helpers-for-us";
const VERSION = "/v0";
const API = "/api";
export const BASE_PATH = `${PROTOCOL}://${DOMAIN}:${PORT}/${CONTEXT_ROOT}`;

// Staging
// const PROTOCOL = "https";
// const DOMAIN = "api-test.felicitatrips.com"; // staging backend domain

// const PORT = "443"; // HTTPS
// const CONTEXT_ROOT = "felicita";
// const VERSION = "/v0";
// const API = "/api";
// export const BASE_PATH = `${PROTOCOL}://${DOMAIN}/${CONTEXT_ROOT}`;

// Production
// const PROTOCOL = "https";
// const DOMAIN = "api.felicitatrips.com"; // production backend domain
// const PORT = "443"; // if using HTTPS (omit port in URL)
// const CONTEXT_ROOT = "felicita";
// const VERSION = "/v0";
// const API = "/api";
// export const BASE_PATH = `${PROTOCOL}://${DOMAIN}/${CONTEXT_ROOT}`;

// http://159.198.43.146:8080/felicita

const LOCATION = "/location"
const AUTH = "/auth";

// Auth
export const LOGIN = `${BASE_PATH}${API}${VERSION}${AUTH}/login`;
export const LOGOUT = `${BASE_PATH}${API}${VERSION}${AUTH}/logout`;
export const SIGNUP = `${BASE_PATH}${API}${VERSION}${AUTH}/signup`;
export const GET_USER_DETAILS_FOR_LOGIN_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/me`;
export const UPDATE_PASSWORD_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/change-password`;
export const RESET_PASSWORD_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/reset-password`;
export const UPDATE_SECRET_QUESTIONS_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/update-secret-questions`;
export const USERNAME_PASSWORD_VALIDATION_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/username-password-validation`;
export const GET_ACTIVE_SECRET_QUESTIONS_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/secret-questions`;
export const GET_SECRET_QUESTIONS_BY_USER_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/secret-questions-by-user`;


// location
export const GET_OPTIMAL_ROUTE_BY_DESTINATIONS_BE = `${BASE_PATH}${API}${VERSION}${LOCATION}/optimal-destinations`;

// Agency
export const ADD_AGENCY_BE = `${BASE_PATH}${API}${VERSION}${LOCATION}/add-agency`;
export const GET_ALL_AGENCY_BE = `${BASE_PATH}${API}${VERSION}${LOCATION}/all-agencies`;
