import { ILike, Raw } from "typeorm"

import dataSource from '../config/data-source';
import { Project } from '../models/project';

class projectController {
    private projectRepository = dataSource.getRepository(Project)

    create = async (request: any, response: any) => {
        const { body } = request

        const instance = this.projectRepository.create(body)
        const result = await this.projectRepository.save(instance)

        return response.send(result)
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;

        const instance = await this.projectRepository.findOneBy({ id });

        for (const key in body) {
            instance[key] = body[key];
        }

        const result = await this.projectRepository.save(instance);

        return response.send(result);
    }

    delete = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const instance = await this.projectRepository.findOneBy({ id });
        await this.projectRepository.remove(instance);

        return response.status(204).send({});
    }

    get = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const result = await this.projectRepository.findOneBy({ id });

        return response.send(result);
    }

    list = async (request: any, response: any) => {
        const { query } = request

        const findOptions: any = {}

        if (query.subject) {
            findOptions.subject = ILike(`%${query.subject}%`)
        }

        if (query.dateFrom && query.dateTo) {
            findOptions.date = Raw((alias) => `${alias} > :dateFrom AND ${alias} < :dateTo`, {
                dateFrom: query.dateFrom,
                dateTo: query.dateTo
            })
        }

        const result = await this.projectRepository.find({
            where: findOptions
        })

        return response.send(result)
    }
}

export default projectController;
