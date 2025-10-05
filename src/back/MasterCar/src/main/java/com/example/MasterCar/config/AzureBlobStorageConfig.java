package com.example.MasterCar.config;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureBlobStorageConfig {

    @Value("${spring.cloud.azure.storage.account-name}")
    private String accountName;

    @Value("${spring.cloud.azure.storage.account-key}")
    private String accountKey;

    @Value("${spring.cloud.azure.storage.blob.container-name}")
    private String containerName;

    @Bean
    public BlobServiceClient blobServiceClient() {
        String connectStr = "DefaultEndpointsProtocol=https;" +
                "AccountName=" + accountName + ";" +
                "AccountKey=" + accountKey + ";" +
                "EndpointSuffix=core.windows.net";
        return new BlobServiceClientBuilder().connectionString(connectStr).buildClient();
    }

    @Bean
    public BlobContainerClient blobContainerClient() {
        return blobServiceClient().getBlobContainerClient(containerName);
    }
}