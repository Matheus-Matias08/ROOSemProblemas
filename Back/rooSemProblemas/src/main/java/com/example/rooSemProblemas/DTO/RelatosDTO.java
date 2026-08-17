package com.example.rooSemProblemas.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import com.example.rooSemProblemas.models.Relatos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatosDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String titulo;
    private Boolean anonimo;
    private String descricao;
    private String enderecoTexto;
    private LocalDate data;
    private String nomeAutor;

    public RelatosDTO(Relatos entity) {
        this.id = entity.getId();
        this.titulo = entity.getTitulo();
        this.anonimo = entity.getAnonimo();
        this.descricao = entity.getDescricao();
        this.data = entity.getData();
        this.enderecoTexto = entity.getEnderecoTexto();

        // Oculta a identidade no feed se a opção "Relato Anônimo" estiver ativa
        if (Boolean.TRUE.equals(entity.getAnonimo())) {
            this.nomeAutor = "Anônimo";
        } else if (entity.getUsuario() != null) {
            this.nomeAutor = entity.getUsuario().getNome();
        } else {
            this.nomeAutor = "Usuário Desconhecido";
        }
    }
}