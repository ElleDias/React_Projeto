//importando o useEffect e o useStates
import { useState, useEffect } from "react";
import api from "../../services/Services";

//importando o sweetalert
import Swal from 'sweetalert2'

//importação de componenets
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
const CadastroFilme = () => {

  const [listaGenero, setListaGenero] = useState([]);
  const [genero, setGenero] = useState("");
  const [filme, setFilme] = useState("");
 const [listaFilme, setListaFilme] = useState([]);


  //no const nao pode colocar metodo (metodo é verbo) ou seja sempre escrever sem ser em verbo.

  // Função de alerta
  const alertar = (icon, title) => {
    Swal.fire({
      icon: icon,
      title: title,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Buscar gêneros para o select
  async function listarGenero() {
    try {
      const resposta = await api.get("genero");
      setListaGenero(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Cadastrar novo filme
  async function cadastrarGenero(e) {
    e.preventDefault();
    if (filme.trim() !== "") {
      try {
        await api.post("filme", { titulo: filme, idGenero: genero });
        alertar("success", "Sucesso! Cadastro realizado.");
        setFilme("");
        setGenero("");
      } catch (error) {
        console.log(error);
        alertar("error", "Erro ao cadastrar o filme.");
      }
    } else {
      alertar("error", "Erro! Preencha os campos.");
    }
  }

  async function listarFilme() {
    try {
      const resposta = await api.get("filme");
      setListaFilme(resposta.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    listarGenero();
    listarFilme();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Cadastro
          tituloCadastro="Cadastro de Filme"
          placeholder="Filme"
          
          lista = {listaGenero}
          funcCadastro={cadastrarGenero}
          valorInput={filme}
          setValorInput={setFilme}
          valorSelect={genero}
          setValorSelect={setGenero}
        />
        <Lista
          tipoLista="filme"
          tituloLista="Filmes"

          lista={listaFilme}
          
        />
      </main>
      <Footer />
    </>
  );
};

export default CadastroFilme;
