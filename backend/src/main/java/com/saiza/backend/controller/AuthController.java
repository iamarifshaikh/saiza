package com.saiza.backend.controller;

import com.saiza.backend.model.Log;
import com.saiza.backend.model.User;
import com.saiza.backend.repository.UserRepository;
import com.saiza.backend.security.jwt.JwtUtils;
import com.saiza.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AnalyticsService analyticsService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.get("email"), loginRequest.get("password")));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

        // Log Login
        analyticsService.logEvent(Log.ActionType.LOGIN, user.getId(), user.getEmail(), null, "User Login",
                "UNKNOWN_IP");

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setRole("ROLE_USER");
        user.setPremium(false);
        user.setCourseType(null); // To be filled later
        user.setSemester(null);

        userRepository.save(user);

        analyticsService.logEvent(Log.ActionType.SIGNUP, user.getId(), user.getEmail(), null, "User Signup",
                "UNKNOWN_IP");

        return ResponseEntity.ok("User registered successfully!");
    }
}
