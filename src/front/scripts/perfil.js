import getCookie, {clearCookie, decodeJWT} from "./cookies.js";


const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", ()=>{
    clearCookie('token');
    window.location.href = "../pages/index.html";
});


const tabela = document.getElementById("tabela-funcionarios");
const endpointListarEmpregados = "http://localhost:8080/funcionario/listarFuncionarios";
let empregadosJSON = [];


//Funcao que recebe a matricula e demite o funcionario
async function deletarFuncionario(id) {
    try {
        const token = getCookie('token');
        const url = `http://localhost:8080/funcionario/demitirFuncionario/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            console.log(`Houve um erro ao demitir o funcionário de matrícula: ${id}. Status code: ${await response.status}`);
        }

        const responseBody = await response.json();
        console.log(responseBody);

    } catch (error) {
        console.log(Error);
    }
}


//Funcao para renderizar os dados do 
function atualizarModalDemissao(id) {
    const bodyTexto = document.getElementById("modal-demissao-texto");
    bodyTexto.innerHTML = `Você tem certeza de que deseja demitir o(a) funcionário(a) ${nome}, de matrícula ${matricula}? Esta ação não poderá ser desfeita.`;

    const botaoConfirmar = document.getElementById("confirmar-delecao");

    const botaoNovo = botaoConfirmar.cloneNode(true);
    botaoConfirmar.parentNode.replaceChild(botaoNovo, botaoConfirmar);

    botaoNovo.addEventListener("click", () => {
        deletarFuncionario(matricula)
            .then(() => {
                exibirFuncionarios();
            });

    });
}

async function exibirFuncionarios() {
    try {
        const token = getCookie('token');
        const empregados = await fetch(endpointListarEmpregados, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!empregados.ok) {
            throw new Error(`Erro ${empregados.status} ao tentar dar fetch `);
        }

        empregadosJSON = await empregados.json();

        console.log(empregadosJSON);

        empregadosJSON.forEach(empregado => {
            console.table(empregado);
            tabela.innerHTML +=
                `<tr class="table-row">
                <td class="table-row-item" id="user-cpf-${empregado.cpf}">${empregado.cpf}</td>
                <td class="table-row-item" id="user-nome-${empregado.matricula}">${empregado.nome}</td>
                <td class="table-row-item" id="user-cpf-${empregado.matricula}">${empregado.cpf}</td>
                <td class="table-row-item" id="user-cargo-${empregado.matricula}">${empregado.tipo}</td>
                <td class="table-row-item" id="user-salario-${empregado.matricula}">${empregado.salario}</td>
                <td class="table-row-item"><button class="btn control-button" data-bs-toggle="modal" data-bs-target="#modal-demissao" onclick="atualizarModalDemissao('${empregado.nome}', ${parseInt(empregado.matricula)})">Demitir</button></td>
            </tr>`;
        });
        

    } catch (error) {
        console.log(error)
    }
}


//Criacao de funcionario
document.getElementById("confirmar-criacao").addEventListener("click", async () => {
    const nome = document.getElementById("input-nome-funcionario").value;
    const sobrenome = document.getElementById("input-sobrenome-funcionario").value;
    const cpf = document.getElementById("input-cpf-funcionario").value;
    const cargo = document.getElementById("cargo").value;
    const salario = parsetFloat(document.getElementById("input-salario-funcionario").value);
    const email = `${nome}${sobrenome}@gmail.com`;

    const urlUser = "http://localhost:8080/auth/register"
    const urlFuncionario = "http://localhost:8080/funcionario/registrarFuncionario"
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                "cpf": cpf,
                "nome": nome,
                "email": email,
                "sobrenome": sobrenome,
                "password": "1234",
                "salario": salario,
                "tipo": cargo
            }
        });
    } catch (error) {
        console.log(error);
    }
});

let userRole;

const token = getCookie('token');
if (token) {
    try {
        
        const payload = decodeJWT(token);
        console.table(payload);
        console.log('Payload decodificado:', payload);

       
        const email = payload.sub; 
        userRole = payload.role;
        
        document.getElementById('user-id').textContent = `User: ${email}`;
        document.getElementById('email').value = email;
        document.getElementById('name');
        document.getElementById('surname');
        document.getElementById('cpf');
        const cargo = document.getElementById('role');
        if(userRole == 'ADMIN'){
            cargo.value = 'Gerente';
        } else if(userRole == 'FINANCEIRO'){
            cargo.value = 'Financeiro'
        } else if(userRole == 'VENDEDOR'){
            cargo.value = 'Vendedor';
        }
        document.getElementById('salary');

    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
    }
} else {
    console.error('Token não encontrado nos cookies');
}


const botaoAdicionarFunc = document.getElementById("add-funcionario");
const tabelaFuncionarios = document.getElementById("tabela-funcionarios-section");
if(userRole != 'ADMIN'){
    botaoAdicionarFunc.style.display = "none";
    tabelaFuncionarios.style.display = "none";
}

exibirFuncionarios();

