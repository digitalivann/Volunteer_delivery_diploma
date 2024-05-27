import prisma from "../../prisma/prismaDB.js";
import CrudRepo from './crudRepo.js';

class NeedRepo extends CrudRepo {
    constructor() {
        super(prisma.need);
    }

    findNeedsForPath(needsId, pathId) {
        return prisma.need.findMany({
            where :{
                pathId: pathId,
                id : {in: needsId}
            },
            include : {
                path: true
            }
        })
    }


}
export default new NeedRepo();
