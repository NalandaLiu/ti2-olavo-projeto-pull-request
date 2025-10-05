package com.example.MasterCar.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContratoDeCompraVendaDTO {
    private String comprador;
    private String cpfComprador;
    private String enderecoComprador;
    private String marcaVeiculo;
    private String modeloVeiculo;
    private String anoVeiculo;
    private String corVeiculo;
    private String placaVeiculo;
    private String chassiVeiculo;
    private double preco;
    private String formaPagamento;
    private String representanteVendedor;

    // Getters and Setters
}
