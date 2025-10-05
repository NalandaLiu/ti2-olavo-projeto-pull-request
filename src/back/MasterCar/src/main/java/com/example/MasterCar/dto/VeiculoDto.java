package com.example.MasterCar.dto;
import com.example.MasterCar.model.Veiculo;

public record VeiculoDto(int IdVeiculo, String chassi, String placa, String estadoDoVeiculo, String marca, String ano, String quilometragem, String cor, String modelo, String preco, Boolean disponivel) {
    public VeiculoDto(Veiculo veiculo) {
        this(
            veiculo.getIdVeiculo(),
            veiculo.getChassi(),
            veiculo.getPlaca(),
            veiculo.getEstadoDoVeiculo(),          
            veiculo.getMarca(),
            veiculo.getAno(),
            veiculo.getQuilometragem(),
            veiculo.getCor(),
            veiculo.getModelo(),
            veiculo.getPreco(),
            veiculo.getDisponivel()
        );
    }
}

