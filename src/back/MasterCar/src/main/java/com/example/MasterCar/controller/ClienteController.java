package com.example.MasterCar.controller;

import com.example.MasterCar.dto.ClienteDto;
import com.example.MasterCar.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping("/listarClientes")
    public List<ClienteDto> listarClientes(){
        return clienteService.listarClientes();
    }

    @GetMapping("/buscarCliente/{cpf}")
    public ClienteDto buscarCliente(@PathVariable String cpf){
        ClienteDto clienteDto = clienteService.buscarCliente(cpf);
        return clienteDto;
    }

    @DeleteMapping("/deletarCliente/{cpf}")
    public void deletarCliente(@PathVariable String cpf){
        clienteService.deletarCliente(cpf);
    }
}