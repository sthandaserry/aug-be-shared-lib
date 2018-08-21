import { HttpStatus } from '@nestjs/common';

export async function generateToken(strLength: number) {
    const stringArray: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c',
        'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let rndString = '';
    // build a string with random characters
    for (let i = 1; i < strLength; i++) {
        const rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
        rndString = rndString + stringArray[rndNum];
    }
    return rndString;
}

export async function statusCode(err) {
    if (err) {
        if (err.name === 'ValidationError') {
            return HttpStatus.BAD_REQUEST;
        } else if (err.name === 'MongoError') {
            return HttpStatus.CONFLICT;
        } else {
            return HttpStatus.UNAUTHORIZED;
        }
    }
}