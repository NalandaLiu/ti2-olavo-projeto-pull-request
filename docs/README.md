# MasterCar Concessionária

**Gabriel Marcondes Starling Rocha, gabrielmsrocha@gmail.com**

**Gabriel Nogueira Vieira Resende, gabrielnvresende@gmail.com**

**Guilherme Henrique da Silveira, ghsilveira@sga.pucminas.br**

**Jonas Rafael Martins, jonasrmartins17@gmail.com**

**Nícolas Araújo Fonseca Pimenta, nafpimenta@sga.pucminas.br**

**Olavo Vales Gomes de Castro Silva, olavo.castro@sga.pucminas.br**

**Sarah Guimarães Costa, sarahguimaraesc@hotmail.com**

---

Professores:

**Michelle Hanne Soares de Andrade**

**Danilo Boechat Seufitelli**

**Alexandre Marques Alves da Silva**

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_O trabalho aborda o desenvolvimento do Mastercar, um sistema projetado para otimizar a operação de concessionárias automotivas, integrando os setores de vendas, gestão e financeiro. Motivado por problemas como burocracia excessiva e falta de comunicação, o sistema visa melhorar a eficiência operacional, reduzindo atrasos e erros que impactam a satisfação do cliente e o volume de vendas. O objetivo central do Mastercar é aumentar a produtividade, modernizar as operações das concessionárias e criar um ambiente mais eficiente, proporcionando um aumento nas vendas e maior satisfação dos clientes._

---


## 1. Introdução

_À medida que as cidades cresceram e as pessoas passaram a viver cada vez mais distantes de seus locais de trabalho, lazer e serviços, a necessidade de encurtar distâncias tornou-se uma prioridade. Nesse contexto, o automóvel emergiu como a solução mais prática e acessível para garantir mobilidade e reduzir o tempo de deslocamento. A conveniência e a flexibilidade proporcionadas pelo carro o transformaram em um meio de transporte essencial para a vida moderna. Seja para cobrir longas distâncias ou para pequenos trajetos diários, o carro tornou-se um símbolo da busca por eficiência e autonomia em um mundo onde o tempo é cada vez mais valioso._

_Com o crescimento da demanda por automóveis, a venda de carros tornou-se uma das indústrias mais dinâmicas e complexas da economia global. Desde a produção até a entrega ao consumidor final, o processo de comercialização envolve uma rede complexa de concessionárias, vendedores, financistas e seguradoras. Cada etapa é crucial para garantir que o veículo atenda às expectativas e necessidades dos clientes. A venda de carros, portanto, vai muito além da simples troca de um produto por dinheiro; ela envolve uma série de considerações técnicas, financeiras e estratégicas, refletindo as exigências de uma sociedade em constante movimento e transformação._

### 1.1 Contextualização

_O mercado automobilístico brasileiro é um dos setores mais dinâmicos e competitivos da economia nacional. Com uma base de consumidores diversificada e uma crescente demanda por veículos, as concessionárias desempenham um papel crucial na intermediação entre fabricantes e consumidores. No entanto, esse setor enfrenta desafios significativos, como oscilações econômicas, variações nos preços de insumos e a necessidade constante de adaptação às regulamentações governamentais. Além disso, a crescente digitalização e o surgimento de novos modelos de negócios têm pressionado as concessionárias tradicionais a modernizarem suas operações para manter-se competitivas._

_Dentro desse contexto, surge o Mastercar, um sistema desenvolvido especificamente para atender às necessidades de uma concessionária automotiva. O projeto Mastercar visa integrar de maneira eficiente os diversos setores de uma concessionária – vendas, gestão e financeiro – em um único sistema robusto e fácil de usar. O sistema foi concebido a partir de uma experiência prática e profunda no setor, visando simplificar e agilizar processos, melhorando a comunicação interna e aumentando a produtividade. A motivação principal para o desenvolvimento do Mastercar vem de um histórico de insatisfações e desafios enfrentados pelo pai do desenvolvedor, que, com anos de experiência no ramo, identificou a necessidade urgente de uma ferramenta que pudesse reduzir a burocracia e melhorar a eficiência operacional nas concessionárias._

### 1.2 Problema

_O desenvolvimento do Mastercar foi impulsionado por uma série de problemas críticos observados na operação cotidiana de concessionárias. Um dos problemas mais graves é a burocracia excessiva que permeia quase todos os processos, desde a venda de veículos até a gestão do estoque e o controle financeiro. Esta burocracia não só retarda o processo de venda, mas também cria barreiras para a comunicação eficaz entre os diferentes setores da concessionária, como vendas, administrativo e finanças. A falta de integração entre esses setores resulta em processos fragmentados, onde informações cruciais não são compartilhadas em tempo real, causando atrasos, erros e, muitas vezes, a perda de vendas._

_Tal falta de comunicação entre setores é um dos principais fatores que contribuem para a ineficiência nas concessionárias. Os vendedores, por exemplo, frequentemente enfrentam dificuldades para acessar informações sobre o andamento do processo, o que prejudica o atendimento ao cliente e a concretização de vendas. Por outro lado, o setor financeiro lida com problemas relacionados à falta de sincronização com o setor de vendas e sobrecargas, o que pode levar a inconsistências nos registros financeiros e induzir problemas de fluxo de caixa e atrasos nas vendas._

_Diante desses desafios, o Mastercar foi projetado para resolver esses problemas através da integração total dos setores, oferecendo uma interface única e amigável que permite o acesso instantâneo e preciso a todas as informações necessárias para a operação eficiente da concessionária para cada participante do processo de vendas. O sistema visa não apenas melhorar a comunicação e reduzir a burocracia, mas também criar um ambiente operacional eficiente que gere aumento das vendas e satisfação dos clientes. 
Assim, o Mastercar se posiciona como uma solução essencial para as concessionárias que buscam modernizar suas operações, eliminar gargalos e tornar-se mais competitivas em um mercado cada vez mais exigente e digitalizado._

### 1.3 Objetivo geral

_Integrar setores da concessionária para aumentar a eficiência dos processos de venda, pagamento, financiamento e auditoria, visando aumentar o volume de vendas e satisfação do cliente._

#### 1.3.1 Objetivos específicos

- _Detectar, através de recursos como a caixa de entrada, alguma inconsistência que interrompa os processos e histórico do pedido, visando acompanhar o fluxo dos processos._ <br />
- _Implementar gráficos que demonstram o volume de vendas por períodos._ <br />
- _Incluir painéis com o intuito de exibir as diferentes formas de pagamentos realizadas e a quantidade de financiamentos concluídos._ <br />
- _Realizar as avaliações de carros que desejam ser incluídos nos acordos, com o intuito de abater o valor da nova aquisição._ <br />

### 1.4 Justificativas

_Profissionais de concessionárias relataram dificuldade no gerenciamento dos pedidos e a falta de comunicação entre os setores, dado que o andamento das vendas não é facilmente exibido para os vendedores e seu acompanhamento deve ser feito manualmente pelos mesmos, o que vai além do escopo de seu trabalho e demanda muito tempo, diminuindo o fluxo de vendas e tornando o processo mais maçante para os clientes, o que tende a diminuir sua satisfação e retenção._

## 2. Participantes do processo

_Inseridos aqui os participantes dos processos do nosso projeto._

- _Vendedor: homem ou mulher jovem ou de meia-idade, com experiência em vendas; encarregado(a) das vendas diretamente;_
- _Gestor: homem ou mulher jovem ou de meia-idade, com experiência e formação em gestão; encarregado(a) da aprovação das vendas feitas;_
- _Setor Financeiro: setor de profissionais encarregados do pagamento, do financiamento e outros;_
- _Cliente: pessoa física ou jurídica interessada na compra de veículos. Pode ser jovem ou de meia-idade, geralmente com expectativas de financiamento ou pagamento à vista. Encarregado(a) de tomar a decisão final de compra, após negociação com o vendedor;_
- _Setor de Vistoria: setor de profissionais encarregados de vistoriar o veículo usado a ser empregado na entrada do pagamento do veículo novo._

## 3. Modelagem do processo de negócio

_Aqui inseridas algumas informações sobre os nossos processos, assim como as referências para cada um deles._

### 3.1. Análise da situação atual

_Nos sistemas atuais, os vendedores, por exemplo, precisam acessar múltiplos sites ou plataformas para acompanhar o status de um pedido de venda. O processo pode envolver o uso de um sistema para verificar a disponibilidade de veículos no estoque, outro para verificar o status de financiamento ou pagamento, e um terceiro para gerenciar a entrega do veículo ao cliente. Essa dispersão de informações obriga os vendedores a fazerem verificações manuais constantes em cada um desses sistemas para garantir que não percam atualizações críticas. Além disso, o setor financeiro precisa consolidar manualmente as informações provenientes de diferentes fontes para fechar relatórios e assegurar que todas as transações estejam em conformidade._

_Essa falta de integração não só consome tempo, mas também aumenta a probabilidade de erros, como perda de informações, atrasos na comunicação e, em alguns casos, falhas no fechamento de vendas devido à demora na obtenção de informações atualizadas. A consequência é uma experiência fragmentada, tanto para os funcionários quanto para os clientes, que acabam esperando mais do que o necessário para a conclusão de um processo de compra._

### 3.2. Descrição geral da proposta de solução

_A proposta de um novo sistema integrado, como o Mastercar, busca resolver esses problemas unificando todos os processos da concessionária em uma única plataforma. Esse sistema permitiria que todos os setores compartilhem informações em tempo real, eliminando a necessidade de múltiplos acessos a diferentes sistemas._

_Os vendedores, por exemplo, poderiam acompanhar o status de um processo de venda desde a negociação inicial até a entrega do veículo, tudo em um único painel, através de um histórico do processo e notificações, também exibida numa caixa de entrada. Da mesma forma, o setor financeiro teria acesso imediato a todas as transações e atualizações de pagamento, simplificando o processo de fechamento contábil._

_Essa unificação de processos e informações não só melhoraria a comunicação entre os setores, mas também aumentaria a eficiência operacional. Isso permitiria que os funcionários se concentrem em atividades que aumentem o lucro da empresa, como o atendimento ao cliente e o fechamento de vendas, em vez de gastar tempo navegando por sistemas diferentes e lidando com informações desconectadas._

### 3.3. Modelagem dos processos

[PROCESSO 1 - Venda do Veículo](processo-1-venda.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Pagamento (à vista)](processo-2-pagamento-a-vista.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Financiamento](processo-3-financiamento.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Entrega do veículo](processo-4-entrega-do-veiculo.md "Detalhamento do Processo 4.")

[SUBPROCESSO 5 - Avaliação de veículo](subprocesso-5-avaliação-do-veiculo-usado.md "Detalhamento do subprocesso 5.")

[PROCESSO 6 - Pós-Venda](processo-6-pos-venda.md "Detalhamento do Processo 6.")

[PROCESSO 7 - Cadastro](processo-7-cadastro-veiculos.md "Detalhamento do Processo 7.")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

_O sistema MasterCar oferece uma solução digital eficiente para o mercado de vendas automobilísticas, otimizando a gestão dos processos internos de concessionárias e aprimorando a comunicação entre os setores. Com isso, é possível aumentar o número de vendas e a satisfação dos clientes. Recomenda-se que próximos sistemas criados automatizem ainda mais os processos, principalmente no que se refere ao pagamento, financiamento e vistoria, e integrem a venda de acessórios e o pós venda._

Percepção do grupo:

Gabriel Marcondes:

_O trabalho interdisciplinar foi muito desafiador em vários aspectos, como desenvolver uma aplicação web que integra Front com Back e banco de dados. Acredito que o desenvolvimento do trabalho em grupo foi muito gratificante, conseguimos produzir bem e atingir um resultado bem próximo do que esperávamos. Sinto que por ser algo novo, foi uma adaptação à proposta que demandou muito tempo e esforço, que foi recompensado de maneira positiva. Aprendi muito com o trabalho e espero conseguir produzir minhas demandas de maneira mais eficiente no futuro._

Gabriel Nogueira:


_O trabalho tinha como seu principal objetivo facilitar a comunicação entre os setores para agilizar o processo de venda. Creio que conseguimos atingir essa meta, embora haja features pendentes devido às limitações de escopo, a troca de mensagens automáticas e views adaptadas para cada setor atingem o principal objetivo da aplicação._

_Minha experiência com o TI2 foi positiva em muitos aspectos. Tive grandes aprendizados de hard skills: aperfeiçoei minhas habilidades com modelagem e bancos de dados, aprendi sobre computação em nuvem e blob storage, backend, automação de e-mail e muitas outras coisas. Também melhorei minhas soft skills, principalmente ao delegar tarefas, que exige um alto nível de diálogo com o time e levantar os requisitos da aplicação. Foi um projeto desafiador, pois houve a falta de participação de alguns membros e o não cumprimento de suas devidas tarefas, o que me obrigou a trabalhar muito mais do que esperado; isso foi estressante mas valioso para meu aprendizado e desenvolvimento como engenheiro de software._

Guilherme:

_A disciplina de Trabalho Interdisciplinar neste semestre teve como foco aplicar os conhecimentos de modelagem em um projeto web e entender seu papel crucial em projetos de diferentes escalas. Tendo em vista esse objetivo, acredito que ao final da disciplina foi possível aplicar esses conhecimentos de forma concisa e entender sua necessidade, sendo um ponto positivo na formação acadêmica e uma experiência relevante para os alunos que a cursaram._    

Jonas:

_Este trabalho interdisciplinar foi realmente um divisor de águas em todos os aspectos do seu desenvolvimento. No início do trabalho, muito empolgados com a ideia de construir algo novo, não sabíamos o quanto seria complicado e desafiador nos manter dentro daquilo que era esperado do nosso grupo. O uso do tempo foi um dos maiores desafios, sabendo que a maioria trabalha e estuda, conciliar o desenvolvimento deste trabalho foi claramente o maior desafio. É claramente perceptível que a meta esperada não foi 100% alcançada, mas que as dificuldades desse TI nos deu uma visão mais crítica de como funciona a vida do desenvolvedor além daquilo que antes enxergamos. Aprendemos muito durante todo o processo, e com certeza levaremos uma nova mentalidade para os projetos que virão a seguir._

Nícolas:

_O desenvolvimento do nosso sistema de gestão de concessionária foi extremamente desafiador devido à complexidade das regras de negócio e ao fluxo diversificado de dados. Nosso grupo enfrentou grandes dificuldades de comunicação, especialmente pela ausência de alguns membros em reuniões importantes para desenvolvimento da aplicação, definir e discutir metas. Apesar de implementarmos o Trello para organizar as tarefas, a ferramenta não teve o impacto esperado, pois as datas frequentemente não eram cumpridas. Os participantes que estiveram presentes e comprometidos com o projeto deram o máximo de si, fazendo tudo o que foi possível para garantir a entrega final. Quero agradecer ao Gabriel Nogueira e ao Guilherme Henrique pela paciência, por ter confiado no meu trabalho e ter me ensinado muito durante o semestre, se não fossem eles não conseguiríamos chegar até aqui!_

Olavo:

_O trabalho envolvendo o sistema para venda de carros denominado MasterCar foi muito cansativo e desafiador de ser realizado, porém acredito que na medida do possível a performance do grupo foi positiva, visto que a maioria dos integrantes além de enfrentarem um semestre difícil como esse, também trabalham, apesar disso a maioria dos integrantes se manteve engajado e acredito que levando em conta tal situação, entregamos um trabalho bom._

Sarah: 

_O presente trabalho permitiu criar um sistema integrado e eficiente para realizar a venda de veículos novos. Foi um processo desafiador desenvolver tal sistema, visto que houve necessidade de muita organização e cooperação por parte do grupo, o que nem sempre foi atingido, apesar de todos se empenharem bastante. Como um TI tão elaborado, foi difícil para mim realizar as tarefas, uma vez que sou nova na área e tenho ainda bastante dificuldade com programação, por ainda estar aprendendo tudo do zero e ser crua para aplicar os conceitos, mas me esforcei muito e participei de todas as decisões tomadas em todo o processo. Por fim, tivemos que reduzir bastante o escopo do nosso projeto, priorizando as partes realmente importantes, pois não iríamos conseguir entregar tudo no tempo devido._


# REFERÊNCIAS

_Como um projeto de software não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1]** - _**Veja os 50 carros novos mais vendidos do Brasil em maio de 2024**. Autoesporte. Disponível em: https://autoesporte.globo.com/setor-automotivo/mercado-automotivo/noticia/2024/06/veja-os-50-carros-novos-mais-vendidos-do-brasil-em-maio-de-2024.ghtml. Acesso em: 15 ago 2024._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._


# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






