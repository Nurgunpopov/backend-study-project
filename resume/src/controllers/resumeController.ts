import ResumeService from "../services/resumeService"

class resumeController {
    private resumeService: ResumeService;

    constructor() {
        this.resumeService = new ResumeService();
    }

    create = async (request: any, response: any) => {
        const resumeData = request.body
        const userId = request.user.id

        try {
            const resume = this.resumeService.create(resumeData, userId)
            
            response.send(resume)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const allResume = await this.resumeService.getAll();

            response.send(allResume);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    getByBachelorId = async (request: any, response: any) => {
        const { bachelorId } = request.query.bachelorId;
        try {
            const resume = await this.resumeService.getByBachelorId(bachelorId);

            response.send(resume);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const resume = await this.resumeService.getByID(id);

            response.send(resume);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const resume = await this.resumeService.update(id, body);

            response.send(resume);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.resumeService.delete(id);

            response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    // get = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const result = await this.resumeRepository.findOneBy({ id });

    //     response.send(result);
    // }

    // update = async (request: any, response: any) => {
    //     const { params, body } = request;
    //     const { id } = params;

    //     const instance = await this.resumeRepository.findOneBy({ id });

    //     for (const key in body) {
    //         instance[key] = body[key];
    //     }

    //     const result = await this.resumeRepository.save(instance);

    //     response.send(result);
    // }

    // delete = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const instance = await this.resumeRepository.findOneBy({ id });
    //     await this.resumeRepository.remove(instance);

    //     response.status(204).send({});
    // }

}

export default resumeController;
