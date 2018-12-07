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
@UseGuards(AuthGuard('jwt'))
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) { }

    @Get('/user/:userId')
    async findAll(@Res() res, @Pagination() pagination: PaginationOptions, @Param() params) {
        const result = await this.notificationsService.find({ tId: params.userId }, pagination);
        if (result.length > 0) {
            res.status(HttpStatus.OK).json(wrapSuccess(result, 'Here is all notification informations.'));
        } else {
            res.status(HttpStatus.OK).json(wrapNocontent('No content available'));
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

    @Patch('/:id')
    async updateStatus(@Body() notification: Notification, @Res() res, @Param() param) {
        const result = await this.notificationsService.update(notification, param.id);
        if (result) {
            res.status(HttpStatus.ACCEPTED).json(wrapSuccess(result, 'Updated Successfully.'));
        }
    }
}
