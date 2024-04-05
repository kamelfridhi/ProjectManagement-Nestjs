/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(id: string, populateOptions?: string[]): Promise<any> {
        let query = this.model.findById(id);
        if (populateOptions && populateOptions.length == 1) {
            query = query.populate(populateOptions[0]);
        } else if (populateOptions && populateOptions.length > 1) {
            query = query.populate(populateOptions.join(' '));
        }
        const result = await query.lean().exec();
        if (!result) {
            throw new NotFoundException(`Entity with id ${id} not found`);
        }
        return result;
    }

    async findOneForSave(id: string, populateOptions?: string[]): Promise<any> {
        let query = this.model.findById(id);
        if (populateOptions && populateOptions.length == 1) {
            query = query.populate(populateOptions[0]);
        } else if (populateOptions && populateOptions.length > 1) {
            query = query.populate(populateOptions.join(' '));
        }
        const result = await query.exec();
        if (!result) {
            throw new NotFoundException(`Entity with id ${id} not found`);
        }
        return result;
    }

    async update(id: string, updateDto: Partial<T>): Promise<T> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true });
    }

    async remove(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id);
    }
}