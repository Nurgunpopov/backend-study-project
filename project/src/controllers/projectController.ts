import ProjectService from "../services/projectService"

class projectController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    create = async (request: any, response: any) => {
        const projectData = request.body
        const userId = request.user.id

        try {
            const project = this.projectService.create(projectData, userId)
            
            response.send(project)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const allProjects = await this.projectService.getAll();

            response.send(allProjects);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    changeStatus = async (request: any, response: any) => {
        const { params, body, user } = request;
        const { id } = params;
        const { status } = body
        const { userId } = user.id
        try {
            const project = await this.projectService.changeStatus(id, userId, status);

            response.send(project);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const project = await this.projectService.getByID(id);

            response.send(project);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const project = await this.projectService.update(id, body);

            response.send(project);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.projectService.delete(id);

            response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

}

export default projectController;
