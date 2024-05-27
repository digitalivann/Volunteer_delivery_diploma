import {aid_types, status_shipments} from "../utils/data";

export const Good = ({goodInfo}) => {

    return <div className="service-content">
        <h6 className="mb-2 text-primary">
            {aid_types.find(x => x.type === goodInfo.type).label} : {goodInfo.name} {goodInfo.need && `(-> ${goodInfo.need?.name})`} </h6>
    </div>
}