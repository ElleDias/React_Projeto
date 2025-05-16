import "./Lista.css";
import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";

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
                                <th>Nome</th>
                                <th style={{ display: props.nomeGenero }}>Gênero</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.lista?.length ? props.lista.map(item => (
                                <tr className="item_lista" key={item.idGenero}>
                                    <td>
                                        {props.editandoId === item.idGenero ? (
                                            <input value={props.novoNome} onChange={e => props.setNovoNome(e.target.value)} />
                                        ) : item.nome}
                                    </td>
                                    <td style={{ display: props.visibilidade }}>Comédia</td>
                                    <td>
                                        {props.editandoId === item.idGenero ? (
                                            <button onClick={props.funcAtualizar}>Salvar</button>
                                        ) : (
                                            <img src={Editar} alt="Editar" style={{ cursor: "pointer" }} onClick={() => {
                                                props.setEditandoId(item.idGenero);
                                                props.setNovoNome(item.nome);
                                            }} />
                                        )}
                                    </td>
                                    <td>
                                        <img src={Excluir} alt="Excluir" style={{ cursor: "pointer" }} onClick={() => props.funcConfirmarExclusao(item)} />
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4">Nenhum gênero foi encontrado.</td></tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default Lista;