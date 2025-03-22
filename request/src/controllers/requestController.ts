import RequestService from "../services/requestService"

class requestController {
    private requestService: RequestService;

    constructor() {
        this.requestService = new RequestService();
    }

    create = async (request: any, response: any) => {
        const requestData = request.body
        const userId = request.user.id

        try {
            const request = this.requestService.create(requestData, userId)
            
            response.send(request)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const allRequests = await this.requestService.getAll();

            response.send(allRequests);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    // changeStatus = async (request: any, response: any) => {
    //     const { params, body } = request;
    //     const { id } = params;
    //     const { status } = body
    //     try {
    //         const request = await this.requestService.changeStatus(id, status);

    //         response.send(request);
    //     } catch (error: any) {
    //         response.status(400).send({ "error": error.message });
    //     }
    // }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const request = await this.requestService.getByID(id);

            response.send(request);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const request = await this.requestService.update(id, body);

            response.send(request);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.requestService.delete(id);

            response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

}

export default requestController;
