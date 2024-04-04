package com.project.trainscheduler.controller;

import com.project.trainscheduler.entity.RefreshToken;
import com.project.trainscheduler.exeption.TokenRefreshException;
import com.project.trainscheduler.payload.request.TokenRefreshRequest;
import com.project.trainscheduler.payload.response.MessageResponse;
import com.project.trainscheduler.payload.response.TokenRefreshResponse;
import com.project.trainscheduler.security.jwt.JwtUtils;
import com.project.trainscheduler.security.services.RefreshTokenService;
import com.project.trainscheduler.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class RefreshTokenController {
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        if (jwtUtils.validateJwtToken(requestRefreshToken)) {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String newAccessToken = jwtUtils.generateJwtToken(userDetails, 1800000L);
            return ResponseEntity.ok(newAccessToken);
        }

        return ResponseEntity.badRequest().body(new MessageResponse("Error: Could not validate the token!"));
    }

    @PostMapping("/verifytoken")
    public HttpStatusCode verifyToken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestVerifyToken = request.getRefreshToken();
        if (jwtUtils.validateJwtToken(requestVerifyToken)) {
            return ResponseEntity.ok("200").getStatusCode();
        }
        return ResponseEntity.badRequest().build().getStatusCode();
    }

}