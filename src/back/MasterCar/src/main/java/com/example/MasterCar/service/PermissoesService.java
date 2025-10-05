package com.example.MasterCar.service;

import org.springframework.stereotype.Service;

import com.example.MasterCar.dto.PermissoesDto;

@Service
public class PermissoesService {

    public PermissoesDto listarPermissoes() {
        
        PermissoesDto dto = new PermissoesDto();

        dto.setPermissaoVender(verificaSePodeVender());
        dto.setGestor(verificaIsGestor());

        return dto;
    }
    

    public Boolean verificaSePodeVender(){

        return true;
    }

    public Boolean verificaIsGestor(){

        return true;
    }
}
