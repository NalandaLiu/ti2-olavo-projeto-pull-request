package com.example.MasterCar.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MasterCar.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByCpf(String cpf);
    void deleteByCpf(String cpf);
}

