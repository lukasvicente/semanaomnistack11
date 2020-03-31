import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import heroImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

 
function Login(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function HandleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            const ongNome = response.data.nome;
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongNome', ongNome);

            history.push('/profile');             

        }catch (err){
            alert('Falha no login');
        }

    }

    return (
        <div className="login-conteiner">
            <section className="form">

                <img src={logo} alt="logo"/>

                <form onSubmit={HandleLogin}>
                    <h1>Faça seu login </h1>
                    <input placeholder="Sua ID"
                        value={id}
                        onChange={ e => setId(e.target.value)}
                        required
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn  size={16} color="#e02041"/> 
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            
            <img src={heroImg} alt="heroes"/>
        </div>
    );
}

export default Login;