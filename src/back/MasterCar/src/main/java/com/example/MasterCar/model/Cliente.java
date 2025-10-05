package com.example.MasterCar.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Table(name = "Clientes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "CPFCliente", nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(name = "Nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "Sobrenome", nullable = false, length = 100)
    private String sobrenome;

    @Column(name = "Rg", nullable = false, unique = true, length = 15)
    private String RG;

    @Column(name = "Email", nullable = false, length = 100)
    private String email;

    @Column(name = "Rua", nullable = false, length = 100)
    private String rua;

    @Column(name = "Numero", nullable = false)
    private int numero;

    @Column(name = "Bairro", nullable = false, length = 100)
    private String bairro;

    @Column(name = "Cidade", nullable = false, length = 100)
    private String cidade;

    @Column(name = "Estado", nullable = false, length = 100)
    private String estado;

    @Column(name = "Cep", nullable = false, length = 9)
    private String cep;

    @Column(name = "DataNascimento", nullable = false)
    private LocalDate dataDeNascimento;

    @Column(name = "Telefone", length = 11)
    private String telefone;

    public Cliente(Cliente cliente) {
        this.id = cliente.getId();
        this.cpf = cliente.getCpf();
        this.nome = cliente.getNome();
        this.sobrenome = cliente.getSobrenome();
        this.RG = cliente.getRG();
        this.email = cliente.getEmail();
        this.rua = cliente.getRua();
        this.numero = cliente.getNumero();
        this.bairro = cliente.getBairro();
        this.cidade = cliente.getCidade();
        this.estado = cliente.getEstado();
        this.cep = cliente.getCep();
        this.dataDeNascimento = cliente.getDataDeNascimento();
        this.telefone = cliente.getTelefone();
    }

}
