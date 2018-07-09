import { Controller, Get, Post, Body, UseFilters, UnauthorizedException, HttpStatus, HttpException, Res } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './interfaces/admin.interface';

@Controller('admins')
export class AdminsController {

    constructor(private readonly adminsService: AdminsService) { }

    @Post()
<<<<<<< HEAD
    async create(@Body() admin: Admin, @Res() res) {
        const userExist: Admin[] = await this.adminsService.find({uname : admin.uname});
        if (userExist.length === 0){
            const result = await this.adminsService.create(admin);
            res.status(HttpStatus.CREATED).json(result);
        }else{
            res.status(HttpStatus.CONFLICT).json({message : 'User already exist!'});
        }
=======
<<<<<<< HEAD
    async create(@Body() admin: IAdmin) {
         return await this.adminsService.create(admin);
=======
    async create(@Body() admin: Admin, @Res() res) {
        const userExist: Admin[] = await this.adminsService.findOne({username : admin.username});
        if (userExist.length === 0){
            return await this.adminsService.create(admin);
        }else{
            res.status(HttpStatus.CONFLICT).json({message : 'User already exist!'});
        }
>>>>>>> WIP: Created find method
>>>>>>> WIP: Created find method
    }

    @Get()
    async findAll() {
        return await this.adminsService.findAll();
    }
}
