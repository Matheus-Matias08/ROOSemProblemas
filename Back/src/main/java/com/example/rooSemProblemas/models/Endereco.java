package com.example.rooSemProblemas.models;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "endereco")
public class Endereco implements Serializable{
    private static final long serialVersionUID =1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private String numero;

    @Column(nullable = false)
    private String bairro;
}
