package com.example.MasterCar.dto;

import com.example.MasterCar.model.Pagamento;
import com.example.MasterCar.enums.PagamentoTipos;
import com.example.MasterCar.model.Veiculo;
import com.example.MasterCar.model.Venda;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record PagamentoDto(@NotNull Venda venda, float valor, @NotNull PagamentoTipos tipo, float desconto,
                           @NotNull Veiculo vu) implements Serializable {
    public PagamentoDto(Pagamento pagamento){
        this(
                pagamento.getVenda(),
                pagamento.getValor(),
                pagamento.getTipo(),
                pagamento.getDesconto(),
                pagamento.getVu()
        );
    }
}