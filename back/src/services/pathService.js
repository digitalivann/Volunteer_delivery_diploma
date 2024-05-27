import pathRepo from "../repos/pathRepo.js";
import {ConflictError, ForbiddenError, NotFoundError} from "../helpers/errorsTypes.js";
import hubstopRepo from "../repos/hubstopRepo.js";
import shipmentRepo from "../repos/shipmentRepo.js";
import hubRepo from "../repos/hubRepo.js";
import userRepo from "../repos/userRepo.js";


export const createPath = async (data, driverId) => {

    const stopsString = []
    const hubstops = []
    data.stops.map(s => {
        stopsString.push(s.city + ', ' + s.region)
    })
    data.stops.map(s => {
        hubstops.push({hubId: s.id})
    })

    await getUniquePath({stops: stopsString, startTime: data.startTime}, driverId)
    const {needs, ...pathDataOnly} = data;
    const pathData = {
        ...pathDataOnly, driverId: driverId, stops: stopsString,
        destination: data.destination
    }

    return pathRepo.createPathWithNeedsAndHubStops(hubstops, needs, pathData);
}

export const getPathsOfDriver = async (driverId) => {
    return pathRepo.getPathByDriver(driverId)
}

/*export const getPaths = async (data) => {
    const {hubId, region, city} = data

    await hubService.getHub(hubId)

    const hubstops = await hubstopRepo.getHubstopByHub(hubId)

    const pathsId = []
    hubstops.map(h => {pathsId.push(h.pathId)})


    console.log(pathsId)

}*/

export const getPaths = async (data) => {
    return await pathRepo.getPathsFilteredBy()
}

export const getPath = async (pathId, driverId) => {
    const path = await pathRepo.getInstanceById(pathId)
    if (!path) throw new NotFoundError("Такого маршруту не існує")

    if (driverId) {
        const driversPath = await pathRepo.getPathByDriverAndId(pathId, driverId)
        if (!driversPath) throw new ForbiddenError()
    }
    return path
}

export const getUniquePath = async (data, driverId) => {
    const {stops, startTime} = data

    const path = await pathRepo.getPathByDriverAndStopsAndStartTime({driverId, stops, startTime})
    if (path) throw new ConflictError("У вас уже існує маршрут з такими зупинками в цей час")
    return path
}

const checkPathAccess = async (pathId, driverId) => {
    const path = await pathRepo.getPathByDriverAndId(pathId, driverId)
    if (!path) throw new ForbiddenError()
    return path
}

export const getPathInfoById = async (pathId) => {
    const path = await pathRepo.getPathFullByIdWithDriver(pathId)
    if (!path) throw new NotFoundError("Такого маршруту не існує")


    const hubstops = await hubstopRepo.getHubstopsByPathWithHubAndNeeds(pathId)

    const hubstopsInfo = []


    for (const h in hubstops) {
        const shipments = await shipmentRepo.getShipmentsByHubstopWithGoodsAndVolunteer(hubstops[h].id)
        hubstopsInfo.push({
            ...hubstops[h],
            shipments: shipments,
            hub: {
                ...hubstops[h].hub,
                label: hubstops[h].hub.name + ", " + hubstops[h].hub.region + ', ' + hubstops[h].hub.city + ", " + hubstops[h].hub.address
            }
        })
    }


    return {...path, hubstops: hubstopsInfo}
}

export const getPathsForDriver = async (status, driverId) => {
    let paths = []
    if (status === "Active") {
        paths = await pathRepo.getActivePathsByDriverWithDriver(driverId)
    } else if (status === "Plans") {
        paths = await pathRepo.getPlannedPathsByDriverWithDriver(driverId)
    } else {
        paths = await pathRepo.getHistoryPathsByDriverWithDriver(driverId)
    }

    /*const pathsInfo = []
    for (const p in paths) {
        let hubstopsInfo = []
        for (const h in p.hubstops) {
            const shipments = await shipmentRepo.getShipmentsByHubstop(h.id)
            hubstopsInfo.push({...p.hubstops[h], shipments: shipments})
        }
        pathsInfo.push({...p, hubstops: hubstopsInfo})
    }*/

    return (paths)
}

export const getAllPlannedPath = async (filterData) => {
    if (filterData === "") {
        return pathRepo.getPlannedPathsWithDriver();
    } else {
        return pathRepo.getPlannedPathsFilteredWithDriver(filterData)
    }
}

export const deletePathById = async (pathId) => {
    return await pathRepo.deleteInstanceById(pathId)
}