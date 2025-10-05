package com.example.MasterCar.service;

import com.example.MasterCar.dto.ListarVendasDto;
import com.example.MasterCar.dto.VendaDto;
import com.example.MasterCar.dto.VendaIdDto;
import com.example.MasterCar.model.Cliente;
import com.example.MasterCar.model.Veiculo;
import com.example.MasterCar.model.Venda;
import com.example.MasterCar.repository.VeiculoRepository;
import com.example.MasterCar.repository.VendaRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private VeiculoService veiculoService;
    @Autowired
    private VeiculoRepository veiculoRepository;

    @Transactional
    public ResponseEntity<String> criarVenda(VendaDto dto) {

        Venda venda = new Venda();

        Cliente cliente = clienteService.cadastrarCliente(dto);
        venda.setCpfCliente(cliente);

        Veiculo veiculo = veiculoService.buscarEntidadeVeiculoPorId(dto.getIdVeiculo());
        venda.setIdVeiculo(veiculo);
        venda.setDataVenda(LocalDate.now());
        venda.setValor(dto.getValor());   
        venda.setEtapasConcluidas(1);
        veiculo.setDisponivel(false);

        if (dto.getVeiculoUsado() != null) {

            veiculoService.cadastrarVeiculoUsado(dto);
        }

        vendaRepository.save(venda);
        return ResponseEntity.ok("Venda Criada com Sucesso!");
    }

    public List<ListarVendasDto> buscarVendas() {
        return vendaRepository.findAll().stream().map(ListarVendasDto::new).toList();
    }

    public VendaIdDto buscarVendaPorId(Long id) {
        Venda venda = vendaRepository.findById(id).orElse(null);

        if (venda == null) {
            return null;
        }

        VendaIdDto dto = new VendaIdDto();
        dto.setIdVenda(venda.getIdVenda());
        dto.setIdVeiculo(venda.getIdVeiculo());
        dto.setIdVU(venda.getIdVU());
        dto.setCpfCliente(venda.getCpfCliente());
        dto.setValor(venda.getValor());
        dto.setDataVenda(venda.getDataVenda());
        dto.setEtapasConcluidas(venda.getEtapasConcluidas());
        dto.setEmplacamento(venda.isEmplacamento());
        dto.setFuncionarios(venda.getFuncionarios());

        return dto;
    }

    public ResponseEntity<String> atualizarVenda(Long id, VendaDto dto) {
        Venda venda = vendaRepository.findById(id).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
    
        // Atualiza os dados do cliente
        Cliente cliente = venda.getCpfCliente();

        cliente.setNome(dto.getCliente().getNome());
        cliente.setSobrenome(dto.getCliente().getSobrenome());
        cliente.setEmail(dto.getCliente().getEmail());
        cliente.setRua(dto.getCliente().getRua());
        cliente.setNumero(dto.getCliente().getNumero());
        cliente.setBairro(dto.getCliente().getBairro());
        cliente.setCidade(dto.getCliente().getCidade());
        cliente.setEstado(dto.getCliente().getEstado());
        cliente.setCep(dto.getCliente().getCep());
        cliente.setDataDeNascimento(dto.getCliente().getDataDeNascimento());
        cliente.setTelefone(dto.getCliente().getTelefone());
        cliente.setCpf(dto.getCliente().getCpf());
        cliente.setRG(dto.getCliente().getRG());
        venda.setCpfCliente(cliente);
    
        // Atualiza o veículo
        Veiculo veiculo = veiculoRepository.findById(dto.getIdVeiculo())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        venda.setIdVeiculo(veiculo);

        venda.setValor(dto.getValor());
        venda.setEtapasConcluidas(dto.getEtapasConcluidas());
    
        vendaRepository.save(venda);


        return new ResponseEntity<>("Venda atualizada com sucesso", HttpStatus.CREATED);
    }
    

}