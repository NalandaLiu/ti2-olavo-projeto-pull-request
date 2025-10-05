import initRouter from "./router";

function renderCrudVeiculos() {
    window.location.href = "../pages/veiculos.html";
}

function renderPerfil() {
    window.location.href = "../pages/veiculos/perfil.html";
}

function renderMenuVendas() {
    window.location.href = "../pages/vendas/menu-vendas/menu-vendas.html";
}

function renderDetalheVendas() {
    window.location.href = "../pages/vendas/detalhamento-vendas/detalhes-vendas.html"
}

function renderRegistroCliente() {
    window.location.href = "../pages/dados-cliente.html";
}

function renderMontagemVeiculo() {
    window.location.href = "../pages/montagem-veiculos/montagem.html"
}

function renderAtribuicaoDeValor() {
    window.location.href = "../pages/atribuicao-venda.html";
}

function renderPagamento() {
    window.location.href = "../pages/pagamento/pagamento.html";
}


const routes = {
    "/": renderCrudVeiculos,
    "/perfil": renderPerfil,
    "/veiculos": renderCrudVeiculos,
    "/vendas": renderMenuVendas,
    "/venda-detalhes": renderDetalheVendas,
    "/dados-cliente": renderRegistroCliente,
    "/montagem-veiculo": renderMontagemVeiculo,
    "/atribuicao-de-valor": renderAtribuicaoDeValor,
    "/pagamento": renderPagamento
}

initRouter(routes);
