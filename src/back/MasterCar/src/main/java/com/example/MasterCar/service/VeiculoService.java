package com.example.MasterCar.service;

import java.util.List;
import java.util.NoSuchElementException;

import com.example.MasterCar.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.MasterCar.dto.VeiculoDto;
import com.example.MasterCar.model.Veiculo;
import com.example.MasterCar.repository.VeiculoRepository;
import com.example.MasterCar.dto.VendaDto;
import jakarta.transaction.Transactional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository repository;
    @Autowired
    private VendaRepository vendaRepository;

    @Transactional
    public ResponseEntity<String> cadastrarVeiculo(VeiculoDto veiculoDto) {
        Veiculo veiculo = new Veiculo();
        veiculo.setAno(veiculoDto.ano());
        veiculo.setChassi(veiculoDto.chassi());
        veiculo.setCor(veiculoDto.cor());
        veiculo.setEstadoDoVeiculo(veiculoDto.estadoDoVeiculo());
        veiculo.setModelo(veiculoDto.modelo());
        veiculo.setMarca(veiculoDto.marca());
        veiculo.setPreco(veiculoDto.preco());
        veiculo.setPlaca(veiculoDto.placa());
        veiculo.setQuilometragem(veiculoDto.quilometragem());
        repository.save(veiculo);

        return new ResponseEntity<>("Veiculo cadastrado com sucesso", HttpStatus.CREATED);
    }

    public List<VeiculoDto> buscarVeiculos() {
        return repository.findAll().stream().map(VeiculoDto::new).toList();
    }

    public Integer obterIdPorChassi(String chassi) {
        Veiculo veiculo = repository.findByChassi(chassi);
        if (veiculo == null) {
            return null;
            //throw new NoSuchElementException("Não existe veículo com esse chassi: " + chassi);
        }
        return veiculo.getIdVeiculo();
    }

    public void deletarVeiculo(String chassi) {
        Integer id = obterIdPorChassi(chassi);
        repository.deleteById(id);
    }

    public ResponseEntity<String> atualizarVeiculo(String chassi, VeiculoDto veiculoDto) {
        Integer id = obterIdPorChassi(chassi);
        Veiculo veiculo = repository.findById(id).orElse(null);

        if (veiculo == null) {
            throw new NoSuchElementException("Não existe veículo com esse id: " + id);
        }

        veiculo.setAno(veiculoDto.ano());
        veiculo.setChassi(veiculoDto.chassi());
        veiculo.setCor(veiculoDto.cor());
        veiculo.setEstadoDoVeiculo(veiculoDto.estadoDoVeiculo());
        veiculo.setModelo(veiculoDto.modelo());
        veiculo.setMarca(veiculoDto.marca());
        veiculo.setPreco(veiculoDto.preco());
        veiculo.setPlaca(veiculoDto.placa());
        veiculo.setQuilometragem(veiculoDto.quilometragem());
        repository.save(veiculo);

        return new ResponseEntity<>("Veículo atualizado com sucesso", HttpStatus.CREATED);
    }

    public VeiculoDto buscarVeiculoPorId(int id) {

        Veiculo veiculo = repository.findById(id).orElse(null);
        return veiculo != null ? new VeiculoDto(veiculo) : null;
    }
    


    @Transactional
    public void cadastrarVeiculoUsado(VendaDto veiculoDto) {
        Veiculo veiculo = new Veiculo(veiculoDto.veiculoUsado);
        veiculo.setEstadoDoVeiculo("Usado");
        repository.save(veiculo);
    }

    public Veiculo buscarEntidadeVeiculoPorId(int id) {
        return repository.findById(id).orElse(null);
    }

}
