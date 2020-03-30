import React,{ useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi'

import './style.css';
import logo from '../../assets/logo.svg';

import api from '../../services/api';


function Profile(){

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');

    useEffect(() => {
        api.get('/profile',{
            headers:{
                Authorization : ongId,
            }
        }).then(response => {

            setIncidents(response.data);
            
        })
    },[]);

    async function HandleDelete(id){

        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err) {

            alert('Error ao deletar')

        }

    }

    function HandleLogout(){

        localStorage.clear();
        history.push('/');
    }

    return (

        <div className="profile-conteiner">
            <header>

                <img src={logo} alt="logo"/>
                <span> Bem vindo, {ongNome} </span>

                
                <Link className="button" to="incidents/new">Cadastrar Novo Caso</Link>

                <button onClick={HandleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

            </header>

            <h1>Casos Registrados</h1>

            <ul>
                {incidents.map( incidents =>(
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incidents.value)}</p>

                        <button onClick={ () => HandleDelete(incidents.id) } type="button">
                        <FiTrash2 size={18} color="#a8a8b3" />
                        </button>
                </li>
                ))}
                
            </ul>
        </div>
    );
};

export default Profile;