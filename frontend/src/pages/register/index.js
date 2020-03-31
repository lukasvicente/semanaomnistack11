import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api';

import './style.css';
import logo from '../../assets/logo.svg';
 

function Register(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function HandleRegister(e){
        
        e.preventDefault();
        const data = {
            nome,email,whatsapp,city,uf,
        };

        try{
            const response =  await api.post('ongs', data);

            alert(`Seu ID de Acesso: ${response.data.id}` );
            history.push('/')
        }catch (err){
            alert('Erro no cadastro!')
        }
        

    }


    return (
        <div className="register-conteiner">
            <div className="content">
                <section>
                    <img src={logo} alt="logo"/>
                

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as Ong' </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft  size={16} color="#e02041"/> 
                         tenho cadastro
                    </Link>
                </section>
       
                <form onSubmit={HandleRegister}>

                    <input placeholder="Nome da Ong"
                    value={nome}
                    onChange={ e => setNome(e.target.value)}
                    />

                    <input type="email" placeholder="E-Mail da Ong"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                    />

                    <input placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={ e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">

                        <input placeholder="Cidade"
                        value={city}
                        onChange={ e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80}}
                        value={uf}
                        onChange={ e => setUf(e.target.value)}
                         />

                    </div>

                    <button className="button" type="submit"> Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;