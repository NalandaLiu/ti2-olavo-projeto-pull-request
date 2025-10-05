package com.example.MasterCar.model;

import jakarta.persistence.*;
import lombok.*;

@Table (name ="Veiculos")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdVeiculo", unique = true, nullable = false)
    private int idVeiculo;

    @Column(name = "Chassi", nullable = false, length = 17, unique = true)
    private String chassi;

    @Column(name = "Placa", nullable = false, length = 50, unique = true)
    private String placa;

    @Column(name = "EstadoDoVeiculo", nullable = false, length = 50)
    private String estadoDoVeiculo;

    @Column(name = "Marca", nullable = false, length = 50)
    private String marca;

    @Column(name = "Ano", nullable = false)
    private String ano;

    @Column(name = "Quilometragem", nullable = false)
    private String quilometragem;

    @Column(name = "Cor", nullable = false, length = 30)
    private String cor;

    @Column(name = "Modelo", nullable = false, length = 50)
    private String modelo;

    @Column(name = "Preco", nullable = false)
    private String preco;

    @Column (name = "Reservado")
    private  Boolean disponivel = true;

    @ManyToOne
    @JoinColumn(name = "IdVenda")
    private Venda venda;



    public Veiculo(Veiculo veiculo) {
        this.idVeiculo = veiculo.getIdVeiculo();
        this.chassi = veiculo.getChassi();
        this.placa = veiculo.getPlaca();
        this.estadoDoVeiculo = veiculo.getEstadoDoVeiculo();
        this.marca = veiculo.getMarca();
        this.ano = veiculo.getAno();
        this.quilometragem = veiculo.getQuilometragem();
        this.cor = veiculo.getCor();
        this.modelo = veiculo.getModelo();
        this.preco = veiculo.getPreco();
        this.disponivel = veiculo.getDisponivel();
        this.venda = veiculo.getVenda();
    }
    
}
