package com.example.rooSemProblemas.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rooSemProblemas.DTO.UsuarioDTO;
import com.example.rooSemProblemas.models.Endereco;
import com.example.rooSemProblemas.models.Usuario;
import com.example.rooSemProblemas.repository.EnderecoRepository;
import com.example.rooSemProblemas.repository.UsuarioRepository;

@Service                                                                                                                              
public class UsuarioService {

    @Autowired
    private EnderecoRepository enderecoRepository;
    
    @Autowired
    private UsuarioRepository repositoryUsuario;

    public List<Usuario> listar() {
        return repositoryUsuario.findAll();
    }

    @Transactional
    public UsuarioDTO insert(UsuarioDTO dto) {
        Usuario usuario = new Usuario();

        usuario.setEmail(dto.getEmail());
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        
        // Coloca a data de hoje automaticamente
        usuario.setData_cadastro(LocalDate.now());

        usuario.setSenha_hash(dto.getSenha_hash());

        // Pega o ID do endereço que acabou de ser criado e busca no banco
        if (dto.getEnderecoId() != null) {
            Endereco endereco = enderecoRepository.findById(dto.getEnderecoId())
                    .orElseThrow(() -> new RuntimeException("Endereço com ID " + dto.getEnderecoId() + " não foi encontrado."));
            
            // Atrela o endereço cadastrado ao usuário
            usuario.setEnderecos(endereco);
        }

        usuario = repositoryUsuario.save(usuario);
        return new UsuarioDTO(usuario);
    }
}