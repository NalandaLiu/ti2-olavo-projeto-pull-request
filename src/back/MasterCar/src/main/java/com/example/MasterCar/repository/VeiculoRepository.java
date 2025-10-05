package com.example.MasterCar.repository;

import com.example.MasterCar.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MasterCar.model.Veiculo;

import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Integer> {
    Veiculo findByChassi(String chassi);

}