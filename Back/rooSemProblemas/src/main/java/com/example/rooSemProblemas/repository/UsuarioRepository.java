package com.example.rooSemProblemas.repository;

import com.example.rooSemProblemas.models.*;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmail(String email); //[cite: 5]
}
