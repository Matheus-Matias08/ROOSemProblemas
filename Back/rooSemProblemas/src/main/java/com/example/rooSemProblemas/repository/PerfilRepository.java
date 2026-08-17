package com.example.rooSemProblemas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.rooSemProblemas.models.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long>{
    
}
