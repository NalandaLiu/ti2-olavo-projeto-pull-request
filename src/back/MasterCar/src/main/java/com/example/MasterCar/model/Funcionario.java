package com.example.MasterCar.model;

import java.util.List;

import com.example.MasterCar.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name = "Funcionario")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idFuncionario", nullable = false, unique = true)
    private Long id;

    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column()
    private String email;

    @Column()
    private String password;

    @Column(nullable = false, length = 100)
    private String sobrenome;

    @Column(nullable = false)
    @Min(0)
    private float salario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole tipo;

    @ManyToMany(mappedBy = "funcionarios")
    private List<Venda> vendas;
}
