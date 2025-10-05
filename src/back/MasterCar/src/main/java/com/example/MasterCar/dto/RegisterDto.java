package com.example.MasterCar.dto;

import com.example.MasterCar.enums.UserRole;

import jakarta.validation.constraints.NotNull;

public record RegisterDto(@NotNull String email,@NotNull String password, @NotNull UserRole  role) {
    
}