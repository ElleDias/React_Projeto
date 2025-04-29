import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de gênero"
                    placeholder="Gênero"
                    visibilidade="none"
                />

                <Lista
                 tituloLista ="Generos"
                nomeGenero="none"/>
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;