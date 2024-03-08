import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';





function ModalPedido(props) {
    {/* <button type="button" class="btn btn-primary" data-bs-toggle="modalMesa" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> */}
    const [selected, setSelected] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [disabled, setDisables] = React.useState(true);
    const [data, setData] = React.useState([{id:props.idMesa}]);
    const [produto, setProduto] = React.useState([""]);

    // const options = ['Option 1', 'Option 2', 'Option 3'];


    React.useEffect(() => {
        if(props.idMesa == 0){
            setDisables(false);
            axios.get('http://localhost:3003/mesas/')
              .then(response => {
                setData(response.data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
            }
    }, []);

    React.useEffect(() => {
        if(props.idMesa == 0){
            axios.get('http://localhost:3003/produtos/')
              .then(response => {
                setOptions(response.data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
            }
    }, []);

    return (
        <div class={`modal fade`} id={`modalMesa${props.idMesa}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Fazer o Pedido</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="modal-body" method="post">
                        <div className="col-12 d-flex justify-content-between gap-2">
                            <div className="col-6">
                                <label>Nome:</label>
                                <input type='text' className="form-control" />
                            </div>
                            <div className="col-6">
                                <label>Telefone:</label>
                                <input type='text' className="form-control" />
                            </div>
                        </div>
                        <div className="col-12">
                            <label>Mesa:</label>
                            <select class="form-select" aria-label="Default select example" disabled={disabled}>
                                {data.map(item => <option value={item.id}>{item.id}</option>)}
                            </select>
                        </div>
                        <div className="col-12 d-flex">
                            <div className="col-12">
                                <label>Produto:</label>
                                {/* <input type='text' className="form-control" /> */}
                                <Typeahead
                                    id="basic-example"
                                    onChange={setSelected}
                                    options={options.map(item => item.prod_tx_nome)}
                                    placeholder="Escolha o produto..."
                                    selected={selected}
                                />
                            </div>
                        </div>
                        <div className="col-12 d-flex mt-4">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Quatidade</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td><a href="#"><FontAwesomeIcon className="text-danger" icon={faTrash} /></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12 text-end mt-5">
                            <input type="submit" value="Descontos" className="btn btn-success" />
                            <input type="submit" value="Finalizar Pedido" className="btn btn-purple  border border-1 border-transparent" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalPedido;
