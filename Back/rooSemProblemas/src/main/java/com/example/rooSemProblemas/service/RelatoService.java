package com.example.rooSemProblemas.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rooSemProblemas.DTO.RelatosDTO;
import com.example.rooSemProblemas.models.Relatos;
import com.example.rooSemProblemas.models.Usuario;
import com.example.rooSemProblemas.repository.RelatosRepository;
import com.example.rooSemProblemas.repository.UsuarioRepository;

@Service
public class RelatoService {

    @Autowired
    private RelatosRepository relatosRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<RelatosDTO> listarTodos() {
        List<Relatos> lista = relatosRepository.findAll();
        return lista.stream().map(RelatosDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public RelatosDTO cadastrar(String titulo, String descricao, String enderecoTexto, Boolean anonimo, Long usuarioId) {
        Relatos relato = new Relatos();
        relato.setTitulo(titulo);
        relato.setDescricao(descricao);
        relato.setEnderecoTexto(enderecoTexto);
        relato.setAnonimo(anonimo != null ? anonimo : false);
        relato.setData(LocalDate.now());

        if (usuarioId != null) {
            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
            relato.setUsuario(usuario);
        }

        relato = relatosRepository.save(relato);
        return new RelatosDTO(relato);
    }
}