package com.example.rooSemProblemas.DTO;

import java.io.Serializable;
import java.time.LocalDate;

import com.example.rooSemProblemas.models.Usuario;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private long id;
    private String email;
    private String nome;
    private String cpf;
    private LocalDate data_cadastro;

    // Conecta a palavra "senha" enviada pelo celular com a variável do Java
    @JsonProperty("senha")
    private String senha_hash;

    // Conecta a palavra "idEndereco" enviada pelo celular com o enderecoId
    @JsonProperty("idEndereco")
    private Long enderecoId;

    private Long perfilId;

    public UsuarioDTO(Usuario entity) {
        this.id = entity.getId();
        this.email = entity.getEmail();
        this.nome = entity.getNome();
        this.data_cadastro = entity.getData_cadastro();
        this.cpf = entity.getCpf();
        this.senha_hash = entity.getSenha_hash();
        
        if (entity.getEnderecos() != null) {
            this.enderecoId = entity.getEnderecos().getId();
        }
        
        if (entity.getPerfil() != null) {
            this.perfilId = entity.getPerfil().getId();
        }
    }
}