import {
    Controller, Get, Post, Put, Body, Param, UseFilters, UseGuards,
    UnauthorizedException, HttpStatus, HttpException, Res,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './interfaces/admin.interface';
import { wrapConflict, wrapSuccess } from 'aug-nest-tools';
import { AuthGuard } from '@nestjs/passport';

@Controller('admins')
@UseGuards(AuthGuard('jwt'))
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
    async findAll() {
        return await this.adminsService.findAll();
    }

    @Put('/:id')
    async update(@Body() admin: Admin, @Res() res, @Param() param) {
        const result = await this.adminsService.update(admin, param.id);
        if (result) {
            res.status(HttpStatus.ACCEPTED).json(wrapSuccess(result, 'Updated Successfully.'));
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }
}
