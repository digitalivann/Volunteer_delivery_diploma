import {aid_types, status_shipments} from "../utils/data";

export const Need = ({needInfo}) => {
    return <div className="service-content">
        <h6 className="mb-3 text-primary">
            {needInfo.status === "In waiting" && <i
            className={"fa fa-spinner fs-1x text-primary"}></i>}
            {needInfo.status === "Delivered" && <i
                className={"fa fa-check fs-1x text-primary"}></i>}
            {"     "}{ aid_types.find(x => x.type === needInfo.type).label} : {needInfo.name}</h6>
    </div>
}