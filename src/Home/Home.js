import React from "react";
import '../App.css';
import axios from 'axios';
import ModalPedido from "./ModalPedido";


function App() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:3003/mesas/')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);


    return (
        <div className="d-flex flex-wrap col-12 justify-content-between">
            <div className="col-12">
                <button type="button" className="btn btn-purple" data-bs-toggle="modal" data-bs-target={`#modalMesa${0}`}>+ Criar Pedido</button>
                <ModalPedido idMesa={0}/>
            </div>
            <h5 className="mt-3 mb-3 text-secondary col-6">Hoje</h5>
            <h5 className="mt-3 mb-3 text-secondary col-5">Mesas</h5>
            <div className="col-6">
                <div className="card col-12 p-3">
                    <div className="col-12 d-flex justify-content-between">
                        <h5 className="col-6">Pedido #0000</h5>
                        <div className="col-6">
                            {/* <div className="btn btn-success rounded rounded-5 p-2 ">Concluido</div> */}
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <h5>R$ 0.00,00</h5>
                        <h5>Emitido por <b>Jabson Elias</b></h5>
                    </div>
                </div>
            </div>

            <div className="card col-5  rounded rounded-2 p-3">
                <div className="col-12 d-flex flex-wrap">
                    {data.map(item => (
                        <> 
                        <ModalPedido idMesa={item.id} />
                        <button className="btn btn-purple col-1 border border-1 border-transparent" data-bs-toggle="modal" data-bs-target={`#modalMesa${item.id}`}>{item.id}</button>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
