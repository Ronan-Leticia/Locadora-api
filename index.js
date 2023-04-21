const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const filmes = [{ id: 1, titulo: 'Vingadores: Ultimato', descricao: 'Os Vingadores se unem para derrotar Thanos.' },
{ id: 2, titulo: 'Vingadores: Guerra Infinita', descricao: 'Thanos busca as Joias do Infinito para destruir metade do universo.' },
{ id: 3, titulo: 'Vingadores: Era de Ultron', descricao: 'Os Vingadores enfrentam o robô Ultron.' },
{ id: 4, titulo: 'Vingadores', descricao: 'Os Vingadores se unem para deter Loki e seus aliados.' } 
];

let filmesAlugados = [];

app.get(`/filmes`, (req, res) =>{
    res.send(filmes);
});

app.post(`/alugar`, (req, res) => {
    const {nome, id} = req.body;
    const filme = filmes.find(f => f.id == id);

    if(!filme){
        res.status(404).json({"mensagem":"Filme não encontrado"});
    }

    if(filmesAlugados.some(f => f.filme.id == id)){
        res.status(400).json({"Mensagem":"Filme já alugado"});
    }else{
        filmesAlugados.push({nome, filme});
        res.json({"mesagem":`O filme ${filme.titulo} foi alugado por ${nome}`})
    }

});

app.get(`/filmesalugados`, (req, res) =>{
    res.send(filmesAlugados);
});

app.put(`/entregar`, (req, res) =>{
    const id = req.body.id;
    const index = filmesAlugados.findIndex(f => f.filme.id == parseInt(id));

    if(index == -1){
        res.status(404).json({"mensagem":"O filme não está alugado."});
    }
    filmesAlugados.splice(index, 1);
    res.json({"mensagem": "Filme entregue com sucesso."});
   
});

const PORT = 3000;
app.listen(PORT, (err) => {
    console.log(`servidor rodando na porta ${PORT}` );
});