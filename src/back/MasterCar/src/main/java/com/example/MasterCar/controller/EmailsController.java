package com.example.MasterCar.controller;

import com.example.MasterCar.dto.*;
import com.example.MasterCar.service.EmailSenderService;
import com.example.MasterCar.service.PdfGeneratorService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailsController {
    @Autowired
    EmailSenderService emailSenderService;

    @PostMapping("/emailSimples/{to}")
    public void enviaEmailSimple(@PathVariable String to, @RequestBody EmailSimplesDTO dto) throws MessagingException {
        emailSenderService.sendEmailWithAttachment(to, dto.getSubject(), dto.getBody(), null);
    }

    @PostMapping("/enviarContratoDeCompraVenda/{to}")
    public void enviarContratoDeCompraVenda(@PathVariable String to, @RequestBody ContratoDeCompraVendaDTO dto) {
        try {
            emailSenderService.sendCompraVendaContract(
                    to,
                    dto.getComprador(),
                    dto.getCpfComprador(),
                    dto.getEnderecoComprador(),
                    dto.getMarcaVeiculo(),
                    dto.getModeloVeiculo(),
                    dto.getAnoVeiculo(),
                    dto.getCorVeiculo(),
                    dto.getPlacaVeiculo(),
                    dto.getChassiVeiculo(),
                    dto.getPreco(),
                    dto.getFormaPagamento(),
                    dto.getRepresentanteVendedor()
            );
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar o contrato de compra e venda: " + e.getMessage());
        }
    }

    @PostMapping("/enviarContratoCondicoesGerais/{to}")
    public void enviarContratoCondicoesGerais(@PathVariable String to, @RequestBody ContratoDeCondicoesGeraisDTO dto) {
        try {
            emailSenderService.sendCondicoesGerais(to, dto.getChassisVeiculo());
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar o contrato de condições gerais: " + e.getMessage());
        }
    }

    @PostMapping("/enviarNotaFiscal/{to}")
    public void enviarNotaFiscal(@PathVariable String to, @RequestBody NotaFiscalDTO dto) {
        try {
            emailSenderService.sendNotaFiscal(
                    to,
                    dto.getDestinatario(),
                    dto.getCpf(),
                    dto.getEndereco(),
                    dto.getNumeroNotaFiscal(),
                    dto.getMarcaVeiculo(),
                    dto.getModeloVeiculo(),
                    dto.getAnoVeiculo(),
                    dto.getPlacaVeiculo(),
                    dto.getChassiVeiculo(),
                    dto.getValorVeiculo(),
                    dto.getFormaPagamento(),
                    dto.getValorTotal()
            );
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar a nota fiscal: " + e.getMessage());
        }
    }

    @PostMapping("/enviarLgpd/{to}")
    public void enviarLgpd(@PathVariable String to, @RequestBody ContratoDeLgpdDTO dto) {
        try {
            emailSenderService.sendContratoLgpd(to, dto.getVeiculoChassis(), dto.getTitularNome(), dto.getTitularCpfCnpj());
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar o contrato LGPD: " + e.getMessage());
        }
    }
}
