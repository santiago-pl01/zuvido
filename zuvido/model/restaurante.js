import mongoose from 'mongoose';

const restauranteSchema = new mongoose.Schema({
    nome: String,
    imagem: String,
    descricao: String,
}); 

export default mongoose.model("Restaurante", restauranteSchema);  

/*
Documento Resultante

{
  "_id": "675015b238e82df5c3ba91d7",
  "nome": "Restaurante Sabor da Serra",
  "imagem": "https://meuapp.com/img/sabor-serra.png",
  "descricao": "Comida caseira e ambiente aconchegante.",
  "__v": 0 //registra quantas vezes o documento foi modificado.
}

*/      