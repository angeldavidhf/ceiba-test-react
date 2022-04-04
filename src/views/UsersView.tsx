import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import TableComponent from "./TableComponent";


export default function UsersView(props: any) 
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    const columns = useMemo(() => [
        {
            Header: "",
            accessor: "id"
        },
        {
            Header: "Avatar",
            accessor: "avatar"
        },
        {
            Header: "Correo electrónico",
            accessor: "email"
        },
        {
            Header: "Nombre",
            accessor: "first_name"
        },
        {
            Header: "Apellido",
            accessor: "last_name"
        }
    ], []);

    useEffect(() => {
        setLoading(true);

        async function getUsers(page: number) {
            await axios.get("https://reqres.in/api/users?page=" + page)
            .then((response) => {
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("Lo sentimos, tenemos un error de conexión por favor intentalo mas tarde.");
            });
        }

        if(!loading) getUsers(page);
    }, [page]);

    const handleCreate = (e: any): void => {
        e.preventDefault();
        props.history.push('/create');
    }

    return (
        <div>
            <h1 data-testid="users__title">Usuarios</h1><br/>
            <button type="button" className="btn btn-primary" style={{ float: "right", margin: 10 }} onClick={handleCreate} data-testid="users__btn-create">Crear usuario</button>
            <TableComponent columns={columns} data={users} />
            <div>
                <nav aria-label="Page navigation example" style={{ float: "right" }}>
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link" onClick={() => setPage((page - 1) > 0? page - 1 : 1)}>Anterior</button></li>
                        <li className="page-item"><button className="page-link" onClick={() => setPage(1)} data-testid={"users__btn-page-" + page}>{page}</button></li>
                        <li className="page-item"><button className="page-link" onClick={() => setPage(page + 1)}>Siguiente</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}







//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:

// h1 de título  data-testid="users__title"
// table con el contenido de la lista de usuarios   data-testid="users__table"
// Etiquetas de imagen con el avatar de cada usuario  data-testid=“user__img-" concatenado con el id de cada usuario.
// botón que redirecciona a la vista de crear nuevo usuario  data-testid="users__btn-create"
// un botón por cada página con el número de la página como texto data-testid="users__btn-page-" concatenado con el número de la página