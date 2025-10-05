package com.example.MasterCar.dto;

import com.example.MasterCar.model.Cliente;

import java.io.Serializable;
import java.time.LocalDate;

public record ClienteDto(String CPF, String nome, String sobrenome, String RG, String email, String rua, int numero,
                         String bairro, String cidade, String estado, String cep, LocalDate dataDeNascimento,
                         String telefone) implements Serializable {

    public ClienteDto(Cliente cliente){
        this(
            cliente.getCpf(),
            cliente.getNome(), 
            cliente.getSobrenome(), 
            cliente.getRG(), 
            cliente.getEmail(), 
            cliente.getRua(), 
            cliente.getNumero(), 
            cliente.getBairro(), 
            cliente.getCidade(), 
            cliente.getEstado(),
            cliente.getCep(), 
            cliente.getDataDeNascimento(),
            cliente.getTelefone());
    }
}