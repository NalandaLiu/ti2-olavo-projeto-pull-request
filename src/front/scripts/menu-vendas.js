import getCookie from "./cookies.js";
import {decodeJWT} from "./cookies.js"

let role;

const token = getCookie('token');
if(token){
    try {
        const payload = decodeJWT(token);
        console.log('Payload decodificado:', payload);
        role = payload.role; 
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
    }
}

function pesquisarVendas() {
    let input = document.querySelector('input[type="text"]').value.toUpperCase();

    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let id = card.querySelector('.card-title').textContent.toUpperCase();
        let cliente = card.querySelector('.card-text:nth-child(2)').textContent.toUpperCase();
        let vendedor = card.querySelector('.card-text:nth-child(3)').textContent.toUpperCase();

        if (id.includes(input) || cliente.includes(input) || vendedor.includes(input)) {
            card.parentElement.style.display = '';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}

//Atualiza o modal de aprovacao baseado no id da venda
function atualizarModalAprovacao(vendaId) {
    if(role === 'ADMIN'){
        const titulo = document.getElementById("aprovacao-gerente-titulo");
        const body = document.getElementById("texto-modal-gestor");
        titulo.innerHTML = `Aprovação da venda ${vendaId}`;
        body.innerHTML = `Você tem certeza que deseja confirmar a realiação da venda de id ${vendaId}?<br>Fazê-lo resultará no início do processo de entrega.`;
 
   } else if(role === 'FINANCEIRO') {
        const titulo = document.getElementById("aprovacao-financeiro-titulo");
        const body = document.getElementById("texto-modal-financeiro");
        titulo.innerHTML = `Aprovação da venda ${vendaId}`;
        body.innerHTML = `Você tem certeza que deseja confirmar o pagamento da venda de id ${vendaId}?<br>Fazê-lo resultará na emissão da nota fiscal e requisição da aprovação do gestor.`;
   }
}

function atualizarModalEntrega(vendaId) {
    const tituloModal = document.getElementById('confirmacao-gerente-titulo-entrega');
    const bodyModal = document.getElementById('texto-modal-gerente-entrega');
    tituloModal.innerHTML = `Confirmação da entrega: Venda ${vendaId}`;
    bodyModal.innerHTML = `Você tem certeza que deseja confirmar a entrega do veículo? Fazê-lo resultará no término do processo de venda.`
}

//Carrega o card de vendas para cada tipo de usuario
async function carregarVendas() {
    try {
        const response = await fetch('http://localhost:8080/venda/listarVendas', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const vendas = await response.json();

        const cardArea = document.getElementById('cards-area');
        cardArea.innerHTML = '';

        //Filtra as vendas baseado nas 
        const vendasFiltradas = vendas.filter(venda => {
            if (role === 'ADMIN') {
                return venda.etapasConcluidas === 2 || venda.etapasConcluidas === 3;
            } else if (role === 'FINANCEIRO') {
                return venda.etapasConcluidas === 1;
            } else if (role === 'VENDEDOR') {
                return true;
            }
            return false;
        });

        vendasFiltradas.forEach( venda =>{
            const card = document.createElement('div');
            //Adiciona o card
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">ID: ${venda.idVenda}</h5>
                        <p class="card-text">Cliente: ${venda.CPFCliente.nome} ${venda.CPFCliente.sobrenome}</p>
                        <p class="card-text">Vendedor:</p>
                        <a href="./detalhes-venda.html?id=${venda.idVenda}"><button class="btn control-button">Detalhes</button></a>
                        <button class="btn control-button" data-bs-toggle="modal" data-bs-target="#modal-confirmacao" id="botao-modal-aprovacao-${venda.idVenda}">Aprovar</button>
                        <button class="btn control-button" data-bs-toggle="modal" data-bs-target="#modal-confirmacao-entrega" id="botao-modal-entrega-${venda.idVenda}">Confirmar entrega</button>
                    </div>
                </div>
            `;
            
            cardArea.appendChild(card);
            //pega o botao de aprovacao e define qual modal ele vai abrir e atualiza o modal baseado no role do usuario
            const botaoModalAprovacao = document.getElementById(`botao-modal-aprovacao-${venda.idVenda}`);
            const botaoEntrega = document.getElementById(`botao-modal-entrega-${venda.idVenda}`);
            
            if(role === 'ADMIN'){

                if(venda.etapasConcluidas === 2) {
                    botaoModalAprovacao.setAttribute("data-bs-target", "#modal-confirmacao-gestor");
                    botaoModalAprovacao.addEventListener("click", ()=>{
                        atualizarModalEntrega(venda.idVenda);
                    });
                    botaoEntrega.style.display = "none"
                } else if (venda.etapasConcluidas === 3){
                    botaoModalAprovacao.style.display = "none";
                    botaoEntrega.addEventListener("click", ()=>{
                        atualizarModalEntrega(parseInt(venda.idVenda));
                    });
                }
                

            } else if(role === 'FINANCEIRO') {
                botaoModalAprovacao.setAttribute("data-bs-target", "#modal-confirmacao-financeiro");
                botaoModalAprovacao.addEventListener("click", ()=>{
                    atualizarModalAprovacao(venda.idVenda);
                });
                botaoEntrega.style.display = "none";
            } else if(role === 'VENDEDOR') {
                botaoModalAprovacao.style.display = "none";
                botaoEntrega.style.display = "none";
            }
        });
    } catch (error) {
        console.error('Erro ao carregar as vendas:', error);
    }
}

async function extraiDadosDaVendaDoModalDeAprovacao(){
    let textoId;
    if(role === 'ADMIN'){
        textoId = document.getElementById("aprovacao-gerente-titulo").innerHTML;
    } else if(role === 'FINANCEIRO') {
        textoId = document.getElementById("aprovacao-financeiro-titulo").innerHTML;
    } else {
        console.error("Role não reconhecido ou sem permissão.");
        return null;
    }

    let idVenda = parseInt(textoId.substring(19));

        try {
            const response = await fetch(`http://localhost:8080/venda/buscarVenda/${idVenda}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.ok){
                console.log('Houve um erro ao carregar as informacoes da venda para aprovacao');
                return null;
            } 

            return await response.json();

        } catch (error) {
            console.log("Houve um erro ao obter as informações da venda");
        }
}

async function extrairDadosDaVendaDoModalDeEntrega(){
    const textoId = document.getElementById("confirmacao-gerente-titulo-entrega").innerHTML;
    let id = textoId.substring(30).trim();
    
    try {
        const response = await fetch(`http://localhost:8080/venda/buscarVenda/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.ok){
            console.log('Houve um erro ao carregar as informacoes da venda para entrega');
            return null;
        } 

        return await response.json();

    } catch (error) {
        console.log("Houve um erro ao obter as informações da venda");
    }
}

document.addEventListener('DOMContentLoaded', carregarVendas);


document.querySelector('input[type="text"]').addEventListener('input', pesquisarVendas);


//Restringe a criacao de vendas para os vendedores
const botaoCriarVenda = document.getElementById("registrar-venda-btn");
if(role != 'VENDEDOR'){
    botaoCriarVenda.style.display = "none";
} else {
    botaoCriarVenda.addEventListener("click", ()=>{
        window.location.href = "./montagem.html";
    });
}

//Aprovacoes dos usuarios

async function atualizarVendaComAprovacao(bodyVenda) {
    if(role === 'FINANCEIRO'){
        bodyVenda.etapasConcluidas = 2;
    } else if (role === 'ADMIN'){
        bodyVenda.etapasConcluidas = 3;
    }
    console.table(bodyVenda)

    const jsonFinal = {
        "cliente": bodyVenda.cpfCliente,
        "idVeiculo": parseInt(bodyVenda.idVeiculo.idVeiculo),
        "valor": parseFloat(bodyVenda.valor),
        "veiculoUsado": bodyVenda.idVU,
        "etapasConcluidas": bodyVenda.etapasConcluidas
    }

    const endpointAtualizarVenda = `http://localhost:8080/venda/atualizarVenda/${bodyVenda.idVenda}`;

    try {
        const response = await fetch(endpointAtualizarVenda, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(jsonFinal)
        });

        if(response.ok){
            console.log("Venda aprovada com sucesso");
        } else {
            console.error("Erro ao aprovar a venda:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Não foi possível realizar a aprovação da venda");
    }
}

async function atualizarVendaEntrega(bodyVenda) {
    const jsonFinal = {
        "cliente": bodyVenda.cpfCliente,
        "idVeiculo": parseInt(bodyVenda.idVeiculo.idVeiculo),
        "valor": parseFloat(bodyVenda.valor),
        "veiculoUsado": bodyVenda.idVU,
        "etapasConcluidas": 4
    }

    const endpointAtualizarVenda = `http://localhost:8080/venda/atualizarVenda/${bodyVenda.idVenda}`;

    try {
        const response = await fetch(endpointAtualizarVenda, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(jsonFinal)
        });

        if(response.ok){
            console.log("Venda aprovada com sucesso");
        } else {
            console.error("Erro ao aprovar a venda:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Não foi possível realizar a aprovação da venda");
    }
}


async function emailNotaFiscal(venda){
    const emailCliente = venda.cpfCliente.email;

    const emailBody = {
        "destinatario": `${venda.cpfCliente.nome} ${venda.cpfCliente.sobrenome}`,
        "cpf": venda.cpfCliente.cpf,
        "endereco": `${venda.cpfCliente.rua} ${venda.cpfCliente.numero}`,
        "numeroNotaFiscal": "NF123456",
        "marcaVeiculo": venda.idVeiculo.marca,
        "modeloVeiculo": venda.idVeiculo.modelo,
        "anoVeiculo": venda.idVeiculo.ano,
        "placaVeiculo": venda.idVeiculo.placa,
        "chassiVeiculo": venda.idVeiculo.chassi,
        "valorVeiculo": parseFloat(venda.idVeiculo.venda),
        "formaPagamento": "à vista",
        "valorTotal": parseFloat(venda.valor)
    };

    const urlEmail = `http://localhost:8080/email/enviarNotaFiscal/${emailCliente}`;
    try {
        const response = await fetch(urlEmail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }, body: JSON.stringify(emailBody)
        });

        if(!response.ok){
            console.log("Houve um problema no disparo do email");
        }

    } catch (error) {
        console.error("Error occurred during email sending:", error.message);
    }
}

async function avisoDeEntrega(venda) {
    const emailCliente = venda.cpfCliente.email;

    const emailBody = {
        "subject": "Entrega do veículo",
        "body": `Seu ${venda.idVeiculo.marca} ${venda.idVeiculo.modelo} já está disponível para entrega! Venha buscá-lo assim que puder`
    };

    const urlEmail = `http://localhost:8080/email/emailSimples/${emailCliente}`;
    try {
        const response = await fetch(urlEmail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }, body: JSON.stringify(emailBody)
        });

        if(!response.ok){
            console.log("Houve um problema no disparo do email");
        }

    } catch (error) {
        console.error("Error occurred during email sending:", error.message);
    }
}

//Botoes dos modais de aprovacao
const botaoConfirmarGerente = document.getElementById("confirmacao-gerente");
const botaoConfirmarFinanceiro = document.getElementById("confirmacao-financeiro");
const botaoConfirmarEntrega = document.getElementById("confirmacao-entrega");

botaoConfirmarFinanceiro.addEventListener("click", async ()=> {
    let vendaBody = await extraiDadosDaVendaDoModalDeAprovacao();
    await emailNotaFiscal(vendaBody);
    await atualizarVendaComAprovacao(vendaBody);
    await carregarVendas();
});

botaoConfirmarGerente.addEventListener("click", async ()=> {
    let vendaBody = await extraiDadosDaVendaDoModalDeAprovacao();
    await avisoDeEntrega(vendaBody);
    await atualizarVendaComAprovacao(vendaBody);
    await carregarVendas();
});

botaoConfirmarEntrega.addEventListener("click", async () => {
    const vendaBody = await extrairDadosDaVendaDoModalDeEntrega();
    await avisoDeEntrega(vendaBody);
    await atualizarVendaEntrega(vendaBody);
    await carregarVendas();
});