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

    //só usamos o useStates quando precisamos guardar uma informação que muda e o react precisa acompanhar
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);
    const [atualizarGenero, setAtualizarGenero] = useState();

    function alertar(icone, mensagem) {
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


    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //verificar se o input esta vindo vazio
        // trim: apaga os espaços
        if (genero.trim() != "") {
            try {
                //cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alertar("sucess", "Cadastro realizado com sucesso!")
                setGenero("");
                listarGenero();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alertar("error", "Preencha o campo!")
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

async function ExcluirGenero(idGenero) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: true
  });

  const result = await swalWithBootstrapButtons.fire({
    title: "Você tem certeza?",
    text: "Não será possível reverter!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, deletar!",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`genero/${idGenero}`);
      swalWithBootstrapButtons.fire(
        "Deletado!",
        "O gênero foi deletado com sucesso.",
        "success"
      );
      listarGenero(); // Atualiza a lista após deletar
    } catch (error) {
      console.log(error);
      Swal.fire("Erro!", "Não foi possível deletar o gênero.", "error");
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire(
      "Cancelado",
      "O gênero não foi deletado.",
      "error"
    );
  }
}

    async function EditarGenero(genero) {
        console.log(genero);
        const { value: novoGenero } = await Swal.fire({
            title: "Enter your IP address",
            input: "text",
            inputLabel: "Novo genero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoGenero) {
            try {
                console.log(genero.nome);
                console.log(novoGenero);
                
                await api.put(`genero/${genero.idGenero}`,
                    {nome: novoGenero}
                );
                Swal.fire(`o Genero modificado ${novoGenero}`);
            } catch (error) {
                console.log(error);
            }
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
                    visibilidade="none"

                    nomeGenero="none"                   
                    lista={listaGenero}
                    
                    tipoLista ="genero"

                    funcExcluir={ExcluirGenero}
                    funcEditar={EditarGenero}
                />

            </main>
            <Footer />
        </>
    )
}
export default CadastroGenero;
