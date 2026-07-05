const SPARTA_API = require("../apis/spartaAPI");
const axios = require("axios");
const crypto = require("crypto");

function cookieParse(cookieHeader) {
    let cookies = {};
    if (!cookieHeader) return cookies;

    const cookieArray = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
    cookieArray.forEach(cookieStr => {
        const parts = cookieStr.split(';')[0].split('=');
        if(parts.length === 2) {
            const key = parts[0].trim();
            const value = parts[1].trim();
            if (key === "sid" || key === "remid") cookies[key] = value;
        }
    });
    return cookies;
}


async function getSessionToken(userData) {

}