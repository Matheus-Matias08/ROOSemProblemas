package com.example.rooSemProblemas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rooSemProblemas.DTO.RelatosDTO;
import com.example.rooSemProblemas.service.RelatoService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/relatos")
public class RelatosController {

    @Autowired
    private RelatoService relatosService;

    @GetMapping("/listar")
    public ResponseEntity<List<RelatosDTO>> listar() {
        List<RelatosDTO> lista = relatosService.listarTodos();
        return ResponseEntity.ok(lista);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "endereco", required = false) String endereco,
            @RequestParam("anonimo") Boolean anonimo,
            @RequestParam(value = "usuarioId", required = false) Long usuarioId
    ) {
        try {
            RelatosDTO dto = relatosService.cadastrar(titulo, descricao, endereco, anonimo, usuarioId);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}