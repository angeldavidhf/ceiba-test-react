import React, { useState } from "react";
import axios from "axios";
import { setTokenSession } from "../utils/commons";

function LoginView(props: any) 
{
    const email = useFormInput('');
    const password = useFormInput('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        axios.post('https://reqres.in/api/login', {email: email.value, password: password.value})
        .then(response => {
            setLoading(false);
            setTokenSession(response.data.token);
            props.history.push('/users');
        })
        .catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else if (error.response.status === 400) setError("Usuario y/o contraseña incorrectos.");
            else setError("Lo sentimos, tenemos un error de conexión por favor intentalo mas tarde.");
        })
    }

    return (
        <div>
            <h1 data-testid="login__title">Login</h1><br/>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" {...email} autoComplete="new-password" data-testid="login__email"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" aria-describedby="password-error" {...password} autoComplete="new-password" data-testid="login__password"/>
                    <div id="password-error" className="form-text error" style={{ color: 'red' }} data-testid="alert__text">
                        {error && <>{error}</>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} data-testid="login__btn-login">
                    {loading? 'Cargando...' : 'Iniciar'}
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

export default LoginView;





//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:

// h1 de título  data-testid="login__title"
// Input de email  data-testid=“login__email”
// Input de contraseña  data-testid=“login__password”
// Botón para ingresar data-testid=“login__btn-login”
// Span que alerta con notificaciones  data-testid==“alert__text”
