import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export class PaginationOptions {
    public readonly limit: number;
    public readonly skip: number;
}

export const Pagination = createParamDecorator((_: string, req: Request): PaginationOptions => {
    req.query.limit = (typeof req.query.limit === 'number') ?
        req.query.limit :
        parseInt(req.query.limit, 10) || parseInt(process.env.SIZE, 10);

    req.query.skip = (typeof req.query.skip === 'number') ?
        req.query.skip :
        parseInt(req.query.skip, 10) || 1;

    if (req.query.limit > parseInt(process.env.MAX, 10)) {
        req.query.limit = parseInt(process.env.MAX, 10);
    } else if (req.query.limit < parseInt(process.env.MIN, 10)) {
        req.query.limit = parseInt(process.env.MIN, 10);
    }

    const limit: number = req.query.limit;
    const skip: number = req.query.skip;

    return {
        limit,
        skip,
    };
});
