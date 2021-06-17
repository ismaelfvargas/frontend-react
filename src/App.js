import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from "./components/Header";

/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

/**
 *UseState retorna um array com 2 posições
 * 1. Variável com o seu valor inicial
 * 2. Função para atualizarmos esse valor
 */

function App() {
    const [projects, setProjects] = useState([])

    useEffect( () => {
        api.get('projects').then(response => {
           setProjects(response.data);
        });
    }, [] );

    async function HandleAddProject() {
        //setProjects([...projects, `Novo projeto ${Date.now()}`])

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Ismael Freitas de Vargas"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Homepage"/>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>) }
            </ul>

            <button type="button" onClick={HandleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;