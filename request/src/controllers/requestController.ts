import RequestService from "../services/requestService"

class requestController {
    private requestService: RequestService;

    constructor() {
        this.requestService = new RequestService();
    }

    create = async (request: any, response: any) => {
        // const { body, bachelor } = request
        // body.bachelorId = bachelor.id
        // const listData = request.body
        // listData.bachelorId = request.bachelor.id

        const requestData = request.body
        const userId = request.user.id

        const dataToSave = {
            ...requestData,
            userId,
        };
        try {
            const request = this.requestService.create(dataToSave)
            
            return response.send(request)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const request = await this.requestService.getByID(id);

            return response.send(request);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const request = await this.requestService.update(id, body);

            return response.send(request);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.requestService.delete(id);

            return response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    // get = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const result = await this.requestRepository.findOneBy({ id });

    //     return response.send(result);
    // }

    // update = async (request: any, response: any) => {
    //     const { params, body } = request;
    //     const { id } = params;

    //     const instance = await this.requestRepository.findOneBy({ id });

    //     for (const key in body) {
    //         instance[key] = body[key];
    //     }

    //     const result = await this.requestRepository.save(instance);

    //     return response.send(result);
    // }

    // delete = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const instance = await this.requestRepository.findOneBy({ id });
    //     await this.requestRepository.remove(instance);

    //     return response.status(204).send({});
    // }

}

export default requestController;
