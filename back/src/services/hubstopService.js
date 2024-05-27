import hubstopRepo from "../repos/hubstopRepo.js";
import {NotFoundError} from "../helpers/errorsTypes.js";
import shipmentRepo from "../repos/shipmentRepo.js";


export const getHubStop = async (hubstopId) => {
    const hubstop = await hubstopRepo.getInstanceById(hubstopId)
    if (!hubstop) throw new NotFoundError("Такої зупинки в хабі на машруті не існує")
    return hubstop
}

export const getHubstopsForHubWithShipment = async (status, hubId) => {
    let hubstops = []
    if (status === "Active") {
        hubstops = await hubstopRepo.getHubstopsByHubActiveWithPathAndDriverAndNeeds(hubId)
    } else if (status === "Plans") {
        hubstops = await  hubstopRepo.getHubstopsByHubPlansWithPathAndDriverAndNeeds(hubId)
    } else {
        hubstops = await hubstopRepo.getHubstopsByHubHistoryWithPathAndDriverAndNeeds(hubId)
    }
    const hubstopsInfo = []

    for (const h in hubstops) {
        const shipments = await shipmentRepo.getShipmentsByHubstopWithGoodsAndVolunteer(h.id)
        hubstopsInfo.push({...hubstops[h], shipments: shipments})
    }


    return (hubstopsInfo)
}

