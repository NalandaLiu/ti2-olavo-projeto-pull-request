import getCookie from "./cookies.js"

const token = getCookie('token');

//Parte para padronização dos meses
const MONTHS = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ'
];

function months(config) {
  let cfg = config || {};
  let count = cfg.count || 12;
  let section = cfg.section;
  let values = [];
  let i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

const labels = months({count: 12});

//Função que retorna array de vendas
async function retornaVendas() {
  try {
    const response = await fetch('http://localhost:8080/venda/listarVendas', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
    }
    });
    const data = await response.json();
    console.table(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

//Função que retorna o mes dado uma data

function extrairMesVenda(dateString) {
  const date = new Date(dateString);
  return date.getMonth() + 1;
}

const vendas = await retornaVendas();

async function retornaVeiculos(){
  try {
    const response = await fetch('http://localhost:8080/veiculo/listarVeiculos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
    }
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function calculaFaturamentoMensal() {
  const faturamentos = Array(12).fill(0);
  vendas.forEach(venda => {
    let mes = extrairMesVenda(venda.dataVenda) - 1;
    faturamentos[mes] += venda.valor;
  });
  console.table(faturamentos);
  return faturamentos;
}

const veiculos = await retornaVeiculos();

async function calculaRazaoVeiculos() {
  let vus = 0, novos = 0;
  veiculos.forEach(veiculo => {
    if(veiculo.estadoDoVeiculo == 'Novo'){
      novos++;
    } else if(veiculo.estadoDoVeiculo == 'Usado'){
      vus++;
    }
  });
  const data = [novos, vus]
  return data;
}


const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const vendasPorVendedor = document.getElementById('vendas-por-vendedor');

new Chart(vendasPorVendedor, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Média de vendas por vendedor',
      data: [2.3, 2.5, 1, 2, 2, 0, 3, 2, 3, 5],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const arrecadacaoMensalPorVendedor = document.getElementById('arrecadacao-mensal-por-vendedor');

new Chart(arrecadacaoMensalPorVendedor, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Valor médio arrecadado por vendedor',
      data: [45000, 19000, 30000, 50000, 23000, 0, 13000, 21000, 26000, 11000],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const faturamentoMensal = document.getElementById('faturamento-mensal');

new Chart(faturamentoMensal, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Faturamento',
      data: await calculaFaturamentoMensal(),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

//Tempo medio de permanencia dos veiculos na concessionaria num mes

const permanenciaVeiculos = document.getElementById('permanencia-veiculos');

new Chart(permanenciaVeiculos, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: '# de dias',
      data: [12, 19, 6, 10, 23, 21, 17, 20, 21, 12],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

//Razao entre carros usados e novos

const novoVu = document.getElementById('novo-vu');
const labelNovoVU = ['NOVO', 'VU']

new Chart(novoVu, {
  type: 'pie',
  data: {
    labels: labelNovoVU,
    datasets: [{
      label: '% de veículos em estoque',
      data: await calculaRazaoVeiculos(),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});