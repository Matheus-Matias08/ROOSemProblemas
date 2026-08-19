package com.example.rooSemProblemas.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FotoService {

    private final Path diretorio = Paths.get("uploads/fotos");

    public FotoService() throws IOException {

        Files.createDirectories(diretorio);
    }

    public String salvar(MultipartFile arquivo) throws IOException {

        String extensao = "";

        if (arquivo.getOriginalFilename() != null
                && arquivo.getOriginalFilename().contains(".")) {

            extensao = arquivo.getOriginalFilename()
                    .substring(
                            arquivo.getOriginalFilename().lastIndexOf("."));
        }

        String nomeArquivo = UUID.randomUUID() + extensao;

        Path caminho = diretorio.resolve(nomeArquivo);

        Files.copy(
                arquivo.getInputStream(),
                caminho,
                StandardCopyOption.REPLACE_EXISTING);

        return "fotos/" + nomeArquivo;
    }
}