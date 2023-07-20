import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Home() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('Por favor, selecione um arquivo PDF para enviar.');
            return;
        }

        const formData = new FormData();
        formData.append('arquivo', selectedFile);

        axios.post('/upload', formData).then(res => {
            console.log(res.data);
            alert('Arquivo enviado com sucesso!');
        }).catch((error) => {
            console.error('Erro ao fazer o upload do arquivo:', error);
            alert('Ocorreu um erro ao enviar o arquivo. Por favor, tente novamente.');
        });
    };

    return (
        <Div>
            <h1>Faça o upload de um pdf para extrair o texto dele:</h1>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar PDF</button>
        </Div>
    );
}

const Div = styled.div`
    min-width: 100vw;
    width: 100%;
    min-height: 100vh;
    height: auto;
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2em;
    justify-content: center;
    align-items: center;
    input{
        width: 20vw;
    }
`;
