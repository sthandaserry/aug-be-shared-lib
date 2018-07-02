import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './interfaces/admin.interface';

@Controller('admins')
export class AdminsController {

    constructor(private readonly adminsService: AdminsService) { }

    @Post()
    async create(@Body() admin: Admin) {
        return await this.adminsService.create(admin);
    }

    @Get()
    async findAll() {
        return await this.adminsService.findAll();
    }
}
