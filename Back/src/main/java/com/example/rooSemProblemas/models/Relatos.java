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
public class Relatos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private Boolean anonimo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    // NOVO CAMPO: guarda a string vinda do GPS/input do app
    @Column
    private String enderecoTexto; 

    @Column(nullable = false)
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco enderecos;

    @ManyToMany
    @JoinTable(
        name = "relato_categoria",
        joinColumns = @JoinColumn(name = "relato_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private List<Categoria> categorias;

    @OneToMany(mappedBy = "relatos", cascade = CascadeType.ALL)
    private List<Comentario> comentarios;

    @OneToMany(mappedBy = "relatos", cascade = CascadeType.ALL)
    private List<Foto> fotos;
}