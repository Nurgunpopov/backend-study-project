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
            
            return response.send(bachelor)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const bachelor = await this.bachelorService.getByID(id);

            return response.send(bachelor);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const bachelor = await this.bachelorService.update(id, body);

            return response.send(bachelor);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.bachelorService.delete(id);

            return response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    // get = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const result = await this.bachelorRepository.findOneBy({ id });

    //     return response.send(result);
    // }

    // update = async (request: any, response: any) => {
    //     const { params, body } = request;
    //     const { id } = params;

    //     const instance = await this.bachelorRepository.findOneBy({ id });

    //     for (const key in body) {
    //         instance[key] = body[key];
    //     }

    //     const result = await this.bachelorRepository.save(instance);

    //     return response.send(result);
    // }

    // delete = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const instance = await this.bachelorRepository.findOneBy({ id });
    //     await this.bachelorRepository.remove(instance);

    //     return response.status(204).send({});
    // }

}

export default bachelorController;
