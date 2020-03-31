import React,{ useState } from 'react'

import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.svg';

function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId =  localStorage.getItem('ongId');
    const history = useHistory();

    async function HandleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data,{
                headers:{
                    Authorization: ongId,
                }
            })

            alert('Cadastrado com Sucesso!');
            history.push('/profile');
            
        }catch (err){
            alert('Error ao cadastrar');
        }
    }
 
    return (
        <div className="new-incident-conteiner">
            <div className="content">
                <section>
                    <img src={logo} alt="logo"/>
                

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva seu caso detalhadamente</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft  size={16} color="#e02041"/> 
                        Voltar para home
                    </Link>
                </section>
       
                <form onSubmit={HandleNewIncident}>
                    <input 
                        placeholder="Titilo do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit"> Cadastrar</button>
                </form>
            </div>
        </div>
    );

}

export default NewIncident;