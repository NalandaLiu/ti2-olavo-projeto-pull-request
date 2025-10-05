package com.example.MasterCar.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.MasterCar.model.UserModel;


public interface UserRepository extends JpaRepository<UserModel, UUID>{
    UserDetails findByEmail(String email);
}