package com.example.rooSemProblemas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rooSemProblemas.DTO.LoginDTO; // Crie esta DTO se ainda não tiver
import com.example.rooSemProblemas.DTO.UsuarioDTO;
import com.example.rooSemProblemas.models.Usuario;
import com.example.rooSemProblemas.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuarios")
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  @GetMapping("/listar")
  public List<Usuario> Listar() {
    return usuarioService.listar();
  }

  @PostMapping("/cadastrar")
  public UsuarioDTO insert(@RequestBody UsuarioDTO dto) {
    System.out.println("Novo Cadastro:" + dto);
    return usuarioService.insert(dto);
  }

  // ADICIONE ESTE MÉTODO ABAIXO
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
    try {
      var response = usuarioService.login(dto);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
  }
}