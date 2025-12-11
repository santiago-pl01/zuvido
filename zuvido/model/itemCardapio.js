import mongoose from 'mongoose';

const itemcardapioSchema = new mongoose.Schema({
    nome: String,
    imagem: String,
    descricao: String,
    preco: Number,
    cardapio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cardapio"
    }
}); 

export default mongoose.model("Itemcardapio", itemcardapioSchema);  

/*
Documento Resultante

{
  "_id": "67501bbca91c4c68ab1549d2",
  "nome": "Hambúrguer Artesanal",
  "imagem": "https://meusite.com/imagens/hamburguer.jpg",
  "descricao": "Pão brioche, carne 180g e queijo cheddar.",
  "preco": 32.90,
  "cardapio": "675019ec92f1c6e4a3e51f22", 
  "__v": 0 //registra quantas vezes o documento foi modificado. 
}




Documento retornado depois do .populate("cardapio")
ex.:
> Itemcardapio.find().populate("cardapio")

{
  "_id": "67501bbca91c4c68ab1549d2",
  "nome": "Hambúrguer Artesanal",
  "imagem": "https://meusite.com/imagens/hamburguer.jpg",
  "descricao": "Pão brioche, carne 180g e queijo cheddar.",
  "preco": 32.90,
  "cardapio": {
      "_id": "675019ec92f1c6e4a3e51f22",
      "nome": "Cardápio Principal",
      "descricao": "Itens servidos diariamente",
      "__v": 0
  },
  "__v": 0
}-
*/  