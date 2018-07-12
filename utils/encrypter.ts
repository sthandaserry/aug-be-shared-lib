import { createHmac, Hmac, randomBytes, createCipher, createDecipher } from 'crypto';
export class Encrypter {

    private randomBytes;
    private createHmac;

    constructor() {
        this.randomBytes = randomBytes;
        this.createHmac = createHmac;
    }

    public createSalt(): string {
        const encryptBytes: number = 64;
        return randomBytes(encryptBytes).toString('base64');
    }

    public hashPwd(salt: string, pwd: string): string {
        const hmac: Hmac = createHmac('sha1', salt.toString());
        return hmac.update(pwd.toString()).digest('hex');
    }

    public doesPasswordMatch(password: string, hashed_pwd: string, salt: string) {
        return this.hashPwd(salt, password) === hashed_pwd;
    }

}