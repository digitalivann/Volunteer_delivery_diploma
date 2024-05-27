import React from "react";
import {useNavigate} from "react-router-dom";

export const PathSmall = ({pathInfo}) => {
    const nav = useNavigate()

    return <div className="col-md-6 mb-2">
        <div style={{height: "100%"}}
             className="service-content-inner d-flex justify-content-around align-items-center bg-white border border-primary rounded p-1 pe-0">
            <div className="service-icon p-3">
                <i className="fa fa-car fa-4x text-primary"></i>
                <h4 className="text-primary mb-0">{pathInfo.destination}</h4>
            </div>
            <div className="row gy-3 gx-3 ">
                <div className="col-sm-4 mt-3 m-3 pe-4"><i
                    className="fa fa-clock text-primary me-2"></i>{new Date(pathInfo.startTime).toLocaleString('en-GB')}
                </div>
                <div className="col-sm-4 pe-4"><i
                    className="fa fa-user text-primary me-2"></i>
                    <p>{pathInfo.driver.surname} {pathInfo.driver.name}</p>
                </div>
            </div>
            <div className="service-content text-center m-2">
                {pathInfo?.stops.map((s) =>
                    <p className="mb-0">{s}</p>)}
                <div className="service-content align-self-end m-2">
                    <button onClick={() => {
                        nav(`/path/${pathInfo.id}`, {
                            state: {
                                path: pathInfo,
                            }
                        })
                    }} className="btn btn-primary rounded-pill align-self-end py-2 px-4">Детальніше
                    </button>
                </div>
            </div>
        </div>
    </div>
}