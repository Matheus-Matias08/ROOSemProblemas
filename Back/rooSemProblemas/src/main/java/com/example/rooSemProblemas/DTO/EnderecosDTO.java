package com.example.rooSemProblemas.DTO;

import java.io.Serializable;

import com.example.rooSemProblemas.models.Endereco;

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

public class EnderecosDTO implements Serializable{ // serializa a classe oara import regras de negocios web
  private static final long serialVersionUID = 1L; // versão da classe para controle de serialização
  @Id //identificador para o banco de dados
  @GeneratedValue (strategy = GenerationType.IDENTITY) // gera o ID automaticametne
  private long id;
 
  private String cep;

  private String bairro;

  private String rua;
  
  private String cidade;

  private String estado;

  private String numero;

  public EnderecosDTO( Endereco entity){
    this.id = entity.getId();
    this.cep = entity.getCep();
    this.bairro = entity.getBairro();
    this.rua = entity.getRua();
    this.numero = entity.getNumero();
  }
}
