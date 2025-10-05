package com.example.MasterCar.dto;

import com.example.MasterCar.model.Cliente;
import com.example.MasterCar.model.Venda;

import java.time.LocalDate;

public record ListarVendasDto(Long idVenda, int idVeiculo, Cliente CPFCliente, Double valor, boolean emplacamento, LocalDate dataVenda, int etapasConcluidas) {
    public ListarVendasDto(Venda venda) {
        this(
        venda.getIdVenda(),
        venda.getIdVeiculo().getIdVeiculo(),
        venda.getCpfCliente(),
        venda.getValor(),
        venda.isEmplacamento(),
        venda.getDataVenda(),
        venda.getEtapasConcluidas()
        );
       
    }
}
