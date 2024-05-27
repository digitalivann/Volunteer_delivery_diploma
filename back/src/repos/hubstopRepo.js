import CrudRepo from "./crudRepo.js";
import prisma from "../../prisma/prismaDB.js";


class HubstopRepo extends CrudRepo {
    constructor() {
        super(prisma.hubStop);
    }

    getHubstopByHub(hubId) {
        return prisma.hubStop.findMany({where: {hubId: hubId}})
    }

    getHubstopsByPathWithHubAndNeeds(pathId) {
        return prisma.hubStop.findMany({
            where: {pathId: pathId},
            include: {
                hub: {
                    select: {
                        admin: true,
                        city: true,
                        address: true,
                        region: true,
                        phone: true,
                        startHour: true,
                        endHour: true,
                        photoUrl: true,
                        status: true,
                        id: true,
                        name: true
                    }
                }
            }
        })
    }

    getHubstopsByHubActiveWithPathAndDriverAndNeeds(hubId) {
        const curDate = new Date(Date.now())
        curDate.setDate(curDate.getDate() - 2)

        return prisma.hubStop.findMany({
            where: {hubId: hubId, path: {startTime: {gte: curDate, lte: new Date(Date.now())}}}, select:
                {path: {select: {startTime: true, destination: true, needs: true, driver: true}}}
        })
    }

    getHubstopsByHubPlansWithPathAndDriverAndNeeds(hubId) {
        return prisma.hubStop.findMany({
            where: {hubId: hubId, path: {startTime: {gt: new Date(Date.now())}}},
            select: {path: {select: {startTime: true, destination: true, needs: true, driver: true}}}
        })
    }

    getHubstopsByHubHistoryWithPathAndDriverAndNeeds(hubId) {
        const curDate = new Date(Date.now())
        curDate.setDate(curDate.getDate() - 2)

        return prisma.hubStop.findMany({
            where: {hubId: hubId, path: {startTime: {lt: curDate}}}, select: {
                path:
                    {select: {startTime: true, destination: true, needs: true, driver: true}}
            }
        })
    }

    getHubstopWithHubAndPathById(hubstopId) {
        return prisma.hubStop.findUnique({where: {id:hubstopId }, include:{path:true, hub:true}})
    }

}

export default new HubstopRepo();
