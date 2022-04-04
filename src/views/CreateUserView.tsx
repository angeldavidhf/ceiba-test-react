import React, { useState } from "react";
import axios from "axios";

export default function CreateUserView(props: any) 
{
    const name = useFormInput('');
    const job = useFormInput('');

    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');    
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();

        axios.post("https://reqres.in/api/users", {
            "name": name,
            "job": job
        }).then(response => {
            setLoading(false);
            setSucces("Muy bien! has creado el usuario con exito.");
        })
        .catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Lo sentimos, tenemos un error de conexión por favor intentalo mas tarde.");
        })

        setError('');
        setLoading(true);
    }

    return (
        <div>
            <h1 data-testid="create__title">Crear usuarios</h1><br/>
            <div className={error? "alert alert-danger" : "alert alert-danger d-none"} role="alert">
                {error && <>{error}</>}
            </div>
            <div className={succes? "alert alert-success" : "alert alert-success d-none"} role="alert">
                {succes && <>{succes}</>}
            </div>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" {...name} data-testid="create__name" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Trabajo</label>
                    <input type="text" className="form-control" {...job} data-testid="create__job" required/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} data-testid="create__btn">
                    {loading? 'Cargando...' : 'Crear'}
                </button>
            </form>
        </div>
    );
}

const useFormInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e: any) => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}



//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:
//h1 de título="create__title"
// Input de nombre=“create__name”
// Input de trabajo=“create__job”
// Span que alerta con notificaciones=“alert__text”
// Botón para crear= “create__btn”