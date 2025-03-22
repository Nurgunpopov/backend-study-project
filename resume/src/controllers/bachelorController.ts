import BachelorService from "../services/bachelorService"

class bachelorController {
    private bachelorService: BachelorService;

    constructor() {
        this.bachelorService = new BachelorService();
    }

    create = async (request: any, response: any) => {
        const bachelorData = request.body

        try {
            const bachelor = this.bachelorService.create(bachelorData)
            
            response.send(bachelor)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }
    getByUserId = async (request: any, response: any) => {
        const { userId } = request.query.userId;
        try {
            const bachelor = await this.bachelorService.getByUserId(userId);

            response.send(bachelor);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const bachelor = await this.bachelorService.getByID(id);

            response.send(bachelor);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const bachelor = await this.bachelorService.update(id, body);

            response.send(bachelor);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.bachelorService.delete(id);

            response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    // get = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const result = await this.bachelorRepository.findOneBy({ id });

    //     response.send(result);
    // }

    // update = async (request: any, response: any) => {
    //     const { params, body } = request;
    //     const { id } = params;

    //     const instance = await this.bachelorRepository.findOneBy({ id });

    //     for (const key in body) {
    //         instance[key] = body[key];
    //     }

    //     const result = await this.bachelorRepository.save(instance);

    //     response.send(result);
    // }

    // delete = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const instance = await this.bachelorRepository.findOneBy({ id });
    //     await this.bachelorRepository.remove(instance);

    //     response.status(204).send({});
    // }

}

export default bachelorController;
