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

const CadastroGenero = () => {

    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);
    const [excluirGenero, setExcluirGenero] = useState();
    const [atualizarGenero, setAtualizarGenero] = useState();
    const alterarGenero = (novoGenero) => { setAtualizarGenero(novoGenero); };
    const [editandoId, setEditandoId] = useState(null);
    const [novoNome, setNovoNome] = useState("");


    function alerta(icone, mensagem) {
        //------------------------INICIO-DO-ALERTA------------------------------//
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

        //------------------------FIM-DO-ALERTA---------------------------------//
    }

    function confirmarExclusao(genero) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                ExcluirGenero(genero); // chama a função que exclui mesmo
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        });
    }

    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //verificar se o input esta vindo vazio
        // trim: apaga os espaços
        if (genero.trim() != "") {
            try {
                //cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alerta("sucess", "Cadastro realizado com sucesso!")
                setGenero("");

            } catch (error) {
                alerta("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alerta("error", "Preencha o campo!")
        }
        //try => tentar(o esperado)
        //catch => pega a exceção
    }

    //sincrono => Acontece simultaneamente
    //assincrono => esperar algo acontecer/ uma resposta

    async function listarGenero() {
        try {

            const resposta = await api.get("genero");
            //console.log(resposta.data);
            setListaGenero(resposta.data);
            //console.log(resposta.data[3]);
            //colocou so o .data para obter apenas os objetos e o [3] para obter o objeto 3 da lista do sql

        } catch (error) {
            console.log(error);
        }
    }

    async function ExcluirGenero(generoId) {
        try {

            await api.delete(`genero/${generoId.idGenero}`);
            //((`genero/${idGenero})  Isso é template string, ou seja, permite inserir variáveis dentro da string.
            //console.log(resposta.data);
            alerta("success", "Genero deletado com sucesso!");
            listarGenero();

        } catch (error) {
            console.log(error);
            alerta("error", "Erro ao deletar o genero. Entre em contato com o suporte");
        }
    }

    async function AtualizarGenero() {
        try {
            await api.put(`genero/${editandoId}`, { nome: novoNome });
            alerta("success", "Gênero atualizado com sucesso!");
            setEditandoId(null);  // limpa o ID editando
            setNovoNome("");      // limpa o campo
            listarGenero();       // atualiza a lista
        } catch (error) {
            console.log(error);
            alerta("error", "Erro ao atualizar o gênero. Entre em contato com o suporte.");
        }
    }

    //TESTE: validar o genero
    // useEffect(() => {
    //     console.log(genero);
    // },[genero]);
    //fim do teste

    //assim que a pagina redenrizar, o metodo listarGenero() sera chamado
    useEffect(() => {
        listarGenero();
    }, [listaGenero]);
    //o conchete vazio serve para quando vc recarregar a pagina aparecer esse alert
    //[] array sem dependencia
    // o array comeca no 0
    //[listagenero] => array com dependencia, quando tem alteracao na minha dependencia ou sofrer alteracao vai acontecer um efeito

    return (
        <>
            <Header />
            <main>
                <Cadastro tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="gênero"

                    //atribuindo a função:
                    funcCadastro={cadastrarGenero}
                    //atribuindo o valor do input:
                    valorInput={genero}
                    //atibuindo a função que atualiza o meu genero
                    setValorInput={setGenero}
                />

                <Lista
                     tituloLista="Lista de Gêneros"
                    nomeGenero="none"
                    visibilidade="none"
                    lista={listaGenero}
                    funcAtualizar={AtualizarGenero}
                    funcConfirmarExclusao={confirmarExclusao}                           
                    editandoId={editandoId}
                    setEditandoId={setEditandoId}
                    novoNome={novoNome}
                    setNovoNome={setNovoNome}
                />

            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;