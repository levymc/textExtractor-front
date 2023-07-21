import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Home() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
        alert('Por favor, selecione um arquivo PDF para enviar.');
        return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        console.log(formData);

        axios.post('http://localhost:5005/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((res) => {
            console.log(res.data);
            setExtractedText(res.data.text); // Atualiza o estado com o texto extraído do PDF
            alert('Arquivo enviado com sucesso!');
          }).catch((error) => {
            console.error('Erro ao fazer o upload do arquivo:', error);
            alert('Ocorreu um erro ao enviar o arquivo. Por favor, tente novamente.');
          });
    };

    return (
        <Div>
        <h1 onClick={() => { console.log(selectedFile) }}>Faça o upload de um pdf para extrair o texto dele:</h1>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Enviar PDF</button>
        {extractedText && <TextoExtraido>{extractedText}</TextoExtraido>}
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
    input {
        width: 20vw;
    }
`;

const TextoExtraido = styled.p`
    margin-top: 20px;
    font-size: 18px;
    white-space: pre-wrap; /* Permite quebras de linha no texto */
`;
