package com.example.rooSemProblemas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rooSemProblemas.models.Perfil;
import com.example.rooSemProblemas.repository.PerfilRepository;

import jakarta.annotation.PostConstruct;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    @PostConstruct
    public void criarPerfis() {

        if (perfilRepository.count() == 0) {
            Perfil admin = new Perfil();
            admin.setNome("ADMIN");

            Perfil usuario = new Perfil();
            usuario.setNome("USUARIO");

            perfilRepository.save(admin);
            perfilRepository.save(usuario);
        }
    }
}