package com.example.MasterCar.service;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

import java.io.FileOutputStream;
import java.io.IOException;

public class NotaFiscalService {

    public void generateNotaFiscal(String filePath, 
                                   String nomeEmitente, 
                                   String cnpjEmitente, 
                                   String enderecoEmitente, 
                                   String nomeDestinatario, 
                                   String cpfDestinatario, 
                                   String enderecoDestinatario, 
                                   String dataEmissao, 
                                   String numeroNotaFiscal, 
                                   String marcaVeiculo, 
                                   String modeloVeiculo, 
                                   String anoVeiculo, 
                                   String placaVeiculo, 
                                   String chassiVeiculo, 
                                   double valorVeiculo, 
                                   String formaPagamento) {
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();

            // Título principal
            document.add(new Paragraph("NOTA FISCAL DE COMPRA DE VEÍCULO"));
            document.add(new Paragraph(" "));

            // Emitente
            document.add(new Paragraph("Emitente: " + nomeEmitente));
            document.add(new Paragraph("CNPJ: " + cnpjEmitente));
            document.add(new Paragraph("Endereço: " + enderecoEmitente));
            document.add(new Paragraph(" "));

            // Destinatário
            document.add(new Paragraph("Destinatário: " + nomeDestinatario));
            document.add(new Paragraph("CPF: " + cpfDestinatario));
            document.add(new Paragraph("Endereço: " + enderecoDestinatario));
            document.add(new Paragraph(" "));

            // Informações da nota fiscal
            document.add(new Paragraph("Data da Emissão: " + dataEmissao));
            document.add(new Paragraph("Número da Nota Fiscal: " + numeroNotaFiscal));
            document.add(new Paragraph(" "));

            // Descrição do veículo
            document.add(new Paragraph("Descrição do Veículo:"));
            document.add(new Paragraph("● Marca: " + marcaVeiculo));
            document.add(new Paragraph("● Modelo: " + modeloVeiculo));
            document.add(new Paragraph("● Ano de Fabricação/Modelo: " + anoVeiculo));
            document.add(new Paragraph("● Placa: " + placaVeiculo));
            document.add(new Paragraph("● Chassi: " + chassiVeiculo));
            document.add(new Paragraph(" "));

            // Valores
            document.add(new Paragraph("Valor do Veículo: R$ " + String.format("%.2f", valorVeiculo)));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Forma de Pagamento: " + formaPagamento));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Valor Total: R$ " + String.format("%.2f", valorVeiculo)));
            document.add(new Paragraph(" "));

            // Assinaturas
            document.add(new Paragraph("Assinaturas:"));
            document.add(new Paragraph("COMPRADOR ___________________________________________________________________________"));
            document.add(new Paragraph("REPRESENTANTE DA MASTERCAR ___________________________________________________________________________"));

            System.out.println("Nota fiscal gerada com sucesso!");

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
    }

    public static void main(String[] args) {
        NotaFiscalService notaFiscalService = new NotaFiscalService();
        notaFiscalService.generateNotaFiscal("nota_fiscal.pdf", 
            "MasterCar", 
            "12.345.678/0001-99", 
            "Rua dos Automóveis, nº 123, Bairro Centro, Cidade Belo Horizonte, Estado Minas Gerais, CEP 12345-678", 
            "João da Silva", 
            "123.456.789-00", 
            "Rua Exemplo, 123, Centro, Belo Horizonte, MG", 
            "24/11/2024", 
            "000123", 
            "Fiat", 
            "Mobi", 
            "2024", 
            "ABC1D23", 
            "9BWZZZ377VT004251", 
            45000.00, 
            "À vista");
    }
}
