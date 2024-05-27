import React, {useState, useRef, useEffect} from "react";
import {baseUrl, server} from "../utils/requestMiddleware";
import {handleChangePictureForHub} from "../utils/handleImage";
import {regions} from "../utils/data";


export const HubForm = ({setInfo, error, hub}) => {
    const [hubNew, setHubNew] = useState(hub ? hub : {
        name: "",
        city: "",
        region: "",
        phone: "",
        startHour: "",
        endHour: "",
        photoUrl: "",
        address: "",
    });

    const inputPictureRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        setInfo(hubNew)
    };

    const handleChangeFile = async (event) => {
        setHubNew({...hubNew, photoUrl: await handleChangePictureForHub(event)})
    }


    return (
        <div>
            <div className="col-lg-5 mt-5 mx-auto text-center mb-5">
                <h3 className="mb-4 section-title px-3">{hub ? "Відредагуйте свій хаб" : 'Створіть новий хаб'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control border-2 bi-border-all"
                                       placeholder="Введіть назву"
                                       value={hubNew.name}
                                       onChange={e => setHubNew({...hubNew, name: e.target.value})}
                                       required/>
                                <label>{hubNew.name === "" ? "Введіть назву хабу*" : "Назва хабу*"} </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input className="form-control border-2 bi-border-all"
                                       type="text"
                                       placeholder="Введіть місто"
                                       value={hubNew.city}
                                       onChange={e => setHubNew({...hubNew, city: e.target.value})}
                                       required/>
                                <label>{hubNew.city === "" ? "Введіть місто хабу*" : "Місто хабу*"}</label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating">
                                <select style={hubNew.region === "" ? {
                                    paddingTop: "10px",
                                    height: "60px",
                                    backgroundColor: "white"
                                } : {paddingTop: "24px", height: "60px", backgroundColor: "white"}}
                                        className="form-control border-2 bi-border-all"
                                        required
                                        value={hubNew.region}
                                        onChange={e => setHubNew({...hubNew, region: e.target.value})}
                                >
                                    <option className="form-control border-2 bi-border-all" value="" disabled selected
                                            hidden>Виберіть регіон хабу*
                                    </option>
                                    {regions?.map((r) => <option
                                        key={regions.indexOf(r)} value={r}>
                                        {r}</option>)}
                                </select>
                                <label>{hubNew.region !== "" && "Назва хабу*"}</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input className="form-control border-2 bi-border-all"
                                       type="text"
                                       placeholder="Введіть номер телефону"
                                       value={hubNew.phone}
                                       onChange={e => setHubNew({...hubNew, phone: e.target.value})}
                                       required/>
                                <label>{hubNew.phone === "" ? "Введіть контактний номер телефону хабу*" : "Контактний номер телефону хабу*"}</label>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <input className="form-control border-2 bi-border-all"
                                       type="text"
                                       placeholder="Введіть адресу"
                                       value={hubNew.address}
                                       onChange={e => setHubNew({...hubNew, address: e.target.value})}
                                       required/>
                                <label> {hubNew.address === "" ? "Введіть адресу хабу*" : "Адреса хабу*"}</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input className="form-control border-2 bi-border-all"
                                       type="number"
                                       placeholder="00"
                                       value={hubNew.startHour}
                                       onChange={e => setHubNew({...hubNew, startHour: e.target.value})}
                                       required/>
                                <label>{hubNew.startHour === "" ? "Введіть початок роботи хабу*" : "Початок роботи хабу*"}</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input className="form-control border-2 bi-border-all"
                                       type="number"
                                       placeholder="24"
                                       value={hubNew.endHour}
                                       onChange={e => setHubNew({...hubNew, endHour: e.target.value})}
                                       required/>
                                <label>{hubNew.endHour === "" ? "Введіть кінець роботи хабу*" : "Кінець роботи хабу*"}</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <input ref={inputPictureRef} type="file" accept="image/*"
                                   onChange={handleChangeFile} hidden/>
                            {(hubNew.photoUrl !== "") ?
                                <>
                                    <div className="blog-img-inner">
                                        <img className="img-fluid w-100 rounded"
                                             style={{height: "300px", maxWidth: "300px", objectFit: "cover"}}
                                             src={`${baseUrl}${hubNew.photoUrl}`} alt="Image"/>
                                    </div>
                                    <button type="button" className="btn w-100 py-3"
                                            onClick={e => setHubNew({...hubNew, photoUrl: ""})}
                                    >
                                        Скинути фото
                                    </button>
                                </> :
                                <button type="button" onClick={() => inputPictureRef.current.click()}
                                        className="btn w-100 py-3">
                                    Завантажити фото
                                </button>
                            }
                        </div>
                        <p style={{color: "maroon", marginTop: "8px"}}>{error}</p>
                        <div className="col-12">
                            <button className="rounded shadow-none border-0 btn-primary w-100 py-3" type="submit">
                                {hub ? "Редагувати хаб" : 'Створити хаб'}  </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

