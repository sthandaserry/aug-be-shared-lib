import {
    Controller, Get, Post, Put, Body, Param, UseFilters, UseGuards,
    UnauthorizedException, HttpStatus, HttpException, Res, Patch,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './interfaces/notification.interface';
import { wrapConflict, wrapSuccess, wrapBadrequest, wrapNocontent } from '../../utils/envelope';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Pagination, PaginationOptions } from '../../decorators/pagination.decorator';

@Controller('/notifications')
// @UseGuards(AuthGuard('jwt'))
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) { }

    @Post()
    async create(@Body() notification: Notification, @Res() res) {

            const result = await this.notificationsService.create(notification);
            if (result) {
                res.status(HttpStatus.CREATED).json(wrapSuccess(result, 'Created Successfully.'));
            } else {
                res.status(HttpStatus.BAD_REQUEST).json(result);
            }
    }

    @Get()
    async findAll(@Res() res,  @Pagination() pagination: PaginationOptions) {
        const result = await this.notificationsService.findAll(pagination);
        if (result.length > 0) {
            res.status(HttpStatus.OK).json(wrapSuccess(result, 'Here is all notification informations.'));
        }
    }

    @Get('/:id')
    async findOne(@Param() params, @Res() res) {
        const result = await this.notificationsService.findOne({ _id: params.id });
        if (result) {
            res.status(HttpStatus.OK).json(wrapSuccess(result, 'Here is the notification information.'));
        } else {
            res.status(HttpStatus.OK).json(wrapNocontent('No content available'));
        }
    }

    @Put('/:id')
    async update(@Body() notification: Notification, @Res() res, @Param() params) {
        const result = await this.notificationsService.update(notification, params.id);
        if (result) {
            res.status(HttpStatus.ACCEPTED).json(wrapSuccess(result, 'Updated Successfully.'));
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }
}
