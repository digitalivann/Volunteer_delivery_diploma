import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getHub, deleteHub, updateHubInfo, updateHubStatus} from "../services/hubService";
import React, {useEffect, useState} from "react";
import {Hub} from "../components/Hub";
import Spinner from "../components/Spinner";
import {HubForm} from "../components/HubForm";

export const HubPage = ({user}) => {
    const location = useLocation();
    const [hubInfo, setHubInfo] = useState(location.state?.hub)
    const [error, setError] = useState("")
    const {id} = useParams();
    const [showForm, setShowForm] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        if (!hubInfo) {
            getHubInfo()
        }
    }, []);

    const getHubInfo = () => {
        getHub(id, (res) => {
            setHubInfo(res.data)
        }, (err) => {
            nav('/hubs')
        })
    };

    const handleHubStatusUpdate = (statusNew) => {
        updateHubStatus(statusNew, id, (res) => {
            setHubInfo({...hubInfo, status: res.data.status})
            setError("")
        }, (err) => {
            setError(err)
        });
    }

    const handleHubUpdate = (hubNew) => {
        updateHubInfo(hubNew, id, (res) => {
            setError("")
            getHubInfo()
            setShowForm(false)
        }, (err) => {
            setError(err)
        });
    }


    const handleHubDelete = () => {
        setError("")
        deleteHub(id, (res) => {
            nav('/hubs', {
                state: {
                    message: `Ви видалили хаб ${hubInfo.name}, ${hubInfo.address}, ${hubInfo.city}, ${hubInfo.region}`,
                }
            })
            setShowForm(false)
        }, (err) => {
            setError(err)
        });
    };


    return <div className="container-fluid about py-5">
        {showForm && <div className="mt-5 pt-5 align-items-center justify-content-center">
            { user?.role === "ADMIN" && <button onClick={() => {
                setShowForm(!showForm)
            }} className="btn-hover-bg btn btn-primary rounded-pill text-white py-2 px-4"
                    type={"button"}>{"Повернутись до хабу"}
            </button>}
        </div>}
        {hubInfo ? <>
            {showForm ? <HubForm setInfo={(hubNew) => handleHubUpdate(hubNew)} error={error} hub={hubInfo}/> :
                <Hub user={user} setRedact={() => {
                    setShowForm(true)
                }} setStatus={(status) => {
                    handleHubStatusUpdate(status)
                }} setDelete={() => {
                    handleHubDelete()
                }}
                     hubInfo={hubInfo} error={error}/>}</> : <Spinner/>}
    </div>
}