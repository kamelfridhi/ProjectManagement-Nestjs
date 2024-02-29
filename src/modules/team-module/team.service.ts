/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/global-utils/base.service';
import { Team } from 'src/schemas/team.schema';
import { CreateTeamDto } from "./dto/createTeam.dto";
import { UpdateTaskDto } from "../task/dto/updateTask.dto";
import { UpdateTeamDto } from "./dto/updateTeam.dto";

@Injectable()
export class TeamService extends BaseService<Team> {

    constructor(

        @InjectModel(Team.name) private TeamModel: Model<Team>,
    ) {
        super(TeamModel);
    }
    async createTeam(createTaskDto: CreateTeamDto) {
        return super.create(createTaskDto)
    }

    getAllTeams() {
        return super.findAll();
    }

    getOneTeam(id: string) {
        return super.findOne(id);
    }

    updateTeam(id: string, updateTeamDto: UpdateTeamDto) {
        return super.update(id,updateTeamDto);
    }

    deleteTeam(id: string) {
        return super.remove(id);
    }

}
