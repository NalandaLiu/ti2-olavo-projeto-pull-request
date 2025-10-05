package com.example.MasterCar.service;

import com.example.MasterCar.dto.FuncionarioDto;
import com.example.MasterCar.model.Funcionario;
import com.example.MasterCar.repository.FuncionarioRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public List<FuncionarioDto> listarFuncionarios() {
        return funcionarioRepository.findAll().stream().map(FuncionarioDto::new).toList();
    }

    public ResponseEntity<String> cadastrarFuncionario(FuncionarioDto funcionarioDto) {
        Funcionario funcionario = new Funcionario();
        funcionario.setCpf(funcionarioDto.cpf());
        funcionario.setNome(funcionarioDto.nome());
        funcionario.setSobrenome(funcionarioDto.sobrenome());
        funcionario.setSalario(funcionarioDto.salario());
        //funcionario.setComissao(funcionarioDto.comissao());
        funcionario.setTipo(funcionarioDto.tipo());
        //funcionario.setMatricula(funcionarioDto.matricula());

        funcionarioRepository.save(funcionario);

        return ResponseEntity.ok("Funcionario cadastrado com sucesso!");
    }

    public FuncionarioDto buscarFuncionarioPorCpf(String cpf) {
        Optional<Funcionario> funcionarioOptional = funcionarioRepository.findByCpf(cpf);
        return funcionarioOptional.map(FuncionarioDto::new).orElse(null);
    }

    public FuncionarioDto buscarFuncionarioPorEmail(String email) {
        Optional<Funcionario> funcionarioOptional = funcionarioRepository.findByEmail(email);
        return funcionarioOptional.map(FuncionarioDto::new).orElse(null);
    }


    //Metodo de deletar funcionario por id
    public ResponseEntity<String> demitirFuncionario(Long id) {
        funcionarioRepository.deleteById(id);
        return ResponseEntity.ok("Funcionario de id: " + id + " deletado com sucesso");
    }

    //Overloading - metodo de deletar funcionario por cpf
    /*public void demitirFuncionario(String cpf) {
        funcionarioRepository.deleteByCpf(cpf);
    }*/
}
