/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';


@Injectable()
export class BaseService<T> {
    constructor(private readonly model: Model<any>) { }

    async create(createDto: Partial<T>): Promise<T> {
        const createdEntity = new this.model(createDto);
        return createdEntity.save();
    }

    async findAll(): Promise<T[]> {
        return this.model.find();
    }

    async findOne(id: string): Promise<T> {
        return this.model.findById(id);
    }

    async update(id: string, updateDto: Partial<T>): Promise<T> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true });
    }

    async remove(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id);
    }
}