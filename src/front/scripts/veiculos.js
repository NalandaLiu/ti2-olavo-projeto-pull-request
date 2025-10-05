import getCookie, {decodeJWT} from "./cookies.js";

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

//Remove o botao de criar veiculos para os funcionarios do setor financeiro
if(role == 'FINANCEIRO'){
    document.getElementById("btn-add-veiculo").style.display = "none";
}

async function listarVeiculos() {
    try {
        const token = getCookie('token');
        const response = await fetch('http://localhost:8080/veiculo/listarVeiculos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const veiculos = await response.json(); 

        veiculos.reverse(); 

        return veiculos;
    } catch (error) {
        console.error('Erro ao listar veículos:', error);
        return [];
    }
}

export function habilitarInputs() {
    $('input[type="text"], input[type="number"]').prop('readonly', false);
}

export function desabilitarInputs() {
    $('input[type="text"], input[type="number"]').prop('readonly', true);
}

window.habilitarInputs = habilitarInputs;
window.desabilitarInputs = desabilitarInputs;

export function atualizarModal(chassi, estadoDoVeiculo, ano, cor, preco, placa, marca, quilometragem, modelo) {
    document.getElementById('modalChassi').value = chassi;
    document.getElementById('modalEstado').value = estadoDoVeiculo;
    document.getElementById('modalAno').value = ano;
    document.getElementById('modalCor').value = cor;
    document.getElementById('modalPreco').value = preco;
    document.getElementById('modalPlaca').value = placa;
    document.getElementById('modalMarca').value = marca;
    document.getElementById('modalQuilometragem').value = quilometragem;
    document.getElementById('modalModelo').value = modelo;
    document.getElementById('modalTitulo').innerText = `${marca} ${modelo} ${ano}`; // Atualiza o título
}

window.atualizarModal = atualizarModal;

async function renderizarVeiculos(veiculos) {
    const cardbox = document.querySelector('.cardbox');
    cardbox.innerHTML = '';

    veiculos.forEach(veiculo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '16rem';

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
                <h6 class="card-text">Preço: ${veiculo.preco}</h6>
                <p class="card-text">Cor: ${veiculo.cor}</p>
                <p class="card-text">Disponivel: ${veiculo.disponivel}</p>
                <button type="button" class="btn control-button" data-bs-toggle="modal" data-bs-target="#modalDetalhes" 
                        onclick="atualizarModal('${veiculo.chassi}', '${veiculo.estadoDoVeiculo}', ${veiculo.ano}, '${veiculo.cor}', '${veiculo.preco}', '${veiculo.placa}', '${veiculo.marca}', ${veiculo.quilometragem}, '${veiculo.modelo}')">
                    Detalhes
                </button>
            </div>
        `;

        cardbox.appendChild(card);
    });
}

function verificaFaixaPreco(preco, faixaPreco) {
    const precoNumerico = parseFloat(preco.replace('R$', '').replace('.', '').replace(',', '.'));

    if (faixaPreco === 'Até R$50.000') return precoNumerico <= 50000;
    if (faixaPreco === 'R$50.000 - R$100.000') return precoNumerico > 50000 && precoNumerico <= 100000;
    if (faixaPreco === 'Acima de R$100.000') return precoNumerico > 100000;

    return true;
}

async function aplicarFiltros() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const marcaSelecionada = document.getElementById('dropdownMarca').getAttribute('data-selected') || '';
    const precoSelecionado = document.getElementById('dropdownPreco').getAttribute('data-selected') || '';
    const anoSelecionado = document.getElementById('dropdownAno').getAttribute('data-selected') || '';
    const corSelecionada = document.getElementById('dropdownCor').getAttribute('data-selected') || '';

    const veiculos = await listarVeiculos();

    const veiculosFiltrados = veiculos.filter(veiculo => {
        const matchSearch = veiculo.marca.toLowerCase().includes(searchInput) || veiculo.modelo.toLowerCase().includes(searchInput);
        const matchMarca = !marcaSelecionada || veiculo.marca === marcaSelecionada;
        const matchPreco = !precoSelecionado || verificaFaixaPreco(veiculo.preco, precoSelecionado);
        const matchAno = !anoSelecionado || veiculo.ano.toString() === anoSelecionado;
        const matchCor = !corSelecionada || veiculo.cor === corSelecionada;

        return matchSearch && matchMarca && matchPreco && matchAno && matchCor;
    });

    renderizarVeiculos(veiculosFiltrados);
}

document.getElementById("limparFiltro").addEventListener("click", async function () {
    // Limpar barra de pesquisa
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    // Resetar os filtros dos dropdowns para seus respectivos nomes
    const dropdowns = [
        { id: 'dropdownMarca', texto: 'Marca' },
        { id: 'dropdownPreco', texto: 'Preço' },
        { id: 'dropdownAno', texto: 'Ano' },
        { id: 'dropdownCor', texto: 'Cor' }
    ];

    dropdowns.forEach(dropdown => {
        const button = document.getElementById(dropdown.id);
        if (button) {
            button.setAttribute('data-selected', ''); // Remove o valor selecionado
            button.textContent = dropdown.texto; // Restaura o texto original
        }
    });

    // Recarregar todos os veículos
    const veiculos = await listarVeiculos();
    renderizarVeiculos(veiculos);

    console.log("Filtros limpos e botões resetados para os nomes originais!");
});




// Adiciona eventos de seleção para cada filtro
document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();

        const dropdown = event.target.closest('.dropdown');
        const button = dropdown.querySelector('.dropdown-toggle');
        const selectedValue = event.target.getAttribute('data-value');

        button.setAttribute('data-selected', selectedValue);
        button.textContent = selectedValue;

        aplicarFiltros(); // Reaplica os filtros ao selecionar uma nova opção
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    const veiculos = await listarVeiculos();
    renderizarVeiculos(veiculos);

    // Evento para a barra de pesquisa
    document.getElementById('searchInput').addEventListener('input', aplicarFiltros);
});

// Chama a função para listar veículos ao carregar a página
window.onload = listarVeiculos;



export async function cadastrarVeiculo(dadosVeiculo) {
    try {
        const token = getCookie('token');
        const response = await fetch('http://localhost:8080/veiculo/adicionarVeiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dadosVeiculo)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar veículo');
        }

        alert('Veículo cadastrado com sucesso!');
        $('#formAddVeiculo')[0].reset(); 
        var myModal = bootstrap.Modal.getInstance(document.getElementById('modalAddVeiculo'));
        myModal.hide();

       
        const veiculos = await listarVeiculos();
        renderizarVeiculos(veiculos);
    } catch (error) {
        console.error('Erro:', error);
        $('#errorMessage').text('Erro ao cadastrar o veículo. Tente novamente.').show();
    }
};

window.cadastrarVeiculo = cadastrarVeiculo;


export async function apagarVeiculo(modalChassi) {
    try {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:8080/veiculo/deletarVeiculo/${modalChassi}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o veículo: ${response.statusText}`);
        }

        console.log('Veículo excluído com sucesso!');

        
        const veiculos = await listarVeiculos();
        renderizarVeiculos(veiculos);

    } catch (error) {
        console.error('Erro ao apagar veículo:', error);
    }
}

window.apagarVeiculo = apagarVeiculo


export async function editarVeiculo(dadosVeiculo){
    try {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:8080/veiculo/atualizarVeiculo/${dadosVeiculo.chassi}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dadosVeiculo)
        });

        if(!response.ok){
            throw new Error(`Erro ao atualizar o veículo: ${response.statusText}`);
        }

        console.log('Veículo atualizado com sucesso!');

        listarVeiculos();

    } catch (error) {
        console.error('Erro ao editar veículo:', error);
    }
}

window.editarVeiculo = editarVeiculo;
