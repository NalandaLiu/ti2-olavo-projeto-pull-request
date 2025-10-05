package com.example.MasterCar.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.MasterCar.model.Veiculo;
import com.example.MasterCar.model.Cliente;
import com.example.MasterCar.model.Funcionario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendaIdDto {
    private Long idVenda;
    private Veiculo idVeiculo;
    private Veiculo idVU;
    private Cliente cpfCliente;
    private double valor;
    private LocalDate dataVenda;
    private int etapasConcluidas;
    private boolean emplacamento;
    private List<Funcionario> funcionarios;
}
