package com.example.MasterCar.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.models.BlobItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AzureBlobStorageService {

    @Autowired
    private BlobContainerClient blobContainerClient;

    @Autowired
    private BlobServiceClient blobServiceClient;

    public String uploadFile(MultipartFile arquivo) throws IOException {
        BlobClient blobClient = blobContainerClient.getBlobClient(arquivo.getOriginalFilename());
        blobClient.upload(arquivo.getInputStream(), arquivo.getSize(), true);
        return "File uploaded successfully: " + arquivo.getOriginalFilename();
    }

    public void uploadFile(InputStream inputStream, String fileName, long size) throws IOException {
        BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
        blobClient.upload(inputStream, size, true);
    }

    public byte[] downloadFile(String nomeDoArquivo) throws IOException, URISyntaxException {
        BlobClient blobClient = blobContainerClient.getBlobClient(nomeDoArquivo);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        blobClient.download(outputStream);
        final byte[] bytes = outputStream.toByteArray();
        return bytes;
    }

    public List<String> listAllFiles() {
        List<String> fileNames = new ArrayList<>();
        for (BlobItem blobItem : blobContainerClient.listBlobs()) {
            fileNames.add(blobItem.getName());
        }
        return fileNames;
    }

    public String returnImgUrl(String nomeDoArquivo) {
        return blobContainerClient.getBlobClient(nomeDoArquivo).getBlobUrl();
    }

    public Boolean deleteBlob(String nomeDoArquivo) {
        BlobClient blob = blobContainerClient.getBlobClient(nomeDoArquivo);
        blob.delete();
        return true;
    }
}
