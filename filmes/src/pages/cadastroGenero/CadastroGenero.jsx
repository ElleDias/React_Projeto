import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";    
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import{use, useEffect, useState} from "react";
import api from "../../services/Services"


const CadastroGenero = () => {

     
    const [genero, setGenero] = useState("");


    function cadastrarGenero(){
        //verificar se o input esta vindo vazio
        if(genero === ""){
            alert("O campo precisa estar preenchido")
        }
        //try => tentar(o esperado)
        //catch => lanca a excecao
        try{
            //cadastrar um genero: post
            api.post("genero", {nome: genero});
            alert("obaaa, genero cadastrado")
        }catch (error){
            alert("deu ruimm!");
            console.log(error);
        }
    }
    //teste
    //useEffect <funcao> <dependencia>

    useEffect(() => {
        console.log(genero);
    }, [genero]);


    return (
        <>
        <Header/>
        <main>
        <Cadastro tituloCadastro ="cadastro de Genero" 
        visibilidade ="none"
        placeholder="Genero"
        //Atribuindo a funcao:
        funcCadastro = {cadastrarGenero}
        //Atribuindo o valor ao input:
        valorInput = {genero}
        //Atribuindo a funcao que atualiza meu genero:
        setValorInput = {setGenero}
        />
        <Lista
        tituloLista="Lista de Genero"
        visibilidade="none"
        />


        </main>
        <Footer/>
        </>
    )
}


export default CadastroGenero;