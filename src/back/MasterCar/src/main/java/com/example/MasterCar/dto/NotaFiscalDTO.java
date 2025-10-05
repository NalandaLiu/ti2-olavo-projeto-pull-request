package com.example.MasterCar.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotaFiscalDTO {
    private String destinatario;
    private String cpf;
    private String endereco;
    private String numeroNotaFiscal;
    private String marcaVeiculo;
    private String modeloVeiculo;
    private String anoVeiculo;
    private String placaVeiculo;
    private String chassiVeiculo;
    private double valorVeiculo;
    private String formaPagamento;
    private double valorTotal;
}