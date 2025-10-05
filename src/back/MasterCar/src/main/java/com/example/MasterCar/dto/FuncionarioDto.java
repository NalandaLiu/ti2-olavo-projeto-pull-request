package com.example.MasterCar.dto;

import com.example.MasterCar.enums.UserRole;
import com.example.MasterCar.model.Funcionario;

import java.io.Serializable;


public record FuncionarioDto(String cpf, String nome, String email, String password, String sobrenome, float salario, UserRole tipo) implements Serializable {

    public FuncionarioDto(Funcionario funcionario) {
        this(
                funcionario.getCpf(),
                funcionario.getNome(),
                funcionario.getEmail(),
                funcionario.getPassword(),
                funcionario.getSobrenome(),
                funcionario.getSalario(),
                funcionario.getTipo()
        );
    }

}