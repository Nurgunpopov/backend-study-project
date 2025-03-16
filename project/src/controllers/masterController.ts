import MasterService from "../services/masterService"

class masterController {
    private masterService: MasterService;

    constructor() {
        this.masterService = new MasterService();
    }

    create = async (request: any, response: any) => {
        const masterData = request.body
        
        try {
            const master = this.masterService.create(masterData)
            
            return response.send(master)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const master = await this.masterService.getByID(id);

            return response.send(master);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const master = await this.masterService.update(id, body);

            return response.send(master);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.masterService.delete(id);

            return response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    // get = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const result = await this.masterRepository.findOneBy({ id });

    //     return response.send(result);
    // }

    // update = async (request: any, response: any) => {
    //     const { params, body } = request;
    //     const { id } = params;

    //     const instance = await this.masterRepository.findOneBy({ id });

    //     for (const key in body) {
    //         instance[key] = body[key];
    //     }

    //     const result = await this.masterRepository.save(instance);

    //     return response.send(result);
    // }

    // delete = async (request: any, response: any) => {
    //     const { params } = request;
    //     const { id } = params;

    //     const instance = await this.masterRepository.findOneBy({ id });
    //     await this.masterRepository.remove(instance);

    //     return response.status(204).send({});
    // }

}

export default masterController;
