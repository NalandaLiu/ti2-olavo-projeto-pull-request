package com.example.MasterCar.service;
import java.sql.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.MasterCar.dto.AuthetinticationDto;
import com.example.MasterCar.dto.LoginResponseDto;
import com.example.MasterCar.dto.RegisterDto;
import com.example.MasterCar.model.UserModel;
import com.example.MasterCar.repository.UserRepository;
import com.example.MasterCar.security.TokenService;
import jakarta.validation.Valid;

@Service
public class AuthorizationService implements UserDetailsService{
    @Autowired
    private ApplicationContext context;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    private AuthenticationManager authenticationManager;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    } 

    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto data){
        authenticationManager = context.getBean(AuthenticationManager.class);

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((UserModel) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDto(token));
    }


    public ResponseEntity<Object> register (@RequestBody RegisterDto registerDto){
        if (this.userRepository.findByEmail(registerDto.email()) != null ) return ResponseEntity.badRequest().build();
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.password());
        
        UserModel newUser = new UserModel(registerDto.email(), encryptedPassword, registerDto.role());
        newUser.setCreatedAt(new Date(System.currentTimeMillis()));
        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    
}