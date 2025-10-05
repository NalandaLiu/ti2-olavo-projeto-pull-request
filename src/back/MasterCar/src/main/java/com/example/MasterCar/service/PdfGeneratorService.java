package com.example.MasterCar.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class PdfGeneratorService {

    public File generateCompraVendaPdf(
            String comprador,
            String cpfComprador,
            String marcaVeiculo,
            String modeloVeiculo,
            String anoVeiculo,
            String corVeiculo,
            String placaVeiculo,
            String chassiVeiculo,
            double preco,
            String formaPagamento,
            String representanteVendedor) throws IOException, DocumentException {

        // Create a temporary file to hold the PDF
        String nomeArquivo = chassiVeiculo + "-contratoCompraVenda";
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File tempFile = File.createTempFile(nomeArquivo, ".pdf", tempDir);

        Document document = new Document();

        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            PdfWriter.getInstance(document, fos);
            document.open();

            // Título principal
            document.add(new Paragraph("CONTRATO DE COMPRA E VENDA DE VEÍCULO"));
            document.add(new Paragraph(" "));

            // Contratante e Contratada
            document.add(new Paragraph("CONTRATANTE: " + comprador + ", de CPF " + cpfComprador));
            document.add(new Paragraph( ", doravante denominado \"COMPRADOR\"."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("CONTRATADA: MasterCar, inscrita no CNPJ sob o nº 12.345.678/0001-99, com sede à Rua dos"));
            document.add(new Paragraph("Automóveis, nº 123, Bairro Centro, Cidade Belo Horizonte, Estado Minas Gerais, CEP 12345-678,"));
            document.add(new Paragraph("doravante denominada \"VENDEDORA\". Representada neste ato pelo(a) Sr(a). " + representanteVendedor + "."));
            document.add(new Paragraph(" "));

            // Cláusulas
            document.add(new Paragraph("CLÁUSULA 1 – OBJETO DO CONTRATO"));
            document.add(new Paragraph("1.1. A VENDEDORA, MasterCar, representada pelo(a) Sr(a). " + representanteVendedor +
                    ", vende ao COMPRADOR, " + comprador + ", que aceita, o veículo abaixo descrito:"));
            document.add(new Paragraph("● Marca: " + marcaVeiculo));
            document.add(new Paragraph("● Modelo: " + modeloVeiculo));
            document.add(new Paragraph("● Ano de Fabricação/Modelo: " + anoVeiculo));
            document.add(new Paragraph("● Cor: " + corVeiculo));
            document.add(new Paragraph("● Placa: " + placaVeiculo));
            document.add(new Paragraph("● Chassis: " + chassiVeiculo));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("CLÁUSULA 2 – VALOR E FORMA DE PAGAMENTO"));
            document.add(new Paragraph("2.1. O preço total do veículo é de R$ " + String.format("%.2f", preco) + ", que será pago da seguinte forma:"));
            document.add(new Paragraph("● " + formaPagamento));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("CLÁUSULA 3 – TRANSFERÊNCIA DE PROPRIEDADE"));
            document.add(new Paragraph("3.1. A VENDEDORA, MasterCar, representada pelo(a) Sr(a). " + representanteVendedor +
                    ", se compromete a realizar a transferência de propriedade do veículo para o"));
            document.add(new Paragraph("nome do COMPRADOR, " + comprador + ", arcando com as despesas relacionadas ao processo de transferência."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("CLÁUSULA 4 – PRAZO DE ENTREGA"));
            document.add(new Paragraph("4.1. O veículo será entregue ao COMPRADOR, " + comprador + ", no prazo de 30 dias úteis,"));
            document.add(new Paragraph("a contar da assinatura deste contrato e cumprimento das condições de pagamento."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("CLÁUSULA 5 – GARANTIA"));
            document.add(new Paragraph("5.1. O veículo objeto deste contrato é vendido com a garantia legal prevista pelo Código de"));
            document.add(new Paragraph("Defesa do Consumidor e pela legislação vigente, que será de 1 ano a partir"));
            document.add(new Paragraph("da data de entrega."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("CLÁUSULA 6 – OBRIGAÇÕES DO COMPRADOR"));
            document.add(new Paragraph("6.1. O COMPRADOR, " + comprador + ", se compromete a pagar o valor acordado na forma estipulada e a cumprir"));
            document.add(new Paragraph("com todas as obrigações previstas neste contrato."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("CLÁUSULA 7 – CONDIÇÕES GERAIS"));
            document.add(new Paragraph("7.1. As partes declaram que leram e compreenderam todas as cláusulas deste contrato, estando"));
            document.add(new Paragraph("cientes de seus direitos e obrigações."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("CLÁUSULA 8 – FORO"));
            document.add(new Paragraph("8.1. Para a resolução de eventuais controvérsias oriundas deste contrato, as partes elegem o foro"));
            document.add(new Paragraph("da comarca de Belo Horizonte, Estado de Minas Gerais."));
            document.add(new Paragraph(" "));

            // Assinaturas
            document.add(new Paragraph("Assinaturas:"));
            document.add(new Paragraph("COMPRADOR ___________________________________________________________________________"));
            document.add(new Paragraph(""));
            document.add(new Paragraph("REPRESENTANTE DA MASTERCAR ___________________________________________________________________________"));

        }

        // Return the file
        return tempFile;
    }

    public File generateNotaFiscal(
            String destinatario,
            String cpf,
            String endereco,
            String numeroNotaFiscal,
            String marcaVeiculo,
            String modeloVeiculo,
            String anoVeiculo,
            String placaVeiculo,
            String chassiVeiculo,
            double valorVeiculo,
            String formaPagamento,
            double valorTotal) throws IOException, DocumentException {

        // Create a temporary file for the PDF
        String nomeArquivo = chassiVeiculo + "-notaFiscal";
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File tempFile = File.createTempFile(nomeArquivo, ".pdf", tempDir);

        String dataEmissao = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        Document document = new Document();

        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            PdfWriter.getInstance(document, fos);
            document.open();

            // Add the Nota Fiscal content
            document.add(new Paragraph("NOTA FISCAL DE COMPRA DE VEÍCULO"));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Emitente: MasterCar"));
            document.add(new Paragraph("CNPJ: 12.345.678/0001-99"));
            document.add(new Paragraph("Endereço: Rua dos Automóveis, nº 123, Bairro Centro, Cidade Belo Horizonte, Estado Minas Gerais, CEP 12345-678"));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Destinatário: " + destinatario));
            document.add(new Paragraph("CPF: " + cpf));
            document.add(new Paragraph("Endereço: " + endereco));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Data da Emissão: " + dataEmissao));
            document.add(new Paragraph("Número da Nota Fiscal: " + numeroNotaFiscal));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Descrição do Veículo:"));
            document.add(new Paragraph("● Marca: " + marcaVeiculo));
            document.add(new Paragraph("● Modelo: " + modeloVeiculo));
            document.add(new Paragraph("● Ano de Fabricação/Modelo: " + anoVeiculo));
            document.add(new Paragraph("● Placa: " + placaVeiculo));
            document.add(new Paragraph("● Chassi: " + chassiVeiculo));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Valor do Veículo: R$ " + String.format("%.2f", valorVeiculo)));
            document.add(new Paragraph("Forma de Pagamento: " + formaPagamento));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Valor Total: R$ " + String.format("%.2f", valorTotal)));
            document.add(new Paragraph(" "));

            // Assinaturas
            document.add(new Paragraph("Assinaturas:"));
            document.add(new Paragraph("COMPRADOR ___________________________________________________________________________"));
            document.add(new Paragraph(""));
            document.add(new Paragraph("REPRESENTANTE DA MASTERCAR ___________________________________________________________________________"));
        }

        // Return the generated PDF file
        return tempFile;
    }

    public File generateContratoLgpd(
            String chassisVeiculo,
            String titularNome,
            String titularCpfCnpj
    ) throws IOException, DocumentException {
        // Create a temporary file to store the generated PDF
        String nomeArquivo = chassisVeiculo + "-contratoLGPD";
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File tempFile = File.createTempFile(nomeArquivo, ".pdf", tempDir);

        Document document = new Document();

        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            PdfWriter.getInstance(document, fos);
            document.open();

            // Add the contract content
            document.add(new Paragraph("CONTRATO DE PROTEÇÃO DE DADOS PESSOAIS"));
            document.add(new Paragraph("CONCESSIONÁRIA MASTERCAR"));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Pelo presente instrumento, de um lado, a Concessionária MasterCar (doravante denominada \"Concessionária\"), inscrita no CNPJ sob o número 296.158.807/0302-27, e, de outro lado, "
                    + titularNome + " (doravante denominado \"Titular dos Dados\"), inscrito no CPF/CNPJ sob o número " + titularCpfCnpj + ", celebram o presente Contrato de Proteção de Dados Pessoais, nos seguintes termos:"));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("1. OBJETO"));
            document.add(new Paragraph("O presente contrato tem como objetivo estabelecer os direitos e deveres da Concessionária MasterCar quanto ao tratamento de dados pessoais, nos termos da Lei 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD)."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("2. DEFINIÇÕES"));
            document.add(new Paragraph("● Dados Pessoais: Informações relacionadas a pessoa natural identificada ou identificável."));
            document.add(new Paragraph("● Tratamento de Dados: Toda operação realizada com dados pessoais, como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação, controle, modificação, comunicação, transferência e difusão."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("3. FINALIDADE DO TRATAMENTO DE DADOS"));
            document.add(new Paragraph("A Concessionária poderá tratar os dados pessoais do Titular para:"));
            document.add(new Paragraph("● Realização de cadastro de clientes, fornecedores ou colaboradores;"));
            document.add(new Paragraph("● Execução de contratos e prestação de serviços;"));
            document.add(new Paragraph("● Cumprimento de obrigações legais e regulatórias;"));
            document.add(new Paragraph("● Execução de atividades comerciais, como vendas e marketing, com consentimento prévio do Titular."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("4. DIREITOS DO TITULAR DOS DADOS"));
            document.add(new Paragraph("Conforme a LGPD, o Titular dos Dados possui os seguintes direitos, que poderão ser exercidos mediante solicitação formal à Concessionária:"));
            document.add(new Paragraph("● Confirmar a existência de tratamento de seus dados pessoais;"));
            document.add(new Paragraph("● Acessar seus dados pessoais tratados pela Concessionária;"));
            document.add(new Paragraph("● Corrigir dados pessoais incompletos, inexatos ou desatualizados;"));
            document.add(new Paragraph("● Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;"));
            document.add(new Paragraph("● Revogar o consentimento para o tratamento de dados pessoais, quando aplicável."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("5. OBRIGAÇÕES DA CONCESSIONÁRIA"));
            document.add(new Paragraph("A Concessionária compromete-se a:"));
            document.add(new Paragraph("● Tratar os dados pessoais do Titular exclusivamente para as finalidades previstas neste contrato;"));
            document.add(new Paragraph("● Garantir a segurança dos dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas;"));
            document.add(new Paragraph("● Adotar medidas de segurança e governança em proteção de dados, de acordo com as regulamentações aplicáveis;"));
            document.add(new Paragraph("● Notificar o Titular sobre qualquer incidente de segurança que possa implicar risco ou dano relevante aos dados pessoais."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("6. COMPARTILHAMENTO DE DADOS PESSOAIS"));
            document.add(new Paragraph("A Concessionária somente poderá compartilhar dados pessoais com terceiros mediante:"));
            document.add(new Paragraph("● Consentimento prévio do Titular dos Dados, exceto em casos de cumprimento de obrigações legais ou contratuais;"));
            document.add(new Paragraph("● Compromisso dos terceiros em observar as normas da LGPD e garantir a proteção adequada dos dados compartilhados."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("7. SEGURANÇA E SIGILO"));
            document.add(new Paragraph("A Concessionária adotará todas as medidas técnicas e administrativas necessárias para proteger os dados pessoais do Titular contra acessos não autorizados, perdas, destruição, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("8. DURAÇÃO DO TRATAMENTO E ELIMINAÇÃO DE DADOS"));
            document.add(new Paragraph("Os dados pessoais serão tratados enquanto houver relação entre as partes ou enquanto for necessário para o cumprimento de obrigações legais e regulatórias. Quando não forem mais necessários, os dados pessoais serão eliminados, salvo se houver necessidade de retenção para cumprimento de obrigações legais ou regulatórias."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("9. DISPOSIÇÕES FINAIS"));
            document.add(new Paragraph("● Este contrato entra em vigor na data de sua assinatura e permanecerá válido enquanto o tratamento de dados for necessário."));
            document.add(new Paragraph("● As partes elegem o foro de Belo Horizonte, Minas Gerais para dirimir quaisquer questões oriundas do presente contrato."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Assinatura:"));
            document.add(new Paragraph("Titular dos Dados: ___________________________________________________________________"));
        }

        // Return the generated PDF file
        return tempFile;
    }

    public File generateCondicoesGerais(String chassisVeiculo) throws IOException, DocumentException {
        // Create a temporary file for the PDF
        String nomeArquivo = chassisVeiculo + "-ContratoCondicoesGerais";
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File tempFile = File.createTempFile(nomeArquivo, ".pdf", tempDir);

        Document document = new Document();

        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            PdfWriter.getInstance(document, fos);
            document.open();

            // Add the contract content
            document.add(new Paragraph("CONTRATO DE CONDIÇÕES GERAIS DE COMPRA E VENDA DE VEÍCULO"));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Este contrato estabelece as condições gerais para a compra e venda de veículos novos e usados comercializados pela MasterCar."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("1. OBJETO"));
            document.add(new Paragraph("1.1. Este contrato tem como objeto a venda de veículos novos ou usados, cujas especificações estão descritas no Contrato de Compra e Venda celebrado entre a concessionária MasterCar e o comprador."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("2. CONDIÇÕES DE PAGAMENTO"));
            document.add(new Paragraph("2.1. O pagamento poderá ser efetuado à vista ou por meio de financiamento, conforme acordado entre as partes, observando-se as condições de cada forma de pagamento."));
            document.add(new Paragraph("2.2. No caso de financiamento, o comprador deverá submeter-se às condições de crédito e à análise financeira realizada pela instituição financeira parceira da MasterCar."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("3. GARANTIA E SERVIÇOS"));
            document.add(new Paragraph("3.1. Todos os veículos vendidos pela MasterCar possuem garantia de fábrica ou garantia estendida, conforme especificado no termo de garantia fornecido."));
            document.add(new Paragraph("3.2. A MasterCar se compromete a realizar as revisões e manutenções necessárias dentro do período de garantia, conforme especificado pelo fabricante."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("4. TRANSAÇÃO DE VEÍCULO USADO COMO PARTE DE PAGAMENTO"));
            document.add(new Paragraph("4.1. Caso o comprador utilize um veículo usado como parte do pagamento, a avaliação do veículo será realizada pela MasterCar com base nos critérios técnicos e de mercado."));
            document.add(new Paragraph("4.2. O valor atribuído ao veículo usado será deduzido do valor total do veículo novo ou usado adquirido pelo comprador."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("5. RESPONSABILIDADES DO COMPRADOR"));
            document.add(new Paragraph("5.1. O comprador se compromete a fornecer todas as informações necessárias para o processo de venda, inclusive documentos pessoais e do veículo."));
            document.add(new Paragraph("5.2. O comprador é responsável pela transferência do veículo adquirido em seu nome, bem como por eventuais custos de licenciamento e impostos."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("6. DISPOSIÇÕES FINAIS"));
            document.add(new Paragraph("6.1. Este contrato é firmado em conformidade com a legislação vigente e poderá ser alterado mediante acordo entre as partes."));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Assinaturas:"));
            document.add(new Paragraph("COMPRADOR ___________________________________________________________________________"));
            document.add(new Paragraph(""));
            document.add(new Paragraph("REPRESENTANTE DA MASTERCAR ___________________________________________________________________________"));
        }

        // Return the generated PDF file
        return tempFile;
    }

    public static void main(String[] args) throws IOException {
        PdfGeneratorService p = new PdfGeneratorService();
        p.generateCondicoesGerais("6fj8JUVSESG3C4814");
    }

}
