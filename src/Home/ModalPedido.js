import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import InputMask from 'react-input-mask';
import RealCurrencyInput from 'react-currency-masked-input';



function ModalPedido(props) {

    const [selected, setSelected] = React.useState([{idproduto:0}]);
    const [options, setOptions] = React.useState([]);
    const [desconto, setDesconto] = React.useState(0);
    const [valortotal, setValorTotal] = React.useState(0);
    const [disabled, setDisables] = React.useState(true);
    const [data, setData] = React.useState([{id:props.idMesa}]);
    const [isLoading, setIsLoading] = React.useState(false);

    function formatarParaReal(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const buscaproduto = (query) => {
          setIsLoading(true);

          axios.get(`http://localhost:3003/produtos/${query}`)
          .then(response => {
            setOptions(response.data);
            setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
            console.error('Error fetching data:', error);
          });
     }




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

    function verificarID(novoID) {

       var callback=true;
       selected.forEach((item,key) => {
           if(item.idproduto == novoID){
            // selected[key].qtdProduto++;
            callback = false;
           }
       });
       
 
    //    setSelected([]);

       return callback;
    }


    const selecionarItem = (selected) => {
    
       if(selected.length){

            let produto = selected[0];
            produto = selected[0].split("-");

            setIsLoading(true);

          
            axios.get(`http://localhost:3003/produto/${produto[0]}`)
            .then(response => {

                if(verificarID(response.data[0].id)){
                    setSelected(produto => [
                        ...produto,
                        {
                        idproduto: response.data[0].id,
                        nomeProduto: response.data[0].prod_tx_nome,
                        valorProduto: response.data[0].prod_tx_valor,
                        qtdProduto:""
                        }
                    ]);  
                }

                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error fetching data:', error);
            });
        }

      };



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
                                <label>Nome: </label>
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
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            <div className="col-12">
                                <label>Produto:</label>
                                <AsyncTypeahead
                                    id="meuAsyncTypeahead"
                                    isLoading={isLoading}
                                    labelKey="label"
                                    minLength={3}
                                    onSearch={buscaproduto}
                                    options={options.map(item => `${item.id} - ${item.prod_tx_nome}`)}
                                    placeholder="Digite para buscar na API..."
                                    onChange={selecionarItem}
                                />
                            </div>
                            {/* <div className="col-1 d-flex flex-wrap justify-content-center">
                                <label className="col-12">&nbsp;</label>
                                <button className="btn btn-success" >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div> */}
                        </div>
                        <div className="col-12 d-flex mt-4">
                        
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Quatidade</th>
                                        <th scope="col">Total</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {

                                        
                                        
                                        selected.filter(item => item.idproduto != 0).map((item,key) => 
                                            <tr>
                                                <th scope="row">{item.idproduto}</th>
                                                <td>{item.nomeProduto}</td>
                                                <td>{formatarParaReal(item.valorProduto*1)}</td>
                                                <td>{item.qtdProduto}</td>  
                                                <td>{formatarParaReal(item.valorProduto*item.qtdProduto)}</td>  
                                                <td><InputMask className="form-control" mask="9999" maskChar="" type="text" onChange={e => {                                               
                                                const salvaArray = [...selected];
                                                salvaArray[key+1].qtdProduto = e.target.value;
                                                setSelected(salvaArray);
                                                    
                                                    var novo_valor_total = 0;
                                                    selected.filter(item => item.idproduto != 0).map((item,key) =>{
                                                        novo_valor_total += item.valorProduto*item.qtdProduto;
                                                    }
                                                )
                                                
                                                setValorTotal(novo_valor_total);

                                                }}  defaultValue={item.qtdProduto} /></td>
                                                <td><a href="#"><FontAwesomeIcon className="text-danger" icon={faTrash} /></a></td>
                                            </tr>
                                        )
                                    }
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>Desconto %</td>
                                        <td><RealCurrencyInput className="form-control" name="myInput" placeholder="0" maxlength="6"/></td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12 text-end mt-5 d-flex">
                            <div className="col-6 text-start">
                                <p className="m-0">Desconto: <span>{desconto}</span></p>
                                <p className="m-0">Valor Total: <span>{formatarParaReal(valortotal)}</span></p>
                            </div>
                            <div className="col-6">
                                <input type="submit" value="Descontos" className="btn btn-success" />
                                <input type="submit" value="Finalizar Pedido" className="btn btn-purple  border border-1 border-transparent" />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalPedido;
