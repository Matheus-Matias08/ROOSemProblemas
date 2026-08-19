package com.example.rooSemProblemas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.rooSemProblemas.models.CurtidaRelato;

@Repository
public interface CurtidasRelatoRepository extends JpaRepository<CurtidaRelato, Long>{
    
}
