package com.example.rooSemProblemas.models;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "perfil")
public class Perfil implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

     private String nome;
}
