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
            
            response.send(master)
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    get = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            const master = await this.masterService.getByID(id);

            response.send(master);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;
        try {
            const master = await this.masterService.update(id, body);

            response.send(master);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params;
        try {
            await this.masterService.delete(id);

            response.status(204).send({});
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

}

export default masterController;
