package com.example.rooSemProblemas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapeia as requisições para /uploads/** para a pasta local do seu computador
        // Ajuste o caminho "C:/uploads/" caso o local onde salva as fotos seja outro
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:C:/uploads/"); 
    }
}