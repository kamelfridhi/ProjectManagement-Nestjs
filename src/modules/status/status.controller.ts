import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/createStatus.dto';
import {UpdateStatusDto} from "./dto/updateStatus.dto";

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post(':projectId')
    createStatus(@Body() createStatusDto: CreateStatusDto,@Param('projectId') projectId: string ) {
        return this.statusService.createStatus(createStatusDto, projectId);
    }


    @Get()
    findAll() {
        return this.statusService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.statusService.findOne(id);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
        return this.statusService.updateStatus(id, updateStatusDto);
    }

    @Delete(':id')
    deleteStatus(@Param('id') id: string) {
        return this.statusService.deleteStatus(id);
    }
}
