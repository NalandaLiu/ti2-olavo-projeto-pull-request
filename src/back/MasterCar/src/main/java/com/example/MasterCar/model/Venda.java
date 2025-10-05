package com.example.MasterCar.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Vendas")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Venda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idVenda", unique = true, nullable = false)
    private Long idVenda;

    @OneToOne
    @JoinColumn(name = "idVeiculo", unique = true)
    private Veiculo idVeiculo;

    @OneToOne
    @JoinColumn(name = "IdVU", unique = true)
    private Veiculo idVU;

    @ManyToOne
    @JoinColumn(name = "cpfCliente", referencedColumnName = "CPFCliente")
    private Cliente cpfCliente;

    @Column(name = "valor")
    private double valor;

    @Column(name = "dataVenda")
    private LocalDate dataVenda;

    @Column(name = "EtapasConcluidas")
    private int etapasConcluidas;

    @Column(name = "emplacamento")
    private boolean emplacamento;

    @ManyToMany
    @JoinTable(
            name = "funcionariosDaVenda",
            joinColumns = @JoinColumn(name = "idVenda"),
            inverseJoinColumns = @JoinColumn(name = "idFuncionario")
    )
    private List<Funcionario> funcionarios;
}