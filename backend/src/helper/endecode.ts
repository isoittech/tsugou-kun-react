const crypto = require("crypto");

const ALGORITHM = 'aes-256-ctr';
const ENCRYPTION_KEY = 'CRYPT_SEED_FOR_ID';
const SALT = 'KayNQW7vHC8C+CP8NwxCfw==';
const IV = crypto.randomBytes(16);

export const createScheduleUpdateId = (scheduleUpdateIdSeed: number): string => {
    try {

        // 鍵を生成
        const key = crypto.scryptSync(ENCRYPTION_KEY, SALT, 32)
        // 暗号器を生成
        const cipher = crypto.createCipheriv(ALGORITHM, key, IV)
        // 暗号化したいメッセージ文字列を Buffer に変換
        const data = Buffer.from('<crypt>' + String(scheduleUpdateIdSeed) + '</crypt>')
        // data を暗号化
        let encryptedData = cipher.update(data)
        encryptedData = Buffer.concat([encryptedData, cipher.final()])

        return encryptedData
    } catch (error) {
        console.log(`[ERROR] create_schedule_update_idでエラー。引数:${scheduleUpdateIdSeed}`);
        throw error;
    }
}


export const decodeFromScheduleUpdateId = (scheduleUpdateId: string): number => {
    try {

        // 鍵を生成
        const key = crypto.scryptSync(ENCRYPTION_KEY, SALT, 32)

        // 復号器を生成
        const decipher = crypto.createDecipheriv(ALGORITHM, key, IV)

        // encryptedData を復号
        let decryptedData: any = decipher.update(scheduleUpdateId)
        decryptedData = Buffer.concat([decryptedData, decipher.final()]);
        decryptedData = decryptedData.match(/<crypt>(.*)<\/crypt>/);
        decryptedData = decryptedData[1];

        return decryptedData
    } catch (error) {
        console.log(`[ERROR] decode_from_schedule_update_idでエラー。引数:${scheduleUpdateId}`);
        throw error;
    }
}
