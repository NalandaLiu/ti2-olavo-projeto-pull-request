import getCookie from "./cookies.js";

const token = getCookie('token');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idVenda = parseInt(urlParams.get('id'));

async function puxaDadosDaVenda(){
    try {
        const response = await fetch(`http://localhost:8080/venda/buscarVenda/${idVenda}`, {
            method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
        });

        if(response.ok){
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.log("Houve um erro ao tentar recuperar os dados da venda de id " + idVenda);
    }
}

async function exibirDadosVenda() {
    const dados = await puxaDadosDaVenda();

    if(!dados){
        console.error("Dados da venda não encontrados.");
        return;
    }

    const etapasConcluidas = parseInt(dados.etapasConcluidas);
    const titulo = document.getElementById('vendaId');
    titulo.innerHTML = `Venda ${dados.idVenda}`

    const nome = document.getElementById('clienteNome');
    const placa = document.getElementById('veiculoPlaca');
    const vu = document.getElementById('Vu');
    const valorTotal = document.getElementById('valorTotal');
    const vendedor = document.getElementById('vendedorNome');
    const emplacamento = document.getElementById('emplacamentoNaLoja');
    const dataVenda = document.getElementById('data-venda');

    nome.innerHTML = `Cliente: ${dados.cpfCliente.nome} ${dados.cpfCliente.sobrenome}`;
    placa.innerHTML = `Veículo: ${dados.idVeiculo.placa}`;
    if(dados.idVU != null){
        vu.innerHTML = `Veículo usado: `;
    } else {
        vu.innerHTML = `Veículo usado: nenhum`;
    }
    
    valorTotal.innerHTML = `Valor total: ${dados.valor}`;
    if(dados.emplacamento){
        emplacamento.innerHTML = `Emplacamento na loja: Sim`;
    } else {
        emplacamento.innerHTML = `Emplacamento na loja: Não`;
    }
    dataVenda.innerHTML = `${dados.dataVenda}`;

    atualizarBarraProgresso(etapasConcluidas);
}

exibirDadosVenda();

document.addEventListener("DOMContentLoaded", function () {
    const addDocumentBtn = document.getElementById("addDocumentBtn");
    const uploadModal = new bootstrap.Modal(document.getElementById("uploadModal"));
    const saveButton = document.getElementById('saveDocumentButton');
    const fileInput = document.getElementById('fileInput');
    let currentStep;

    // Evento para abrir o modal ao clicar no botão de upload
    addDocumentBtn.addEventListener('click', function () {
        uploadModal.show();
    });

    // Função para enviar o arquivo via POST para o backend
    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('arquivo', file);

        try {
            const token = getCookie('token');
            const response = await fetch('/arquivos/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.text(); // A resposta do servidor
                console.log("Arquivo enviado com sucesso:", result);
                return true;
            } else {
                console.error("Erro ao enviar o arquivo:", response.statusText);
                return false;
            }
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            return false;
        }
    }

    // Evento para salvar o arquivo
    saveButton.addEventListener('click', async () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Faz o upload do arquivo
            const uploadSuccess = await uploadFile(file);

            if (uploadSuccess) {
                const date = new Date().toLocaleDateString();
                document.getElementById(`uploadDate${currentStep}`).textContent = date;
                uploadModal.hide();
                fileInput.value = ''; // Limpa o input de arquivo
            } else {
                alert('Erro ao enviar o arquivo. Tente novamente.');
            }
        } else {
            alert('Selecione um arquivo para upload');
        }
    });

    /*
    function carregarCardsVendas() {
        fetch('http://localhost:8080/arquivos/listarVendas', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                const cardContainer = document.getElementById('cardContainer');

                data.forEach(venda => {
                    // Criando dinamicamente os cards com os dados das vendas
                    const card = document.createElement('div');
                    card.classList.add('card', 'mb-3');

                    card.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">Venda #${venda.id}</h5>
                            <p class="card-text">Veículo: ${venda.veiculo.modelo}</p>
                            <p class="card-text">Cliente: ${venda.cliente.nome}</p>
                            <p class="card-text">Valor: R$ ${venda.valor}</p>
                            <a href="detalhes-venda.html?id=${venda.id}" class="btn btn-primary">Ver Detalhes</a>
                        </div>
                    `;

                    cardContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Erro ao listar as vendas:', error);
            });
    }*/

    async function buscarEVAtualizarBarraProgresso(vendaId, token) {
        try {
            // Realizando a requisição com o token de autenticação
            const response = await fetch(`http://localhost:8080/venda/buscarVenda/${vendaId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    
            // Verificando se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar venda');
            }
    
            // Obtendo os dados da venda
            const venda = await response.json();
    
            // Verificando se o valor de etapasConcluidas está presente no JSON
            if (venda.etapasConcluidas !== undefined) {
                // Atualizando a barra de progresso com base nas etapas concluídas
                atualizarBarraProgresso(venda.etapasConcluidas);
            } else {
                console.error('Etapas concluídas não encontradas na venda');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Houve um erro ao buscar os dados da venda. Tente novamente.');
        }
    }
    
    // Função para atualizar a barra de progresso
    function atualizarBarraProgresso(etapasConcluidas) {
        const progressSteps = document.querySelectorAll('.progress-step');
        
        const progressStepLabels = [
            "Aguardando criação do pedido",
            "Aguardando aprovação do financeiro",
            "Aguardando aprovação do gestor",
            "Aguardando entrega"
        ];
    
        const completedStepLabels = [
            "Pedido criado", 
            "Aprovado pelo financeiro", 
            "Aprovado pelo gestor", 
            "Pedido entregue"
        ];
    
        // Certifique-se de que etapasConcluidas é um número válido
        etapasConcluidas = parseInt(etapasConcluidas, 4);
    
        if (isNaN(etapasConcluidas) || etapasConcluidas < 0 || etapasConcluidas > progressSteps.length) {
            console.error("Número de etapas concluídas inválido:", etapasConcluidas);
            return;
        }
    
        // Atualiza as etapas com base no número de etapas concluídas
        progressSteps.forEach((step, index) => {
            const label = step.querySelector('label');
            
            if (index < etapasConcluidas) {
                step.classList.add('completed');
                label.innerHTML = completedStepLabels[index]; // Texto da etapa completa
                step.style.backgroundColor = '#ffbf00'; // Cor amarela para etapas completas
            } else if (index === etapasConcluidas) {
                label.innerHTML = progressStepLabels[index]; // Texto da etapa incompleta
                step.classList.remove('completed');
                step.style.backgroundColor = ''; // Sem cor para etapas incompletas
            } else {
                label.innerHTML = progressStepLabels[index]; // Texto da etapa incompleta
                step.classList.remove('completed');
                step.style.backgroundColor = ''; // Sem cor para etapas incompletas
            }
        });
    }
            
    // Função para preencher a tabela com os dados de upload
    function updateDocumentTable(documentType, fileName) {
        const currentDate = new Date().toLocaleString();
        switch (documentType) {
            case 'documentoPessoal':
                uploadDate1.textContent = `${fileName} - ${currentDate}`;
                break;
            case 'comprovanteDePagamento':
                uploadDate2.textContent = `${fileName} - ${currentDate}`;
                break;
            case 'contratoDeCompraVendaAssinado':
                uploadDate3.textContent = `${fileName} - ${currentDate}`;
                break;
            case 'confirmacaoDeEntrega':
                uploadDate4.textContent = `${fileName} - ${currentDate}`;
                break;
            default:
                alert("Tipo de documento inválido.");
        }
    }

    // Função para enviar o arquivo para o backend (Azure Blob Storage)
    async function uploadFileToServer(file, documentType, token) {
        const formData = new FormData();
        formData.append('arquivo', file);
        formData.append('documentType', documentType);
    
        try {
            // Fazendo a requisição POST para o backend com o token de autenticação
            const response = await fetch('http://localhost:8080/arquivos/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Erro ao enviar o arquivo. Tente novamente.');
            }
    
            const data = await response.json();
    
            if (data.success) {
                // Atualizar a tabela com o nome do arquivo e a data do upload
                updateDocumentTable(documentType, file.name);
                // Atualizar a barra de progresso conforme o upload
                atualizarBarraProgresso(data.etapasConcluidas);
            } else {
                alert("Erro ao enviar o arquivo. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro no upload:", error);
            alert("Ocorreu um erro no upload do arquivo.");
        }
    }
        

    // Evento para o botão "Salvar" no modal
    document.getElementById('saveDocumentButton').addEventListener('click', function () {
        const file = document.getElementById('fileInput').files[0];
        const documentType = document.getElementById('documentTypeSelect').value;

        if (!file) {
            alert("Por favor, selecione um arquivo para upload.");
            return;
        }

        // Envia o arquivo para o servidor para ser processado e armazenado no Azure Blob Storage
        uploadFileToServer(file, documentType);

        // Fecha o modal após o "upload"
        const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
        uploadModal.hide();
        
        // Limpa o input de arquivo e a seleção do tipo de documento
        document.getElementById('fileInput').value = '';
        document.getElementById('documentTypeSelect').selectedIndex = 0;
    });

});
