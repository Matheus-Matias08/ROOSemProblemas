package com.example.rooSemProblemas.models;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "curtidas_relato")
public class CurtidaRelato implements Serializable{

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private LocalDate data_curtida;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_relatos")
    private Relatos relatos;
    
}