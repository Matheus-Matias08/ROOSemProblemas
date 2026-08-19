package com.example.rooSemProblemas.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.rooSemProblemas.DTO.RelatosDTO;
import com.example.rooSemProblemas.models.Foto;
import com.example.rooSemProblemas.models.Relatos;
import com.example.rooSemProblemas.models.Usuario;
import com.example.rooSemProblemas.repository.FotoRepository;
import com.example.rooSemProblemas.repository.RelatosRepository;
import com.example.rooSemProblemas.repository.UsuarioRepository;

@Service
public class RelatoService {

    @Autowired
    private RelatosRepository relatosRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FotoRepository fotoRepository;

    @Autowired
    private FotoService fotoService;

    @Transactional(readOnly = true)
    public List<RelatosDTO> listarTodos() {

        List<Relatos> lista = relatosRepository.findAll();

        return lista.stream()
                .map(RelatosDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public RelatosDTO cadastrar(
            String titulo,
            String descricao,
            String enderecoTexto,
            Boolean anonimo,
            Long usuarioId,
            MultipartFile arquivoFoto) {

        Relatos relato = new Relatos();

        relato.setTitulo(titulo);
        relato.setDescricao(descricao);
        relato.setEnderecoTexto(enderecoTexto);
        relato.setAnonimo(anonimo != null ? anonimo : false);
        relato.setData(LocalDate.now());

        // Busca o usuário, caso tenha sido informado
        if (usuarioId != null) {

            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

            relato.setUsuario(usuario);
        }

        // Primeiro salva o relato
        relato = relatosRepository.save(relato);

        // Depois verifica se foi enviada uma foto
        if (arquivoFoto != null && !arquivoFoto.isEmpty()) {

            try {

                // Salva o arquivo fisicamente
                String caminho = fotoService.salvar(arquivoFoto);

                // Cria o registro da foto no banco
                Foto foto = new Foto();

                foto.setCaminho(caminho);
                foto.setRelatos(relato);

                fotoRepository.save(foto);

            } catch (IOException e) {

                throw new RuntimeException(
                        "Erro ao salvar a foto.");
            }
        }

        return new RelatosDTO(relato);
    }
}