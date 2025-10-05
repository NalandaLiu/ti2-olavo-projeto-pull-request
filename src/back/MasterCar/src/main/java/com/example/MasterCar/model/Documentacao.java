package com.example.MasterCar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Documentacao")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Documentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "idVenda", nullable = false)
    private Venda venda;

    @Column(name = "documentoPessoal")
    private String documentoPessoal;

    @Column(name = "contratoDeCompraVendaAssinado")
    private String contratoDeCompraVendaAssinado;

    @Column(name = "contratoDeCondicoesGeraisAssinado")
    private String contratoDeCondicoesGeraisAssinado;

    @Column(name = "contratoDeLgpdAssinado")
    private String contratoDeLgpdAssinado;

    @Column(name = "comprovanteDePagamento")
    private String comprovanteDePagamento;
}
