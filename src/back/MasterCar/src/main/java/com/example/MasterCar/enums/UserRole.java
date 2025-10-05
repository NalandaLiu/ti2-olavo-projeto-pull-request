package com.example.MasterCar.enums;

public enum UserRole {

    ADMIN("admin"),
    VENDEDOR("vendedor"),
    FINANCEIRO("financeiro");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole(){
        return role;
    }


}
