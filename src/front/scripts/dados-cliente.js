const cpf = document.getElementById("cpf");
const nome = document.getElementById("nome");
const sobrenome = document.getElementById("sobrenome");
const rg = document.getElementById("rg");
const email = document.getElementById("email");
const celular = document.getElementById("celular");
const dataDeNascimento = document.getElementById("dataDeNascimento");
const cep = document.getElementById("cep");
const estado = document.getElementById("estado");
const rua = document.getElementById("rua");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const numero = document.getElementById("numero");

const backBtn = document.getElementById("voltar-btn");
const proceedBtn = document.getElementById("proceed-btn");


//Valida os campos com dados do cliente
function validaCampos() {
    const errorMessage = document.getElementById("errorMessage");
    let isValid = true;
    let mensagensErro = [];

    const campos = [
        { campo: cpf, valida: valor => /^[0-9]{11}$/.test(valor.replace(/\D/g, "")), mensagem: "CPF deve ter 11 dígitos" }, //explicação da função: https://chatgpt.com/share/67426bdc-f0e4-8005-af45-199c08703ed9
        { campo: rg, valida: valor => /^[0-9]{9}$/.test(valor.replace(/\D/g, "")), mensagem: "RG deve ter 9 dígitos" },
        { campo: celular, valida: valor => /^[0-9]{11}$/.test(valor.replace(/\D/g, "")), mensagem: "Celular deve ter 11 dígitos" },
        { campo: cep, valida: valor => /^[0-9]{8}$/.test(valor.replace(/\D/g, "")), mensagem: "CEP deve ter 8 dígitos" },
        { campo: email, valida: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor), mensagem: "E-mail deve ter um formato válido" },
        { campo: nome, valida: valor => valor.trim() !== "", mensagem: "Nome é obrigatório" },
        { campo: sobrenome, valida: valor => valor.trim() !== "", mensagem: "Sobrenome é obrigatório" },
        { campo: dataDeNascimento, valida: valor => valor.trim() !== "", mensagem: "Data de nascimento é obrigatória" },
        { campo: estado, valida: valor => valor.trim() !== "", mensagem: "Estado é obrigatório" },
        { campo: rua, valida: valor => valor.trim() !== "", mensagem: "Rua é obrigatória" },
        { campo: cidade, valida: valor => valor.trim() !== "", mensagem: "Cidade é obrigatória" },
        { campo: bairro, valida: valor => valor.trim() !== "", mensagem: "Bairro é obrigatório" },
        { campo: numero, valida: valor => valor.trim() !== "", mensagem: "Número é obrigatório" }
    ];

    campos.forEach(({ campo, valida, mensagem }) => {
        const valor = campo.value.trim();

        if (!valida(valor)) {
            campo.style.border = "2px solid red"; // Borda vermelha para erro
            isValid = false;
            mensagensErro.push(mensagem); // Adiciona a mensagem correspondente à lista
        } else {
            campo.style.border = "2px solid #ced4da"; // Restaura borda padrão
        }
    });

    if (!isValid) {
        errorMessage.innerHTML = mensagensErro.join("<br>"); // Exibe todas as mensagens de erro
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
    }

    return isValid;
}

function aplicarMascara(input, mascara) {
    input.addEventListener("input", function () {
        let valor = input.value.replace(/\D/g, ""); // Remove tudo que não é número
        let valorComMascara = "";
        let index = 0;
        for (let i = 0; i < mascara.length && index < valor.length; i++) {
            if (mascara[i] === "#") {
                valorComMascara += valor[index++];
            } else {
                valorComMascara += mascara[i];
            }
        }
        input.value = valorComMascara;
    });
}

const camposMascarados = [
    { id: "cpf", mascara: "###.###.###-##" },
    { id: "rg", mascara: "##.###.###-#" },
    { id: "celular", mascara: "(##) ######-####" },
    { id: "cep", mascara: "#####-###" },
];

camposMascarados.forEach(campo => {
    const input = document.getElementById(campo.id);
    if (input) {
        aplicarMascara(input, campo.mascara);
    }
});

function limparCampos() {
    if (nome) nome.value = "";
    if (sobrenome) sobrenome.value = "";
    if (cpf) cpf.value = "";
    if (rg) rg.value = "";
    if (email) email.value = "";
    if (celular) celular.value = "";
    if (dataDeNascimento) dataDeNascimento.value = "";
    if (cep) cep.value = "";
    if (estado) estado.value = "";
    if (rua) rua.value = "";
    if (cidade) cidade.value = "";
    if (bairro) bairro.value = "";
    if (numero) numero.value = "";
}


    const consultaCepCliente = async() => {
        const cepConsulta = cep.value

        try{
            const res = await fetch("https://viacep.com.br/ws/" + cepConsulta + "/json/")
            const data = await res.json();

            if (!res.ok) {
                console.error("Erro na requisição: ", data.description); //erro na minha parte, pode ser erro na url do fetch ou coisa similar
                return;
            }

            rua.value = data.logradouro || "";
            bairro.value = data.bairro || "";
            cidade.value = data.localidade || "";
            estado.value = data.estado || "";

            rua.disabled = true;
            bairro.disabled = true;
            cidade.disabled = true;
            estado.disabled = true;

            return data;
        } catch (error){
            console.error("Erro ao tentar salvar as informações do cliente:", error); //erro na requisição, erro 500 por exemplo, na parte deles
        }
    };

    cep.addEventListener("blur", consultaCepCliente);

    const salvarInformacoesCliente = () => {
        const dadosValidos = validaCampos();
        
        if (!dadosValidos) {
            console.error("Por favor, preencha todos os campos obrigatórios.");
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        
        const params = new URLSearchParams(window.location.search);
        const carId = params.get("id");
        
        if (!carId) {
            console.error("ID do veículo não encontrado.");
            alert("ID do veículo não encontrado.");
            return;
        }
        
        //Salva o ID do carro no localStorage
        localStorage.setItem('carId', carId); 
    
        const cliente = {
            nome: nome.value.trim(),
            sobrenome: sobrenome.value.trim(),
            cpf: cpf.value.trim().replace(/\D/g, ''),
            rg: rg.value.trim().replace(/\D/g, ''),
            email: email.value.trim(),
            celular: celular.value.trim().replace(/\D/g, ''),
            dataDeNascimento: dataDeNascimento.value.trim(),
            cep: cep.value.trim().replace(/\D/g, ''),
            estado: estado.value.trim(),
            rua: rua.value.trim(),
            cidade: cidade.value.trim(),
            bairro: bairro.value.trim(),
            numero: numero.value.trim() 
        };
    
        localStorage.setItem('cliente', JSON.stringify(cliente));
    
        window.location.href = "atribuicao-valor.html"; 
    };
    
    //Remove informacoes do cliente do localStorage caso o vendedor retorne a tela de montagem
    backBtn.addEventListener("click", ()=>{
        localStorage.removeItem("carId");
    });
    
    proceedBtn.addEventListener("click", salvarInformacoesCliente);