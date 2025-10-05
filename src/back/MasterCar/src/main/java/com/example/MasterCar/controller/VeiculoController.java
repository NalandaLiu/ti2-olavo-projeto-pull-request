package com.example.MasterCar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.MasterCar.dto.VeiculoDto;

import com.example.MasterCar.service.VeiculoService;


@RestController
@RequestMapping("/veiculo")
public class VeiculoController {
    
    @Autowired
    private VeiculoService veiculoService;

    @PostMapping(value = "/adicionarVeiculo")
    public ResponseEntity<String> adicionarVeiculo(@RequestBody VeiculoDto veiculoDto){
        return veiculoService.cadastrarVeiculo(veiculoDto);
    }

    @GetMapping(value = "/listarVeiculos")
    public List<VeiculoDto> listarVeiculos(){
        List<VeiculoDto> listaVeiculos =  veiculoService.buscarVeiculos();
        return listaVeiculos;
    }

    @DeleteMapping(value = "/deletarVeiculo/{chassi}")
    public void deletarVeiculo(@PathVariable("chassi") String chassi){
        veiculoService.deletarVeiculo(chassi);
    }

    @PutMapping(value = "/atualizarVeiculo/{chassi}")
    public ResponseEntity<String> atualizarVeiculo(@PathVariable("chassi") String chassi, @RequestBody VeiculoDto veiculoDto){
        return veiculoService.atualizarVeiculo(chassi, veiculoDto);
    }

    @GetMapping(value = "/buscarVeiculoPorId/{id}")
    public VeiculoDto buscarVeiculoPorId(@PathVariable("id")int id){
        return veiculoService.buscarVeiculoPorId(id);
    }
}