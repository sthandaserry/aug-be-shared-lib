import {
    Controller, Get, Post, Put, Body, Param, UseFilters, UseGuards,
    UnauthorizedException, HttpStatus, HttpException, Res, Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UserPassword } from './interfaces/user-password.interface';
import { wrapConflict, wrapSuccess, wrapBadrequest, wrapNocontent } from 'aug-nest-tools';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/:id')
    async findOne(@Param() params, @Res() res) {
        const result = await this.usersService.findOne({ _id: params.id });
        if (result) {
            res.status(HttpStatus.OK).json(wrapSuccess(result, 'Here is the user information.'));
        } else {
            res.status(HttpStatus.OK).json(wrapNocontent('No content available'));
        }
    }

    @Put('/:id')
    async update(@Body() admin: User, @Res() res, @Param() params) {
        const result = await this.usersService.update(admin, params.id);
        if (result) {
            res.status(HttpStatus.ACCEPTED).json(wrapSuccess(result, 'Updated Successfully.'));
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Patch('/changepassword/:id')
    async changePassword(@Body() password: UserPassword, @Res() res, @Param() param) {
        const result = await this.usersService.changePassword(password, param.id);
        if (result) {
            res.status(HttpStatus.ACCEPTED).json(wrapSuccess(result, 'Updated Successfully.'));
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(wrapBadrequest('Invalid Credentials.'));
        }
    }
}
