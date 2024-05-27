import hubRepo from "../repos/hubRepo.js";
import {ConflictError, ForbiddenError, NotFoundError} from "../helpers/errorsTypes.js";

export const getHub = async (hubId, adminId) => {
    const hub = await hubRepo.getHubByIdWithAdmin(hubId)
    if (!hub) throw new NotFoundError("Хаб не знайдено")

    if (adminId) {
        const adminsHub = await hubRepo.getHubByIdAndAdmin(hubId, adminId)
        if (!adminsHub) throw new ForbiddenError();
    }

    return hub
}

export const getUniqueHub = async (data) => {
    const {city, address, region, phone} = data
    const hubAddress = await hubRepo.getHubByCityAndRegionAndAddress({city, region, address})
    if (hubAddress) throw new ConflictError("Хаб за такою адресою в цьому місті уже існує")
    const hubPhone = await hubRepo.getHubByPhone(phone)
    if (hubPhone) throw new ConflictError("Хаб з таким телефоном уже існує")

}

export const getAllHubs = async (filterData) => {
    if (filterData === "") {
        return hubRepo.getHubsAllWithAdmin();
    } else {
        return hubRepo.getHubsFilteredWithAdmin(filterData);
    }
}

export const getHubsByAdminId = async (adminId) => {
    return hubRepo.getHubsByAdminWithAdmin(adminId);
}

export const createHub = async (data, adminId) => {
    await getUniqueHub(data)

    const hubData = {...data, adminId: adminId}
    return await hubRepo.createInstance(hubData)
}

export const getHubsFree = async () => {
    return await hubRepo.getHubsByStatus("Empty");
}

export const updateHubById = async (data, hubId) => {
    return await hubRepo.updateInstanceById(data, hubId);
}

export const deleteHubById = async (hubId) => {
    return await hubRepo.deleteInstanceById(hubId);
}