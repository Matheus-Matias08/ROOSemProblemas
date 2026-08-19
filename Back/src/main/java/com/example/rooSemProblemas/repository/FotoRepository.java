package com.example.rooSemProblemas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.rooSemProblemas.models.Foto;

@Repository
public interface FotoRepository extends JpaRepository<Foto, Long> {

}