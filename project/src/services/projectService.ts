import { Project } from '../models/project'
import { Master } from '../models/master'
import dataSource from '../config/data-source';

class projectService {
    private projectRepository = dataSource.getRepository(Project)
    private masterRepository = dataSource.getRepository(Master)

    async create(projectData: any, userId: number): Promise<Project | Error> {
        const masterData = await this.masterRepository.findOneBy({ userId: userId });
        const masterId = masterData.id;
        const status = "Не подтвержден";
        const studentsAmount = 0;
        const maxStudents = 5;

        const dataToSave = {
            ...projectData,
            masterId,
            maxStudents,
            studentsAmount,
            status,
        };

        const project = this.projectRepository.create(dataToSave);
        await this.projectRepository.save(project)
        const newProject = await this.projectRepository.findOne({ where: { masterId: dataToSave.masterId } })
        
        if (newProject) {
            return newProject;
        }
        throw new Error('project creation failed');
    }

    async getAll(): Promise<any | Error> {
        const allproject = await this.projectRepository.find();
        if (allproject) {
            return allproject;
        }
        throw new Error(`Some problems`)
    }

    async changeStatus(id: number, userId: number, newStatus: any){
        const instance = await this.projectRepository.findOneBy({ id: id });
        const masterData = await this.masterRepository.findOneBy({ userId: userId })
        const masterId = masterData.id

        if (instance) {
            if (instance.masterId != masterId) {
                // userId - это id преподователя
                instance.userId = userId;
            }
            instance.status = newStatus;
            await this.projectRepository.save(instance);
            return instance;
        } else {
            throw new Error(`Project with id ${id} not found`);
        }
    }

    async getByID(id: number): Promise<Project | Error> {
        const project = await this.projectRepository.findOneBy({id});
        if (project) {
            return project;
        }
        throw new Error(`Project with id ${id} not found`)
    }
    
    async update(id: number, body: any){
        const instance = await this.projectRepository.findOneBy({ id: id });
        if (instance) {
            for (const key in body) {
                instance[key] = body[key];
            }
            await this.projectRepository.save(instance);
            return instance;
        } else {
            throw new Error(`Project with id ${id} not found`);
        }
    }

    async delete(id: number){
        const res = await this.projectRepository.findOneBy({ id: id })
        if (res) {
            return await this.projectRepository.remove(res)
        }
        throw new Error(`Something go wrong`)
    }

}

export default projectService