import { Controller, Get, Post, Body, UseFilters, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { IAdmin } from './interfaces/admin.interface';
import { HttpExceptionFilter } from '../../filters';

@Controller('admins')
export class AdminsController {

    constructor(private readonly adminsService: AdminsService) { }

    @Post()
    async create(@Body() admin: IAdmin) {
         return await this.adminsService.create(admin);
    }

    @Get()
    async findAll() {
        return await this.adminsService.findAll();
    }
}
