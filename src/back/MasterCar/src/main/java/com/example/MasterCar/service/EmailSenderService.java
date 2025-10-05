package com.example.MasterCar.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSenderService {
    private static final String EMAIL_DA_CONCESSIONARIA = "mastercarconcessionaria@gmail.com";

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    public void sendEmailWithAttachment(String to, String subject, String body, File file) throws MessagingException {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setFrom(EMAIL_DA_CONCESSIONARIA);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);

            if (file != null) {
                if (file.exists() && file.isFile()) {
                    FileSystemResource resource = new FileSystemResource(file);
                    helper.addAttachment(resource.getFilename(), resource);
                } else {
                    throw new MessagingException("Arquivo de anexo inválido ou inexistente.");
                }
            }

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new MessagingException("Erro ao enviar e-mail: " + e.getMessage(), e);
        }
    }

    public void sendNotaFiscal(
            String to,
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
            double valorTotal
    ) throws MessagingException {
        try {
            // Generate the Nota Fiscal PDF
            File notaFiscalPdf = pdfGeneratorService.generateNotaFiscal(
                    destinatario,
                    cpf,
                    endereco,
                    numeroNotaFiscal,
                    marcaVeiculo,
                    modeloVeiculo,
                    anoVeiculo,
                    placaVeiculo,
                    chassiVeiculo,
                    valorVeiculo,
                    formaPagamento,
                    valorTotal
            );

            String subject = "Sua Nota Fiscal da MasterCar";
            String body = "Prezados,\n\nSegue em anexo a Nota Fiscal referente à compra do veículo realizado na MasterCar.\n\nAtenciosamente,\nEquipe MasterCar";

            sendEmailWithAttachment(to, subject, body, notaFiscalPdf);

            notaFiscalPdf.delete();

        } catch (Exception e) {
            throw new MessagingException("Erro ao gerar ou enviar a Nota Fiscal: " + e.getMessage(), e);
        }
    }

    public void sendCompraVendaContract(
            String to,
            String comprador,
            String cpfComprador,
            String enderecoComprador,
            String marcaVeiculo,
            String modeloVeiculo,
            String anoVeiculo,
            String corVeiculo,
            String placaVeiculo,
            String chassiVeiculo,
            double preco,
            String formaPagamento,
            String representanteVendedor
    ) throws MessagingException {
        try {
            // Generate the Compra e Venda Contract PDF
            File contratoPdf = pdfGeneratorService.generateCompraVendaPdf(
                    comprador,
                    cpfComprador,
                    marcaVeiculo,
                    modeloVeiculo,
                    anoVeiculo,
                    corVeiculo,
                    placaVeiculo,
                    chassiVeiculo,
                    preco,
                    formaPagamento,
                    representanteVendedor
            );

            // Email subject and body
            String subject = "Seu Contrato de Compra e Venda - MasterCar";
            String body = "Prezados,\n\nSegue em anexo o contrato de compra e venda referente ao veículo adquirido na MasterCar.\n\nAtenciosamente,\nEquipe MasterCar";

            // Send the email with the Compra e Venda contract as an attachment
            sendEmailWithAttachment(to, subject, body, contratoPdf);

            // Optionally, delete the temporary file after sending
            contratoPdf.delete();

        } catch (Exception e) {
            throw new MessagingException("Erro ao gerar ou enviar o Contrato de Compra e Venda: " + e.getMessage(), e);
        }
    }

    public void sendContratoLgpd(
            String to,
            String chassisVeiculo,
            String titularNome,
            String titularCpfCnpj
    ) throws MessagingException {
        try {
            // Generate the LGPD Contract PDF
            File contratoLgpdPdf = pdfGeneratorService.generateContratoLgpd(
                    chassisVeiculo,
                    titularNome,
                    titularCpfCnpj
            );

            // Email subject and body
            String subject = "Contrato de Proteção de Dados Pessoais - MasterCar";
            String body = "Prezados,\n\nSegue em anexo o contrato de proteção de dados pessoais, conforme os termos da LGPD.\n\nAtenciosamente,\nEquipe MasterCar";

            // Send the email with the LGPD contract as an attachment
            sendEmailWithAttachment(to, subject, body, contratoLgpdPdf);

            // Optionally, delete the temporary file after sending
            contratoLgpdPdf.delete();

        } catch (Exception e) {
            throw new MessagingException("Erro ao gerar ou enviar o Contrato LGPD: " + e.getMessage(), e);
        }
    }

    public void sendCondicoesGerais(String to, String chassisVeiculo) throws MessagingException {
        try {
            // Generate the "Condições Gerais" PDF
            File condicoesGeraisPdf = pdfGeneratorService.generateCondicoesGerais(chassisVeiculo);

            // Email subject and body
            String subject = "Contrato de Condições Gerais - MasterCar";
            String body = "Prezados,\n\nSegue em anexo o contrato de condições gerais para compra e venda de veículo.\n\nAtenciosamente,\nEquipe MasterCar";

            // Send the email with the Condições Gerais contract as an attachment
            sendEmailWithAttachment(to, subject, body, condicoesGeraisPdf);

            // Optionally, delete the temporary file after sending
            condicoesGeraisPdf.delete();

        } catch (Exception e) {
            throw new MessagingException("Erro ao gerar ou enviar o Contrato de Condições Gerais: " + e.getMessage(), e);
        }
    }
}
