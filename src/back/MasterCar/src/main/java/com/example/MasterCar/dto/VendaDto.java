package com.example.MasterCar.dto;

import com.example.MasterCar.model.Cliente;
import com.example.MasterCar.model.Veiculo;

import lombok.Data;

@Data
public class VendaDto{

  public Cliente cliente; 
  int idVeiculo; 
  Double valor;
  public Veiculo veiculoUsado;
  public int etapasConcluidas;
  
}