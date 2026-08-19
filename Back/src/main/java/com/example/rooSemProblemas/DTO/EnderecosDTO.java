package com.example.rooSemProblemas.DTO;

import java.io.Serializable;

import com.example.rooSemProblemas.models.Endereco;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EnderecosDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private long id;
    private String cep;
    private String bairro;
    private String rua;
    private String cidade;
    private String estado;
    private String numero;

    public EnderecosDTO(Endereco entity) {
        this.id = entity.getId();
        this.cep = entity.getCep();
        this.bairro = entity.getBairro();
        this.rua = entity.getRua();
        this.numero = entity.getNumero();
    }
}