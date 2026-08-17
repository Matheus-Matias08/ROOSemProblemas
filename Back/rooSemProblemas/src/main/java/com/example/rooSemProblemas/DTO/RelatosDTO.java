package com.example.rooSemProblemas.DTO;

import java.io.Serializable;
import java.time.LocalDate;

import com.example.rooSemProblemas.models.*;

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

public class RelatosDTO implements Serializable{ // serializa a classe oara import regras de negocios web
    private static final long serialVersionUID = 1L; // versão da classe para controle de serialização
    @Id //identificador para o banco de dados
    @GeneratedValue (strategy = GenerationType.IDENTITY) // gera o ID automaticamente

    private long id;

    private Boolean anonimo;

    private String descrição;

    private LocalDate data;


    public RelatosDTO ( Relatos entity){

        this.id = entity.getId();
        this.descrição = entity.getDescrição();
        this.anonimo = entity.getAnonimo();
        this.data = entity.getData();

    }
}
