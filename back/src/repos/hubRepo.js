import prisma from "../../prisma/prismaDB.js";
import CrudRepo from './crudRepo.js';

class HubRepo extends CrudRepo {
    constructor() {
        super(prisma.hub);
    }

    getHubByIdAndAdmin(id, adminId) {
        return prisma.hub.findFirst({where: {id: id, adminId: adminId}});
    }

    getHubsByAdminWithAdmin(adminId) {
        return prisma.hub.findMany({
            where: {adminId: adminId},
            include: {admin: {select: {name: true, surname: true}}}
        });
    }

    getHubsByStatus(status) {
        return prisma.hub.findMany({where: {status: status}, include: {admin: {select: {name: true, surname: true}}}});
    }

    getHubByCityAndRegionAndAddress(data) {
        return prisma.hub.findUnique({where: {city_region_address: data}});
    }

    getHubByPhone(phone) {
        return prisma.hub.findUnique({where: {phone: phone}});
    }

    getHubByIdWithAdmin(hubId) {
        return prisma.hub.findUnique({where: {id: hubId}, include: {admin: {select: {name: true, surname: true}}}});
    }


    getHubsFilteredWithAdmin(filterData) {
        return prisma.hub.findMany({
            where: {
                OR: [
                    {region: {contains: filterData, mode: 'insensitive'}},
                    {city: {contains: filterData, mode: 'insensitive'}},
                    {address: {contains: filterData, mode: 'insensitive'}}
                ],
            }, include: {admin: {select: {name: true, surname: true}}}
        });
    }

    getHubsAllWithAdmin() {
        return prisma.hub.findMany({include: {admin: {select: {name: true, surname: true}}}
        });
    }
}

export default new HubRepo();
