import getCookie from "./cookies.js";

window.showCarDetails = showCarDetails;

let carsToDisplay = [];
let filtredCarsToDisplay = [];

function displayCars(availableCars) {
    const carContainer = document.getElementById("carContainer");
    carContainer.innerHTML = ""; 
    carsToDisplay = availableCars; 
    availableCars.forEach((car, index) => {
        
        const carElement = document.createElement("div");
        carElement.className = "car";
        carElement.innerHTML = `
        <p>${car.marca} ${car.modelo}</p>
        <p>Ano: ${car.ano}</p>
        <p>Cor: ${car.cor}</p>
        <button onclick="showCarDetails(${index})" class="btn control-button">Detalhes</button>
        <a href="./dados-cliente.html?id=${car.IdVeiculo}" class="btn control-button">Vender</a>`;
        carContainer.appendChild(carElement);
    });
}

function displayFiltredCars(filteredCars) {
    const carContainer = document.getElementById("carContainer");
    carContainer.innerHTML = ""; 
    filtredCarsToDisplay = filteredCars; 
    filteredCars.forEach((car, index) => {
        
        const carElement = document.createElement("div");
        carElement.className = "car";
        carElement.innerHTML = `
        <p>${car.marca} ${car.modelo}</p>
        <p>Ano: ${car.ano}</p>
        <p>Cor: ${car.cor}</p>
        <button onclick="showCarDetails(${index})" class="btn control-button">Detalhes</button>
        <a href="./dados-cliente.html?id=${car.IdVeiculo}" class="btn control-button">Vender</a>`;
        carContainer.appendChild(carElement);
    });
}


function showCarDetails(index) {
    const car = carsToDisplay[index];
    document.getElementById("detailMarca").innerText = car.marca;
    document.getElementById("detailModelo").innerText = car.modelo;
    document.getElementById("detailEstado").innerText = car.estadoDoVeiculo;
    document.getElementById("detailAno").innerText = car.ano;
    document.getElementById("detailQuilometragem").innerText = car.quilometragem;
    document.getElementById("detailCor").innerText = car.cor;
    document.getElementById("carDetailsModal").style.display = "block";
}

async function fetchCars() {
    try {
        const token = getCookie('token');
        const response = await fetch('http://localhost:8080/veiculo/listarVeiculos', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error('Houve um erro ao tentar listar os veiculos');
        }
        const cars = await response.json();

        const availableCars = cars.filter(car => car.disponivel === true);

        displayCars(availableCars);
        
    } catch (error) {
        console.error('Houve um problema com a requisição Fetch:', error);
    }
}

fetchCars();

document.getElementById("closeModalButton").addEventListener("click", closeModal);

function closeModal() {
    document.getElementById("carDetailsModal").style.display = "none";
}

const searchButton = document.getElementById('searchButton');
const aplicarFiltro = document.querySelector(".control-button.btn.aplicarFiltro");
const cancelarFiltro = document.querySelector(".control-button.btn.cancelarFiltro");
const filterPanel = document.getElementById('filterPanel');

searchButton.addEventListener('click', () => {

    if (filterPanel.style.display === 'none' || filterPanel.style.display === '') {
        filterPanel.style.display = 'block';
    } else {
        filterPanel.style.display = 'none';
    }
});

aplicarFiltro.addEventListener('click', () => {

    const marca = document.getElementById('marca').value.toLowerCase();
    const modelo = document.getElementById('modeloInput').value.toLowerCase();
    const estadoDoVeiculo = document.getElementById('estadoInput').value.toLowerCase();
    const ano = document.getElementById('anoInput').value.toLowerCase();
    const quilometragem = document.getElementById('quilometragemInput').value.toLowerCase();
    const cor = document.getElementById('cor').value.toLowerCase();
        
    const filteredCars = carsToDisplay.filter(car =>
        (!marca || car.marca.toLowerCase() === marca) &&
        (!modelo || car.modelo.toLowerCase() === modelo) &&
        (!estadoDoVeiculo || car.estadoDoVeiculo.toLowerCase() === estadoDoVeiculo) &&
        (!ano || car.ano.toString() === ano) && // Comparação como string
        (!quilometragem || parseInt(car.quilometragem) <= parseInt(quilometragem)) &&
        (!cor || car.cor.toLowerCase() === cor)
    );

    
    if (filteredCars.length > 0) {
        document.getElementById("errorMessage").style.display = "none";
        displayFiltredCars(filteredCars);
    } else {
        // Obtendo o nome da marca ou um texto genérico se a marca não foi selecionada
        const marcaProcurada = marca ? marca.charAt(0).toUpperCase() + marca.slice(1) : "qualquer marca";
    
        showNotification(`<p>Não foi encontrado nenhum veículo da marca ${marcaProcurada} com as especificações fornecidas</p>
        <h2>Aqui estão algumas recomendações</h2>
        <div class="recommendations" id="recommendations"></div>`);
        displayCars(carsToDisplay);
    }
});

function showNotification(message) {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.style.display = "block";
    errorMessageElement.innerHTML = `<p>${message}</p>`;
}

cancelarFiltro.addEventListener("click", () => {
    filterPanel.style.display = "none";
});
