import shipmentRepo from "../repos/shipmentRepo.js";
import pathRepo from "../repos/pathRepo.js";
import {BadRequestError, ConflictError, ForbiddenError, NotFoundError} from "../helpers/errorsTypes.js";
import * as hubstopService from "./hubstopService.js";
import needRepo from "../repos/needRepo.js";
import goodRepo from "../repos/goodRepo.js";
import hubstopRepo from "../repos/hubstopRepo.js";
import hubRepo from "../repos/hubRepo.js";

export const removeNullUndefined = (obj) => {
    const res = structuredClone(obj)

    for (const key in res) {
        for (const k in res[key]) {
            if (res[key][k] === null || res[key][k] === undefined || res[key][k] === "") {
                delete res[key][k];
            }
        }
    }

    return res
}


export const createShipment = async (data, volunteerId) => {
    const needsId = []
    for (const g in data.goods) {
        if (data.goods[g].needId) needsId.push(data.goods[g].needId)
    }

    await getUniqueShipment(data.hubstop.id, volunteerId)

    const {goods, hubstopId, ...shipmentDataOnly} = data;

    const goodsData = removeNullUndefined(goods)
    const shipmentData = {...shipmentDataOnly}

    return await shipmentRepo.createShipmentWithGoodsAndCheckingNeeds(goodsData, shipmentData, needsId, data.hubstop.id, volunteerId);
}

const getUniqueShipment = async (hubstopId, volunteerId) => {
    const shipment = await shipmentRepo.getShipmentByVolunteerAndHubstop({hubstopId, volunteerId})
    if (shipment) throw new ConflictError("У вас уже існує посилка на ций маршрут у цьому хабі")
    return shipment
}

const getShipment = async (shipmentId, volunteerId) => {
    const shipment = await shipmentRepo.getInstanceById(shipmentId)
    if (!shipment) throw new NotFoundError("Такої посилки не існує")

    if (volunteerId) {
        const volunteersShipment = await shipmentRepo.getShipmentByVolunteerAndId(shipmentId, volunteerId)
        if (!volunteersShipment) throw new ForbiddenError()
    }
    return shipment
}

export const updateShipmentStatusReady = async (shipmentId) => {
    const shipment = await shipmentRepo.getShipmentWithGoods(shipmentId)
    if (shipment.status === "Delivered") throw new BadRequestError("Посилка уже готова")

    const needsId = []
    for (const g in shipment.goods) {
       if (shipment.goods[g].needId) shipmentsId.push(shipment.goods[g].needId)
    }

    return shipmentRepo.updateShipmentAndGoodsNeeds({status: "Delivered", confirmTime: dateNow}, shipmentId, needsId);
}

export const updateShipmentsStatusShippedByHubstop = async (hubstopId) => {
    const shipments = await shipmentRepo.getShipmentsByHubstopWithGoodsAndVolunteer(hubstopId)

    const shipmentsId = []
    for (const g in shipments) {
        shipmentsId.push(shipments[g].id)
    }

    return await shipmentRepo.updateShipmentStatusToShipped(shipmentsId)


}

const checkShipmentAccess = async (shipmentId, volunteerId) => {
    const shipment = await shipmentRepo.getShipmentByVolunteerAndId(shipmentId, volunteerId)
    if (!shipment) throw new ForbiddenError()
    return shipment
}

export const getVolunteerShipments = async (status, volunteerId) => {
    let shipments
    if (status === "Future") {
        shipments = await shipmentRepo.getFutureShipmentsByVolunteersWithGoodsAndNeeds(volunteerId)
    } else {
        shipments = await shipmentRepo.getHistoryShipmentsByVolunteersWithGoodsAndNeeds(volunteerId)
    }

    const shipmentsInfo = []

    for (const s in shipments) {
        const hubstop = await hubstopRepo.getHubstopWithHubAndPathById(shipments[s].hubstopId)
        shipmentsInfo.push({...shipments[s], hubstop: hubstop})
    }

    return (shipmentsInfo)

}


export const deleteShipmentById = async (shipmentId) => {
    const shipment = await shipmentRepo.getShipmentWithGoods(shipmentId)

    const needsId = []
    for (const g in shipment.goods) {
        if (shipment.goods[g].needId) needsId.push(shipment.goods[g].needId)
    }

    return shipmentRepo.deleteShipmentWithGoodsAndCheckingNeeds(needsId, shipmentId);
}