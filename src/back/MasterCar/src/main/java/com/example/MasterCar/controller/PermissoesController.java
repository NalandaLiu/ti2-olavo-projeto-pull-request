package com.example.MasterCar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.MasterCar.dto.PermissoesDto;
import com.example.MasterCar.service.PermissoesService;

@RestController
@RequestMapping("/permissoes")
public class PermissoesController {

    @Autowired
    PermissoesService permissoesService;

    @GetMapping(value = "/buscarPermissoes")
    public PermissoesDto buscarPermissoes(){
        PermissoesDto dto = permissoesService.listarPermissoes();
        return dto;
    }
}
