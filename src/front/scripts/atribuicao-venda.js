import getCookie from "./cookies.js";

const token = getCookie('token');

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const carId = localStorage.getItem('carId');

    if (carId) {
        console.log("ID do veículo:", carId);
        localStorage.setItem("carId", carId);
    } else {
        console.error("ID do veículo não encontrado");
    }
    
    const clienteData = localStorage.getItem("cliente");
    if (clienteData) {
        const cliente = JSON.parse(clienteData);

        console.log("Informações do cliente recuperadas:");
        console.log(cliente);
    } else {
        console.error("Dados do cliente não encontrados no localStorage.");
    }
});



const carId = parseInt(localStorage.getItem("carId"));

const chassis = document.getElementById("chassis");
const placa = document.getElementById("placa");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const ano = document.getElementById("ano");
const estado = document.getElementById("estado");
const quilometragem = document.getElementById("quilometragem");
const preco = document.getElementById("preco");

// Campos de valores
const valorDeVenda = document.getElementById("valor-venda");
const desconto = document.getElementById("desconto");
const emplacamento = document.getElementById("emplacamento-checkbox");
const checkboxVU = document.getElementById("vu-checkbox");

// Área de carro usado
const areaCarroUsado = document.getElementById("carro-usado-div");
const vuPreco = document.getElementById("vu-preco");

// Campo do valor final
const valorFinalField = document.getElementById("valor-final-field");

//Funcao que da fetch e pega os dados do veiculo do bd para serem exibidos no painel de detalhes
async function encontrarVeiculo(){
    try {
        
    } catch (error) {
        console.log("Houve um erro ao tentar obter as informações do veículo");
    }
    
}


 catch (error) {
        console.log("Não foi possível recuperar os dados do veículo vendido: " + error);
    }
}*/


// Impedir números menores que 0
function validarNumeroPositivo(event) {
    if (event.target.value < 0) {
        event.target.value = 0;
    }
}

// Aplicar máscara aos campos de veículos usados
function aplicarMascaraVeiculoUsado() {
    const inputs = {
        chassis: document.getElementById("vu-chassis"),
        placa: document.getElementById("vu-placa"),
        ano: document.getElementById("vu-ano"),
        preco: document.getElementById("vu-preco"),
        quilometragem: document.getElementById("vu-quilometragem"),
    };

    if (inputs.chassis) {
        inputs.chassis.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        });
    }

    if (inputs.placa) {
        inputs.placa.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    
            if (valor.length > 3) {
                valor = valor.slice(0, 3) + "-" + valor.slice(3, 7);
            }
    
            e.target.value = valor.slice(0, 8);
        });
    }
    

    if (inputs.ano) {
        inputs.ano.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
        });
    }

    if (inputs.preco || inputs.quilometragem) {
        [inputs.preco, inputs.quilometragem].forEach((campo) => {
            if (campo) {
                campo.addEventListener("input", validarNumeroPositivo);
            }
        });
    }
}

// Chamar ao ativar "checkboxVU"
checkboxVU.addEventListener("change", () => {
    if (checkboxVU.checked) {
        areaCarroUsado.innerHTML = `
                <div class="vu-number">
                    <h2>VU</h2>
                </div>
                <div class="campos-de-vus">
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Chassis</h2>
                        <input type="text" id="vu-chassis" required>
                    </div>
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Placa</h2>
                        <input type="text" id="vu-placa" required>
                    </div>
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Modelo</h2>
                        <input type="text" id="vu-modelo" required>
                    </div>
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Marca</h2>
                        <input type="text" id="vu-marca" required>
                    </div>
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Ano</h2>
                        <input type="text" id="vu-ano" required>
                    </div>
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Cor</h2>
                        <input type="text" id="vu-cor" required>
                    </div>
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Preço</h2>
                        <input type="number" id="vu-preco" class="vu-campo-preco" required>
                    </div>
                    <div class="carro-usado-field">
                        <h2 class="vu-title">Quilometragem</h2>
                        <input type="number" id="vu-quilometragem" class="vu-campo-preco" required>
                    </div>
                </div>`;
                aplicarMascaraVeiculoUsado();
                const novoInputChassis = document.getElementById("vu-chassis");
                const novoInputPlaca = document.getElementById("vu-placa");
                const novoInputModelo = document.getElementById("vu-modelo");
                const novoInputMarca = document.getElementById("vu-marca");
                const novoInputAno = document.getElementById("vu-ano");
                const novoInputCor = document.getElementById("vu-cor");
                const novoInputQuilometragem = document.getElementById("vu-quilometragem");
                const novoInputPreco = document.getElementById("vu-preco");
                novoInputChassis.addEventListener("input", calcularValorTotal);
                novoInputPlaca.addEventListener("input", calcularValorTotal);
                novoInputModelo.addEventListener("input", calcularValorTotal);
                novoInputMarca.addEventListener("input", calcularValorTotal);
                novoInputAno.addEventListener("input", calcularValorTotal);
                novoInputCor.addEventListener("input", calcularValorTotal);
                novoInputQuilometragem.addEventListener("input", calcularValorTotal);
                novoInputPreco.addEventListener("input", calcularValorTotal);
    } else {
        areaCarroUsado.innerHTML = "";
    }
});

// Validar campos gerais
[valorDeVenda, desconto].forEach((campo) => {
    if (campo) {
        campo.addEventListener("input", validarNumeroPositivo);
    }
});

//Adiciona event listeners nos campos
[valorDeVenda, desconto, emplacamento].forEach(campo => {
    if (campo.type === "checkbox") {
        campo.addEventListener("change", calcularValorTotal);
    } else {
        campo.addEventListener("input", calcularValorTotal);
        campo.addEventListener("blur", calcularValorTotal);
    }
});


// Função para calcular o valor total
function calcularValorTotal() {
    let descontoValor = parseFloat(desconto.value) || 0;
    let valorDeVendaValor = parseFloat(valorDeVenda.value) || 0;
    let valor = valorDeVendaValor * (1 - descontoValor * 0.01);

    if (emplacamento.checked) {
        valor += 150;
    }

    if(checkboxVU.checked){
        const vuPreco = parseFloat(document.getElementById("vu-preco").value) || 0;
        valor -= vuPreco
    }
    if(valor < 0){
        valor = 0;
    }


    //Define o valor final
    valorFinalField.innerHTML = `R$ ${valor.toFixed(2)}`;
    
    //Armazena valor final no localStorage
    localStorage.setItem("valorFinal", parseFloat(valorFinalField.innerHTML.substring(3)));
    console.log(localStorage);


    //Armazena o vu no localStorage
    if(!checkboxVU.checked){
        localStorage.setItem("veiculoUsado", null);
    } else {
        const novoInputChassis = document.getElementById("vu-chassis").value;
        const novoInputPlaca = document.getElementById("vu-placa").value;
        const novoInputModelo = document.getElementById("vu-modelo").value;
        const novoInputMarca = document.getElementById("vu-marca").value;
        const novoInputAno = document.getElementById("vu-ano").value;
        const novoInputCor = document.getElementById("vu-cor").value;
        const novoInputQuilometragem = document.getElementById("vu-quilometragem").value;
        const novoInputPreco = parseFloat(document.getElementById("vu-preco").value);

        let vuDados = {
            ano: novoInputAno,
            chassi: novoInputChassis,
            cor: novoInputCor,
            modelo: novoInputModelo,
            marca: novoInputMarca,
            preco: novoInputPreco,
            placa: novoInputPlaca,
            quilometragem: novoInputQuilometragem
        }
        localStorage.setItem("veiculoUsado", JSON.stringify(vuDados));
    }
};


//Remove os veiculos usados e valor da venda caso o usuario volte para a outra tela
const backButton = document.getElementById("go-back-btn");
backButton.addEventListener("click", ()=>{
    localStorage.removeItem("cliente");
    localStorage.removeItem("valorFinal");
    localStorage.removeItem("veiculosUsados");
});

async function fetchVeiculoData(){
    try {
        const response = await fetch(`http://localhost:8080/veiculo/buscarVeiculoPorId/${carId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.ok){
            console.log("Houve um erro no fetch de buscar veiculo por id");
            return null;
        }

        return await response.json();
        
    } catch (e) {
        console.log("Houve um erro ao tentar obter informacoes sobre o veiculo vendido");
    }
}


async function enviarEmail(){
    //Fetch do email
    const emailCliente = document.getElementById('cliente-email').value;
    const tipoPagamento = document.getElementById('dropdown-financiamento').value;
    let pagamento;
    if(tipoPagamento === 'A_VISTA'){
        pagamento = "à vista";
    } else {
        pagamento = "financiado";
    }

    const urlEmail = `http://localhost:8080/email/enviarContratoDeCompraVenda/${emailCliente}`;

    const dadosVeiculo = await fetchVeiculoData();
    console.table(dadosVeiculo);

    const dadosCliente = JSON.parse(localStorage.getItem('cliente'));

    const emailBody = {
        comprador: `${dadosCliente.nome} ${dadosCliente.sobrenome}`,
        cpfComprador: dadosCliente.cpf,
        enderecoComprador: `${dadosCliente.rua}, ${dadosCliente.numero}`,
        marcaVeiculo: dadosVeiculo.marca,
        modeloVeiculo: dadosVeiculo.modelo,
        anoVeiculo: dadosVeiculo.ano,
        corVeiculo: dadosVeiculo.cor,
        placaVeiculo: dadosVeiculo.placa,
        chassiVeiculo: dadosVeiculo.chassi,
        preco: parseFloat(localStorage.getItem('valorFinal')),
        formaPagamento: pagamento,
        representanteVendedor: "Renato"
    };

    try {
        const response = await fetch(urlEmail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }, body: JSON.stringify(emailBody)
        });
        console.log("fetch email 1");

        if(!response.ok){
            console.log("Houve um problema no disparo do email");
        }
        console.log("fetch email 2");

    } catch (error) {
        console.error("Error occurred during email sending:", error.message);
    }
}

async function fetchVenda(){
    const url = "http://localhost:8080/venda/registrarVenda";

    const cliente = JSON.parse(localStorage.getItem('cliente'));
    const veiculoUsado = JSON.parse(localStorage.getItem('veiculoUsado'));

    const bodyPostVenda = {
        cliente: cliente,
        idVeiculo: parseInt(localStorage.getItem('carId')),
        valor: parseFloat(localStorage.getItem('valorFinal')),
        veiculoUsado: veiculoUsado
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(bodyPostVenda) 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const responseJSON = await response.json();
        console.log("Response:", responseJSON);
    } catch (error) {
        console.error("Error occurred during the request:", error.status);
    }
}


//Parte de envio de dados e conclusao da venda
const sendButton = document.getElementById("dados-btn");
sendButton.addEventListener("click", async ()=>{
    await enviarEmail();
    await fetchVenda();

    localStorage.clear();
    window.location.href = "../pages/menu-vendas.html"
});


calcularValorTotal();
