import {
    Controller, Get, Post, Put, Body, Param, UseFilters, UseGuards,
    UnauthorizedException, HttpStatus, HttpException, Res, Patch,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './interfaces/admin.interface';
import { Password } from './interfaces/password.interface';
import { wrapConflict, wrapSuccess, wrapBadrequest, wrapNocontent } from 'aug-nest-tools';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Pagination, PaginationOptions } from '../../decorators/pagination.decorator';

@Controller('/admins')
// @UseGuards(AuthGuard('jwt'))
export class AdminsController {

    constructor(private readonly adminsService: AdminsService) { }

    @Post()
    async create(@Body() admin: Admin, @Res() res) {
        const userExist: Admin[] = await this.adminsService.find({ uname: admin.uname });
        if (userExist.length === 0) {
            const result = await this.adminsService.create(admin);
            if (result) {
                res.status(HttpStatus.CREATED).json(wrapSuccess(result, 'Created Successfully.'));
            } else {
                res.status(HttpStatus.BAD_REQUEST).json(result);
            }
        } else {
            res.status(HttpStatus.CONFLICT).json(wrapConflict('User already exist!'));
        }
    }

    @Get()
    async findAll(@Res() res,  @Pagination() pagination: PaginationOptions) {
        const result = await this.adminsService.findAll(pagination);
        if (result.length > 0) {
            res.status(HttpStatus.OK).json(wrapSuccess(result, 'Here is all admin informations.'));
        }
    }

    @Get('/:id')
    async findOne(@Param() params, @Res() res) {
        const result = await this.adminsService.findOne({ _id: params.id });
        if (result) {
            res.status(HttpStatus.OK).json(wrapSuccess(result, 'Here is the admin information.'));
        } else {
            res.status(HttpStatus.OK).json(wrapNocontent('No content available'));
        }
    }

    @Put('/:id')
    async update(@Body() admin: Admin, @Res() res, @Param() params) {
        const result = await this.adminsService.update(admin, params.id);
        if (result) {
            res.status(HttpStatus.ACCEPTED).json(wrapSuccess(result, 'Updated Successfully.'));
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Patch('/changepassword/:id')
    async changePassword(@Body() password: Password, @Res() res, @Param() param) {
        const result = await this.adminsService.changePassword(password, param.id);
        if (result) {
            res.status(HttpStatus.ACCEPTED).json(wrapSuccess(result, 'Updated Successfully.'));
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(wrapBadrequest('Invalid Credentials.'));
        }
    }
}
