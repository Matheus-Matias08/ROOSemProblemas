package com.example.rooSemProblemas.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rooSemProblemas.models.Endereco;
import com.example.rooSemProblemas.repository.EnderecoRepository;
import com.example.rooSemProblemas.DTO.EnderecosDTO;

@Service
public class EnderecoService{

    @Autowired

    private EnderecoRepository repositoryEndereco;

    public List<Endereco> listar(){
        List<Endereco> enderecos = repositoryEndereco.findAll();
        return enderecos;
    }
    public EnderecosDTO insert(EnderecosDTO dto){
        Endereco entidade = new Endereco();
        entidade.setBairro(dto.getBairro());
        entidade.setCep(dto.getCep());
        entidade.setNumero(dto.getNumero());
        entidade.setRua(dto.getRua());
        entidade = repositoryEndereco.save(entidade);
        return new EnderecosDTO(entidade);
    }
}