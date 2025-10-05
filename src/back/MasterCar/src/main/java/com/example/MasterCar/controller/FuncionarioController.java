package com.example.MasterCar.controller;

import com.example.MasterCar.dto.FuncionarioDto;
import com.example.MasterCar.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

    @Autowired
    FuncionarioService funcionarioService;

    @GetMapping("/listarFuncionarios")
    public List<FuncionarioDto> listarFuncionarios() {
        return funcionarioService.listarFuncionarios();
    }

    @GetMapping("/buscarFuncionario/{cpf}")
    public FuncionarioDto buscarFuncionario(@PathVariable String cpf) {
        return funcionarioService.buscarFuncionarioPorCpf(cpf);
    }

    @PostMapping("/registrarFuncionario")
    public ResponseEntity<String> registrarFuncionario(@RequestBody FuncionarioDto funcionarioDto) {
        return funcionarioService.cadastrarFuncionario(funcionarioDto);
    }

    @DeleteMapping("/demitirFuncionario/{id}")
    public ResponseEntity<String> deletarFuncionario(@PathVariable Long id) {
        return funcionarioService.demitirFuncionario(id);
    }

    @GetMapping("/buscarFuncionario/{email}")
    public FuncionarioDto buscarFuncionarioPorEmail(@PathVariable String email) {
        return funcionarioService.buscarFuncionarioPorEmail(email);
    }

}
