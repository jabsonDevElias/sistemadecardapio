import React from "react";
import './Home.css';

function App() {
    return (
         <div className="d-flex flex-wrap col-12">
                <div className="col-12">
                    <button type="button" className="btn btn-purple">+ Criar Pedido</button>
                </div>
                <h5 className="mt-3 mb-3 text-secondary col-12">Hoje</h5>
                <div className="col-6 d-flex flex-wrap justify-content-between">
                    <h5 className="col-6">Pedido #0000</h5>
                    <div className="col-6">
                    <div className="btn btn-success rounded rounded-5 ">Concluido</div>
                    </div>
                    <h5>R$ 0.00,00</h5>
                </div>
         </div>
    );
  }
  
export default App;
  