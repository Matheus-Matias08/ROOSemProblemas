package com.example.rooSemProblemas.DTO;

import java.io.Serializable;
import java.time.LocalDate;

import com.example.rooSemProblemas.models.CurtidaRelato;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CurtidasRelatosDTO implements Serializable{ // serializa a classe oara import regras de negocios web
  private static final long serialVersionUID = 1L; // versão da classe para controle de serialização
  @Id //identificador para o banco de dados
  @GeneratedValue (strategy = GenerationType.IDENTITY) // gera o ID automaticametne
  private LocalDate data_curtida;

  public CurtidasRelatosDTO( CurtidaRelato entity){
    this.data_curtida = entity.getData_curtida();

  }
}
