import getCookie from "./cookies.js";
import {cadastrarVeiculo} from "./veiculos.js";

const token = getCookie('token');


//btn limpar do modal
document.getElementById('btnLimpar').addEventListener('click', function () {
    document.getElementById('formAddVeiculo').reset();
});

$(document).ready(function() {
    // Máscaras para chassi e placa
    $('#chassi').mask('AAAAAAAAAAAAAAA'); // 17 caracteres
    $('#placa').mask('AAA0A00'); // Ex: ABC1D23
    $('#ano').mask('0000');
    // Máscara para preço com o padrão do Real Brasileiro
    $('#preco').mask('000000000000000000', {reverse: true}); // Ex: 1.234,56
    $('#quilometragem').mask('00000000000000000000000000000');
    // Lógica para formatação do preço
    /* $('#preco').on('input', function() {
        formatarPreco(this);
    });*/

    $('#btnCadastrar').on('click', function() {
        var ano = $('#ano').val();
        var chassi = $('#chassi').val();
        var estadoDoVeiculo = $('#estadoDoVeiculo').val();
        var cor = $('#cor').val();
        var placa = $('#placa').val();
        var marca = $('#marca').val();
        var modelo = $('#modelo').val();
        var preco = $('#preco').val();/*.replace('R$ ', '').replace('.', '').replace(',', '.');*/ 
        var quilometragem = $('#quilometragem').val();
        // Formata o preço para envio
        var imagem = $('#imagem').val();
        var errorMessage = $('#errorMessage');

        // Limpar mensagem de erro anterior
        errorMessage.hide().text('');

        // Validação dos campos
        if (!ano || !chassi ||!estadoDoVeiculo || !cor || !placa || !marca  || !modelo || !preco || !quilometragem  /*|| !imagem*/) {
            errorMessage.text('Por favor, preencha todos os campos obrigatórios.').show();
            return;
        }

        /*// Verifique se uma imagem foi selecionada
        if (!$('#imagem')[0].files.length) {
            errorMessage.text('Por favor, selecione uma imagem.').show();
            return;
        }*/
        cadastrarVeiculo({
            ano: ano,
            chassi: chassi,
            estadoDoVeiculo: estadoDoVeiculo,
            cor: cor,
            placa: placa,
            marca: marca,
            modelo: modelo,
            preco: preco,
            quilometragem: quilometragem
        });
    });

    $('#btnLimpar').on('click', function() {
        $('#formAddVeiculo')[0].reset();
        $('#errorMessage').hide();
    });

    $('#btnSalvarDetalhes').hide();
    $('#btnCancelarDetalhes').hide();

    // Editar veículo
    $('#btnEditarDetalhes').click(function () {
        $('#btnExcluirDetalhes').hide();
        $('#btnCancelarDetalhes').show();
        $('#btnEditarDetalhes').hide();
        $('#btnSalvarDetalhes').show();

        habilitarInputs();
    });

    // Cancelar edição
    $('#btnCancelarDetalhes').click(function () {
        $('#btnExcluirDetalhes').show();
        $('#btnCancelarDetalhes').hide();
        $('#btnEditarDetalhes').show();
        $('#btnSalvarDetalhes').hide();

        desabilitarInputs();
    });

    $('#btnExcluirVeiculo, #btnCancelarVeiculo, #btnSalvarVeiculo').click(function() {
        desabilitarInputs();
    });

    $('#btnConfimarcaoExcluirDetalhes').on('click', async function(){
        var modalChassi = $('#modalChassi').val();

        await apagarVeiculo(modalChassi);
        fecharModalEDarReload();
    });
    
    $('#btnSalvarDetalhes').on('click', function(){
        var modalAno = $('#modalAno').val();
        var modalChassi = $('#modalChassi').val();
        var modalEstado = $('#modalEstado').val();
        var modalCor = $('#modalCor').val();
        var modalPlaca = $('#modalPlaca').val();
        var modalMarca = $('#modalMarca').val();
        var modalModelo = $('#modalModelo').val();
        var modalPreco = $('#modalPreco').val();
        var modalQuilometragem = $('#modalQuilometragem').val();
        var modalDisponivel = $('#modalDisponivel').val();

        if (!modalAno || !modalChassi || !modalEstado || !modalCor || !modalPlaca || !modalMarca 
            || !modalModelo || !modalPreco ||!modalQuilometragem || !modalDisponivel) {
            errorMessage.text('Por favor, preencha todos os campos obrigatórios.').show();
            return;
        };
        
        editarVeiculo({
            ano: modalAno,
            chassi: modalChassi,
            estadoDoVeiculo: modalEstado,
            cor: modalCor,
            placa: modalPlaca,
            marca: modalMarca,
            modelo: modalModelo,
            preco: modalPreco,
            quilometragem: modalQuilometragem
        });

        fecharModalEDarReload();
        
        // Voltar ao estado inicial após salvar
        $('#btnExcluirDetalhes').show();
        $('#btnCancelarDetalhes').hide();
        $('#btnEditarDetalhes').show();
        $('#btnSalvarDetalhes').hide();

        desabilitarInputs();
    });
    
    $('#btnConfirmarExclusao').click(function () {
        const modalChassi = $('#modalChassi').val();
        apagarVeiculo(modalChassi);
    });

});

/*
// Função para formatar o preço (ajuste conforme necessário)
function formatarPreco(element) {
    // Implementar formatação conforme necessário, se ainda não feito
    // Exemplo simples:
    var value = element.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    element.value = (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
*/

