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
                            {props.lista && props.lista.length > 0 ? (
                                //vamos mapear os itens da lista
                                props.lista.map((item) => (
                                    //dando um identificador para cada item da lista
                                    <tr className="item_lista" key={item.idGenero}>
                                        <td data-cell="Nome">{item.nome}</td>
                                        <td style={{ display: props.visibilidade }}>Comédia</td>
                                        <td data-cell="Editar">
                                            <img src={Editar} alt="Excluir" style={{ cursor: "pointer" }} onClick={() => props.funcEditar(item)} />
                                        </td>
                                        <td data-cell="Excluir">
                                            <img src={Excluir} alt="Excluir" style={{ cursor: "pointer" }} onClick={() => props.funcExcluir(item.idGenero)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Nenhum gênero foi encontrado.</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default Lista;