import "./Lista.css"
import CadastroGenero from "../../pages/cadastroGenero/CadastroGenero"
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"
const Lista = (props) => {
    return (
        <>
            <section className="layout_grid listagem">
                <h1>Lista dos {props.tituloLista}</h1>
                <hr />
                <div className="tabela">
                    <table>
                        <thead>
                            <tr className="table_cabecalho">
                                <td data-cell="Nome">
                                    {props.editandoId === item.idGenero ? (
                                        <input
                                            type="text"
                                            value={props.novoNome}
                                            onChange={(e) => props.setNovoNome(e.target.value)}
                                        />
                                    ) : (
                                        item.nome
                                    )}
                                </td>

                                <th style={{ display: props.nomeGenero }}>Gênero</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* tbody =>corpo da tabela */}
                            {/**verficar se a lista esta vindo vazia */}
                            {/** ? : == if else */}
                            {props.lista && props.lista.length > 0 ? (
                                props.lista.map((item) => (
                                    <tr className="item_lista" key={item.idGenero}>
                                        <td data-cell="Nome">
                                            {item.nome}
                                        </td>
                                        <td data-cell="Genero" style={{ display: props.visibilidade }}>Comedia</td>
                                        <td data-cell="Editar">
                                            <img src={Editar} alt="Caneta" style={{ cursor: "pointer" }} onClick={() => props.funcAtualizar(item.idGenero)} />
                                        </td>

                                        <td data-cell="Excluir">
                                            <img src={Excluir} alt="Lixeira" style={{ cursor: "pointer" }} onClick={() => props.funcExcluir(item)}
                                            // "onClick={() => props.funcExcluir(item.idGenero)}" aqui estou chamando a funcao de escluir para ao clicar na imagem ela ser excluida
                                            // "style={{ cursor: "pointer" }}"  esse style e para animar o cursor 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) :
                                (
                                    <p>Nenhum gênero foi encontrado.</p>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
export default Lista;