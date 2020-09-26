const crypto = require("crypto");
import base64url from "base64url";

const ALGORITHM = 'aes-256-ctr';
const ENCRYPTION_KEY = 'CRYPT_SEED_FOR_ID';

export const createScheduleUpdateId = (scheduleUpdateIdSeed: number): string => {
    try {
        const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY)
        let crypted = cipher.update('<crypt>' + String(scheduleUpdateIdSeed) + '</crypt>', 'utf8', 'base64')
        crypted += cipher.final('base64');

        return base64url.fromBase64(crypted);

    } catch (error) {
        console.log(`[ERROR] create_schedule_update_idでエラー。引数:${scheduleUpdateIdSeed}`);
        throw error;
    }
}

export const decodeFromScheduleUpdateId = (scheduleUpdateId: string): number => {
    try {
        const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY)
        let dec = decipher.update(base64url.toBase64(scheduleUpdateId), 'base64', 'utf8')
        dec += decipher.final('utf8');
        dec = dec.match(/<crypt>(.*)<\/crypt>/);
        dec = dec[1];

        return dec;

    } catch (error) {
        console.log(`[ERROR] decode_from_schedule_update_idでエラー。引数:${scheduleUpdateId}`);
        throw error;
    }

}
