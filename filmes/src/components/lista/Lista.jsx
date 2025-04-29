import "./Lista.css"
import CadastroGenero from "../../pages/cadastroGenero/CadastroGenero"
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"
const Lista =() => {
    return(
        <>
        <section className="layout_grid listagem">
            <h1>Lista dos filmes</h1>
            <hr />
            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            <th>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="item_lista">
                            <td data-cell="Nome">Velozes e Furiosos</td>
                            <td data-cell="Gênero">Ação</td>
                            <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" /></td>
                        </tr>
                    
                        <tr className="item_lista">
                            <td data-cell="Nome">Limite da Traicao</td>
                            <td data-cell="Gênero">Suspense</td>
                            <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}
export default Lista;