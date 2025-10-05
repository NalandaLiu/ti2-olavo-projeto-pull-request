import getCookie from "./cookies.js";

/*
 * Scripts da tabela de funcionários
 * Exclusivo do gerente
 */

const tabela = document.getElementById("tabela-funcionarios");
const endpointListarEmpregados = "http://localhost:8080/funcionario/listarFuncionarios";
let empregadosJSON = [];

// Função que recebe a matrícula e demite o funcionário
async function deletarFuncionario(id) {
    try {
        const token = getCookie('token');
        const url = `http://localhost:8080/funcionario/demitirFuncionario/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.log(`Houve um erro ao demitir o funcionário de matrícula: ${id}. Status code: ${await response.status}`);
        }

        const responseBody = await response.json();
        console.log(responseBody);
    } catch (error) {
        console.log(error);
    }
}

// Função para atualizar o modal antes de demitir
function atualizarModalDemissao(nome, matricula) {
    const bodyTexto = document.getElementById("modal-demissao-texto");
    bodyTexto.innerHTML = `Você tem certeza de que deseja demitir o(a) funcionário(a) ${nome}, de matrícula ${matricula}? Esta ação não poderá ser desfeita.`;

    const botaoConfirmar = document.getElementById("confirmar-delecao");
    const botaoNovo = botaoConfirmar.cloneNode(true);
    botaoConfirmar.parentNode.replaceChild(botaoNovo, botaoConfirmar);

    botaoNovo.addEventListener("click", () => {
        deletarFuncionario(matricula).then(() => exibirFuncionarios());
    });
}

// Função para exibir funcionários
async function exibirFuncionarios() {
    try {
        const token = getCookie('token');
        const empregados = await fetch(endpointListarEmpregados, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!empregados.ok) {
            throw new Error(`Erro ${empregados.status} ao tentar dar fetch`);
        }

        empregadosJSON = await empregados.json();

        tabela.innerHTML = ""; // Limpar tabela antes de renderizar
        empregadosJSON.forEach(empregado => {
            tabela.innerHTML +=
                `<tr class="table-row">
                <td class="table-row-item">${empregado.matricula}</td>
                <td class="table-row-item">${empregado.nome}</td>
                <td class="table-row-item">${empregado.cpf}</td>
                <td class="table-row-item">${empregado.tipo}</td>
                <td class="table-row-item">${empregado.salario}</td>
                <td class="table-row-item">
                    <button class="btn control-button" 
                            data-bs-toggle="modal" 
                            data-bs-target="#modal-demissao" 
                            onclick="atualizarModalDemissao('${empregado.nome}', ${empregado.matricula})">
                        Demitir
                    </button>
                </td>
            </tr>`;
        });
    } catch (error) {
        console.log(error);
    }
}

// Capturar token e preencher informações no campo `#role`
const token = getCookie('token');
if (token) {
    try {
        const payload = decodeJWT(token);
        console.log('Payload decodificado:', payload);

        const email = payload.sub;
        document.getElementById('user-id').textContent = `User: ${email}`;
        document.getElementById('email').value = email;

        const role = payload.role; // Obtendo role do payload
        document.getElementById('role').value = role; // Preenchendo o campo no HTML com a role
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
    }
} else {
    console.error('Token não encontrado nos cookies');
}

exibirFuncionarios();
