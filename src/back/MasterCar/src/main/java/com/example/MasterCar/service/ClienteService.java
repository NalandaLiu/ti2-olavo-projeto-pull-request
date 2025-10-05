package com.example.MasterCar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MasterCar.dto.ClienteDto;
import com.example.MasterCar.dto.VendaDto;
import com.example.MasterCar.model.Cliente;
import com.example.MasterCar.repository.ClienteRepository;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

    public List<ClienteDto> listarClientes() {
        return repository.findAll().stream().map(ClienteDto::new).toList();
    }

    public Cliente cadastrarCliente(VendaDto dto) {

        Cliente cliente = new Cliente(dto.cliente);
        cliente.setDataDeNascimento(dto.cliente.getDataDeNascimento());
        repository.save(cliente);

        return cliente;
    }

    public ClienteDto buscarCliente(String cpf) {
        Optional<Cliente> clientOptinal = repository.findByCpf(cpf);
        if (clientOptinal.isPresent()) {
            return new ClienteDto(clientOptinal.get());
        } else {
            return null;
        }
    }

    public void alterarDadosDoCliente(ClienteDto clienteDto) {

    }

    public void deletarCliente(String cpf) {
        repository.deleteByCpf(cpf);
    }

}
