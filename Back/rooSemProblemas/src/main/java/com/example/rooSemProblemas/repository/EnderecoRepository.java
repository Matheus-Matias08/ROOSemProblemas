package com.example.rooSemProblemas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.rooSemProblemas.models.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long>{

}
