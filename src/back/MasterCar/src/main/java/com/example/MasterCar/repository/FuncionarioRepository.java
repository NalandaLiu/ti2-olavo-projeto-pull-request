package com.example.MasterCar.repository;

import com.example.MasterCar.dto.FuncionarioDto;
import com.example.MasterCar.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByCpf(String cpf);
    Optional<Funcionario> findByEmail(String email);

    void deleteByCpf(String cpf);

}