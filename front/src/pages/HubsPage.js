import React, {useEffect, useState} from "react";
import {HubForm} from "../components/HubForm";
import {createHub, getAllHubs, getAdminsHubs} from "../services/hubService";
import {HubSmall} from "../components/HubSmall";
import Spinner from "../components/Spinner";
import {useLocation} from "react-router-dom";

export const HubsPage = ({user}) => {
    const location = useLocation();
    const [hubs, setHubs] = useState([])
    const [formError, setFormError] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState(location.state?.message)
    const [showForm, setShowForm] = useState(false)
    const [showHubs, setShowHubs] = useState(false)
    const [filterData, setFilterData] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 9500);
    }, [message]);


    useEffect(() => {
        if (user?.role === "ADMIN") {
          getHubsForAdmin()
        }
    }, []);

    useEffect(() => {
        if (user?.role !== "ADMIN" && !filterData) {
            getHubsMain()
        }
    }, [filterData]);


    const getHubsForAdmin = () => {
        getAdminsHubs((res) => {
            setError("")
            setHubs(res.data)
            setShowHubs(true)
        }, (err) => {
            setError(err)
            console.log(err);
        })
    };

    const getHubsMain = () => {
        setShowHubs(false)
        getAllHubs(filterData, (res) => {
            setError("")
            setHubs(res.data)
            setShowHubs(true)
        }, (err) => {
            setError(err)
            console.log(err);
        })
    };

    const handleHubSubmit = (hubNew) => {
        createHub(hubNew, (res) => {
            setFormError("")
            getHubsForAdmin()
            setMessage(`Ви створили хаб ${res.data.name}, ${res.data.address}, ${res.data.city}, ${res.data.region}`)
            setShowForm(false)
        }, (err) => {
            setFormError(err)
        });
    };

    return (
        <div>
            <div className="container-fluid bg-breadcrumb">
                <div className="container text-center py-5" style={{maxWidth: "900px"}}>
                    <h3 className="text-white display-3 mb-4">    { user?.role === "ADMIN" ? "Ваші хаби" : "Хаби"}</h3>
                    <p className="mb-3 text-white">    { user?.role === "ADMIN" ? "На цій сторінці відображаються тільки ваші хаби" :
                        "На цій сторінці відображаються хаби для збору та видачі допомоги" }
                    </p>
                    { user?.role === "ADMIN" && <div className="d-flex align-items-center justify-content-center">
                        <button onClick={() => {
                            setShowForm(!showForm)
                        }} className="btn-hover-bg btn btn-primary rounded-pill text-white py-2 px-4"
                                type={"button"}>{showForm ? "Повернутись до списку хабів" : "Додати новий хаб"}
                        </button>
                    </div> }
                </div>
            </div>
            <div className="container-fluid blog py-5 ">
                {user?.role !== "ADMIN" && <div className="position-relative w-50 mx-auto">
                    <input onChange={(e) => {setFilterData(e.target.value)}} className="form-control border-primary rounded-pill py-3 ps-4 pe-5" type="text"
                          value={filterData} placeholder="Введіть назву регіону, міста або адресу хабу"/>
                    <div className={"position-absolute top-0 end-0 "}>
                        <button type="button" onClick={getHubsMain}
                                className="btn bg-primary text-white rounded-pill py-2 px-4 mt-2 me-2">Пошук
                        </button>
                        <button type="button" onClick={() => {setFilterData("")}}
                                className="btn bg-primary text-white rounded-pill py-2 px-4 mt-2 me-2">x
                        </button>
                    </div>
                </div>}
                <h5 className={"m-1 text-dark"}>{error}{message}</h5>
                {showForm ? <HubForm setInfo={(info) => {
                        handleHubSubmit(info)
                    }} error={formError}/> :
                    <div className="container py-5 mt-5 pt-0">
                        {hubs.length > 0 ? <div className="row g-4 justify-content-evenly">
                            {hubs?.map((h) =>
                                <HubSmall key={h.id} hubInfo={h}/>)}
                        </div> : <>{showHubs ? "Таких хабів не існує" :<Spinner/>}</>}
                    </div>
                }
            </div>
        </div>
    );
}

