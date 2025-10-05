package com.example.MasterCar.WebConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://127.0.0.1:8080" )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
    }
}

