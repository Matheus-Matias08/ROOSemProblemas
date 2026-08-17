package com.example.rooSemProblemas.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "relatos")
public class Relatos implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean anonimo;

    @Column(nullable = false)
    private String descrição;

    @Column(nullable = false)
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "Enderecos")
    private Endereco enderecos;

    @OneToMany
    @JoinColumn(name = "Categoria")
    private List<Categoria> categorias;

    @OneToMany
    @JoinColumn(name = "id_comentario")
    private List<Comentario> comentarios;

    @OneToMany
    @JoinColumn(name = "id_fotos")
    private List<Foto> fotos;
}
