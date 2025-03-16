import ResumeService from "../services/resumeService"

class resumeController {
    private resumeService: ResumeService;

    constructor() {
        this.resumeService = new ResumeService();
    }

    create = async (request: any, response: any) => {
        // const { body, bachelor } = request
        // body.bachelorId = bachelor.id
        // const listData = request.body
        // listData.bachelorId = request.bachelor.id

        const resumeData = request.body
        const bachelorId = request.user.id

        const dataToSave = {
            ...resumeData,
            bachelorId,
        };
        try {
            const resume = this.resumeService.create(dataToSave)
            
            return response.send(resume)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const resume = await this.resumeService.getByID(id);

            return response.send(resume);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const resume = await this.resumeService.update(id, body);

            return response.send(resume);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.resumeService.delete(id);

            return response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    // get = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const result = await this.resumeRepository.findOneBy({ id });

    //     return response.send(result);
    // }

    // update = async (request: any, response: any) => {
    //     const { params, body } = request;
    //     const { id } = params;

    //     const instance = await this.resumeRepository.findOneBy({ id });

    //     for (const key in body) {
    //         instance[key] = body[key];
    //     }

    //     const result = await this.resumeRepository.save(instance);

    //     return response.send(result);
    // }

    // delete = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const instance = await this.resumeRepository.findOneBy({ id });
    //     await this.resumeRepository.remove(instance);

    //     return response.status(204).send({});
    // }

}

export default resumeController;
