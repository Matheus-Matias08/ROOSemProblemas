package com.example.rooSemProblemas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rooSemProblemas.DTO.UsuarioDTO;
import com.example.rooSemProblemas.models.Usuario;
import com.example.rooSemProblemas.service.UsuarioService;

@RestController //anotação de controlador para indicar que esta classe é um componente de controle de rotas e lógica de negócios relacionada a usuários
@CrossOrigin(origins = "*")
@RequestMapping("/usuarios") //mapeamento de rota para indicar que as rotas relacionadas a usuários começarão com "/users"
public class UsuarioController
 {
  @Autowired //anotação de injeção de dependência para indicar que o Spring deve injetar uma instância do UserService nesta classe
  private UsuarioService usuarioService; //declaração de uma variável do tipo UserService para

  @GetMapping("/listar")
    public List<Usuario>Listar(){
      return usuarioService.listar();
    }

  @PostMapping("/cadastrar")
    public UsuarioDTO insert(@RequestBody UsuarioDTO dto){
      System.out.println("Novo Cadastro:"+dto);
      return usuarioService.insert(dto);
    }
  }