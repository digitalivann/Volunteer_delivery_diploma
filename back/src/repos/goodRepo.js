import prisma from "../../prisma/prismaDB.js";
import CrudRepo from './crudRepo.js';

class GoodRepo extends CrudRepo {
    constructor() {
        super(prisma.good);
    }

    getGoodsByShipment(shipmentId) {
        return prisma.good.findMany({
            where :{
                shipmentId: shipmentId
            },
            include : {
                need: true
            }
        })
    }
}
export default new GoodRepo();
