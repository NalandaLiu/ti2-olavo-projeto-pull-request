package com.example.MasterCar.model;

import com.example.MasterCar.enums.PagamentoTipos;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Pagamento")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "idVenda", nullable = false, unique = true)
    private Venda venda;

    @Column(nullable = false)
    @Min(0)
    private float valor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PagamentoTipos tipo;

    @Column(nullable = false)
    private float desconto;

    @OneToOne
    @JoinColumn(name = "idVu")
    private Veiculo vu;

}
