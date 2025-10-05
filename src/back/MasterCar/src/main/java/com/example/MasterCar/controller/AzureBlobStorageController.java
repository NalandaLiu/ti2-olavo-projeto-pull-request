package com.example.MasterCar.controller;

import com.example.MasterCar.service.AzureBlobStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/arquivos")
public class AzureBlobStorageController {

    @Autowired
    private AzureBlobStorageService azureBlobStorageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("arquivo") MultipartFile arquivo) throws IOException {
        String response = azureBlobStorageService.uploadFile(arquivo);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/{nomeDoArquivo}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String nomeDoArquivo) throws IOException, URISyntaxException {
        byte[] file = azureBlobStorageService.downloadFile(nomeDoArquivo);
        ByteArrayResource resource = new ByteArrayResource(file);

        return ResponseEntity.ok()
                .contentLength(file.length)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + nomeDoArquivo + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @GetMapping("/visualizarArquivo/{nomeDoArquivo}")
    public String visualizarArquivo(@PathVariable String nomeDoArquivo) throws IOException, URISyntaxException {
        return azureBlobStorageService.returnImgUrl(nomeDoArquivo);
    }

    @GetMapping("/listarArquivos")
    public ResponseEntity<List<String>> listAllFiles() {
        List<String> files = azureBlobStorageService.listAllFiles();
        return ResponseEntity.ok(files);
    }

    @DeleteMapping("/deletarArquivo/{nomeDoArquivo}")
    public ResponseEntity<String> deleteFile(@PathVariable String nomeDoArquivo) {
        azureBlobStorageService.deleteBlob(nomeDoArquivo);
        return ResponseEntity.ok("Arquivo deletado com sucesso!");
    }
}
