import prisma from "../../prisma/prismaDB.js";
import CrudRepo from './crudRepo.js';


class ShipmentRepo extends CrudRepo {
    constructor() {
        super(prisma.shipment);
    }

    createShipmentWithGoodsAndCheckingNeeds(goodsData, shipmentData, needsId, hubstopId, volunteerId) {
        return prisma.$transaction([
            prisma.shipment.create({
                data: {
                    ...shipmentData,
                    goods: {
                        createMany: {
                            data: goodsData
                        }
                    },
                    volunteer: {
                        connect: {id: volunteerId}
                    },
                    hubstop: {
                        connect: {id: hubstopId}
                    },

                },
                include: {
                    goods: true,
                    hubstop: true
                }
            }),
            prisma.need.updateMany({where: {id: {in: needsId}}, data: {status: "In waiting"}})])
    }

    updateShipmentAndGoodsNeeds(updateData, shipmentId, needsId) {
        return prisma.$transaction([
            this.updateInstanceById(updateData, shipmentId),
            prisma.need.updateMany({where: {id: {in: needsId}}, data: {status: "Delivered"}})])
    }

    updateShipmentStatusToShipped(shipmentsId) {
        return prisma.shipment.updateMany({where: {id: {in: shipmentsId}}, data: {status: "Shipped"}})
    }

    getShipmentByVolunteerAndHubstop(data) {
        return prisma.shipment.findUnique({where: {hubstopId_volunteerId: data}})
    }

    getShipmentByVolunteerAndId(shipmentId, volunteerId) {
        return prisma.shipment.findFirst({where: {id: shipmentId, volunteerId: volunteerId}})
    }

    getShipmentsByHubstopWithGoodsAndVolunteer(hubstopId) {
        return prisma.shipment.findMany({
            where: {hubstopId: hubstopId},
            include: {goods: {select: {need: true, name: true, type: true, needId: true}}, volunteer: true}
        })
    }

    getActiveShipmentsByVolunteerWithGoodsAndNeeds(volunteerId) {
        return prisma.shipment.findMany({
            where: {volunteerId: volunteerId, hubstop: {path: {startTime: {gt: new Date(Date.now())}}}}, include: {
                goods: {
                    select: {
                        need: true,
                        type: true, name: true
                    }
                }, hubstop: {select: {hubId: true, pathId: true}}
            }
        })
    }

    getFutureShipmentsByVolunteersWithGoodsAndNeeds(volunteerId) {
        return prisma.shipment.findMany({
            where: {volunteerId: volunteerId, hubstop: {path: {startTime: {gte: new Date(Date.now())}}}}, select:
                {
                    goods: {select: {need: true, name: true, type: true}}, creationTime: true, confirmTime: true,
                    status: true, hubstopId: true, id: true, notes: true, hubstop: {select: {hubId: true}}
                }
        })
    }

    getHistoryShipmentsByVolunteersWithGoodsAndNeeds(volunteerId) {
        return prisma.shipment.findMany({
            where: {volunteerId: volunteerId, hubstop: {path: {startTime: {lt: new Date(Date.now())}}}}, select:
                {
                    goods: {select: {need: true, name: true, type: true}}, creationTime: true, confirmTime: true,
                    status: true, hubstopId: true, id: true, notes: true, hubstop: {select: {hubId: true}}
                }
        })
    }

    deleteShipmentWithGoodsAndCheckingNeeds(needsId, shipmentId) {
        return prisma.$transaction([
            prisma.shipment.delete({
                where: {id: shipmentId}
            }),
            prisma.need.updateMany({where: {id: {in: needsId}}, data: {status: "Created"}})])
    }

    getShipmentWithGoods(shipmentId) {
        return prisma.shipment.findUnique({
            where: {id: shipmentId}, include: {
                goods: {
                    select: {
                        name: true, type: true, needId: true
                    }
                }
            }
        })
    }


}

export default new ShipmentRepo();
