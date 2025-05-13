import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista"
import { Fragment } from "react";

const CadastroFilme = () => {
    return (
        <> 
            <Header />
            <main>
                <Cadastro tituloCadastro="Cadastro de Filme"
                    placeholder=" Filme" />
                <Lista
                    tituloLista="Filmes"
                    nomeGenero="Genero" />
            </main>
            <Footer />

        </>
    )
}
export default CadastroFilme;