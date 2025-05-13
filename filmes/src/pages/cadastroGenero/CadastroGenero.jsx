import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { use, useEffect, useState } from "react";
import api from "../../services/Services"

//importando o sweetalert
import Swal from 'sweetalert2'

const CadastroGenero = () => {
    const [genero, setGenero] = useState("");

    function alerta(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }
    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //verificar se o input esta vindo vazio
        //-------------------------------------------------IF---------------------------------------------------------------//

        if (genero.trim() != "") {
            alert("O campo precisa estar preenchido")
            //try => tentar(o esperado)
            //catch => lanca a excecao
            //------------------------------------------------TRY---------------------------------------------------------------//
            try{
                //cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alerta("success", "Cadastro realizado com sucesso")
                setGenero("");
            }
            //------------------------------------------------CATCH---------------------------------------------------------------//
            catch (error) {
                alerta("error", "erro! Entre em contato com o suporte")
                console.log(error);
            }
            //------------------------------------------------ELSE---------------------------------------------------------------//
        } 
        else {
            alerta("error", "Erro! Preencha o campo");
        }
    }
        //teste
    //useEffect <funcao> <dependencia>

    useEffect(() => {
        console.log(genero);
    }, [genero]);

    //-------------------------------------------------RETURN---------------------------------------------------------------//
    return (
        <>
            <Header />
            <main>
                <Cadastro tituloCadastro="cadastro de Genero"
                    visibilidade="none"
                    placeholder="Genero"
                    //Atribuindo a funcao:
                    funcCadastro={cadastrarGenero}
                    //Atribuindo o valor ao input:
                    valorInput={genero}
                    //Atribuindo a funcao que atualiza meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    tituloLista="Lista de Genero"
                    visibilidade="none"
                />


            </main>
            <Footer />
        </>
    )
}


export default CadastroGenero;