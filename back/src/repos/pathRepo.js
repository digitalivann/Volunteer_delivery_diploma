import prisma from "../../prisma/prismaDB.js";
import CrudRepo from './crudRepo.js';

class PathRepo extends CrudRepo {
    constructor() {
        super(prisma.path);
    }

    createPathWithNeedsAndHubStops(hubsId, needsData, pathData) {
        if (needsData) {
            return prisma.path.create({
                data: {
                    ...pathData,
                    hubstops: {
                        createMany: {
                            data: hubsId
                        }
                    },
                    needs: {
                        createMany: {
                            data: needsData
                        }
                    }
                },
                include: {
                    hubstops: true,
                    needs: true
                }
            })
        } else {
            return prisma.path.create({
                data: {
                    ...pathData,
                    hubstops: {
                        createMany: {
                            data: hubsId
                        }
                    }
                },
                include: {
                    hubstops: true,
                    needs: true
                }
            })
        }
    }

    getPathByDriverAndStopsAndStartTime(data) {
        return prisma.path.findUnique({where: {driverId_stops_startTime: data}})
    }

    getPathByDriver(driverId) {
        return prisma.path.findMany({where: {driverId: driverId}, orderBy: {startTime: "asc"}})
    }

    getPathByDriverAndId(pathId, driverId) {
        return prisma.path.findMany({where: {id: pathId, driverId: driverId}})
    }

    getPathsFilteredBy() {
        const curDate = new Date(Date.now())
        curDate.setDate(curDate.getDate() + 2)
        return prisma.path.findMany({
            where: {startTime: {gt: curDate}},
            include: {driver: {select: {name: true, surname: true}}}
        })
    }

    getPathFullByIdWithDriver(pathId) {
        return prisma.path.findUnique({
            where: {id: pathId},
            include: {driver: true, needs: true}
        })
    }

    getActivePathsByDriverWithDriver(driverId) {
        const curDate = new Date(Date.now())
        curDate.setDate(curDate.getDate() - 2)

        return prisma.path.findMany({
            where: {driverId: driverId, startTime: {gte: curDate, lte: new Date(Date.now())}},
            orderBy: {startTime: "asc"}, include: {driver: {select: {name: true, surname: true}}}
        })
    }

    getPlannedPathsWithDriver() {
        return prisma.path.findMany({
            where: {startTime: {gt: new Date(Date.now())}},
            orderBy: {startTime: "asc"}, include: {driver: {select: {name: true, surname: true}}}
        })
    }


    getPlannedPathsFilteredWithDriver(filterData) {
        return prisma.path.findMany({
            where: {
                OR: [
                    {destination: {contains: filterData, mode: 'insensitive'}},
                    {hubstops: {some: {hub: {name: {contains: filterData, mode: 'insensitive'}}}}},
                    {hubstops: {some: {hub: {region: {contains: filterData, mode: 'insensitive'}}}}},
                    {hubstops: {some: {hub: {city: {contains: filterData, mode: 'insensitive'}}}}},
                ], startTime: {gt: new Date(Date.now())}
            },
            orderBy: {startTime: "asc"}, include: {driver: {select: {name: true, surname: true}}}
        })
    }

    getHistoryPathsByDriverWithDriver(driverId) {
        const curDate = new Date(Date.now())
        curDate.setDate(curDate.getDate() - 2)

        return prisma.path.findMany({
            where: {driverId: driverId, startTime: {lt: curDate}},
            orderBy: {startTime: "asc"}, include: {driver: {select: {name: true, surname: true}}}
        })
    }

    getPlannedPathsByDriverWithDriver(driverId) {
        return prisma.path.findMany({
            where: {driverId: driverId, startTime: {gt: new Date(Date.now())}},
            orderBy: {startTime: "asc"}, include: {driver: {select: {name: true, surname: true}}}
        })
    }
}

export default new PathRepo();
