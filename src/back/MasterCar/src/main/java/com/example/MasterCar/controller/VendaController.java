package com.example.MasterCar.controller;

import com.example.MasterCar.dto.ListarVendasDto;
import com.example.MasterCar.dto.VendaDto;
import com.example.MasterCar.dto.VendaIdDto;
import com.example.MasterCar.service.VendaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/venda")

public class VendaController {
    @Autowired
    private VendaService vendaService;

    @PostMapping(value = "/registrarVenda")
    public ResponseEntity<String> registrarVenda(@RequestBody VendaDto vendaDto) {
        return vendaService.criarVenda(vendaDto);
    }

    @GetMapping(value = "/listarVendas")
    public List<ListarVendasDto> buscarVendas() {
        List<ListarVendasDto> listarVendas = vendaService.buscarVendas();
        return listarVendas;
    }

    @GetMapping(value = "/buscarVenda/{id}")
    public VendaIdDto buscarVenda(@PathVariable Long id) {
        return vendaService.buscarVendaPorId(id);
    }

    @PutMapping(value = "/atualizarVenda/{id}")
    public ResponseEntity<String>atualizarVenda(@PathVariable("id") Long id, @RequestBody VendaDto vendaDto){
        return vendaService.atualizarVenda(id, vendaDto);
    }

}
