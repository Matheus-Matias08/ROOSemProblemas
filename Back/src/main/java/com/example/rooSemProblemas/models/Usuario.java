package com.example.rooSemProblemas.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private LocalDate data_cadastro;

    @Column(nullable = false)
    private String senha_hash;

    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco enderecos;

    @ManyToOne
    @JoinColumn(name = "id_perfil", nullable = true)
    private Perfil perfil;
    
}
