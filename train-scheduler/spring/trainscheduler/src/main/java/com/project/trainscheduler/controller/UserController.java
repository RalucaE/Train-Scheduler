package com.project.trainscheduler.controller;


import com.project.trainscheduler.entity.*;
import com.project.trainscheduler.payload.request.BuyTicketRequest;
import com.project.trainscheduler.dto.UserDto;
import com.project.trainscheduler.payload.request.SignupRequest;
import com.project.trainscheduler.payload.response.BuyTicketResponse;
import com.project.trainscheduler.payload.response.JwtResponse;
import com.project.trainscheduler.payload.response.MessageResponse;
import com.project.trainscheduler.repository.ConfirmationTokenRepository;
import com.project.trainscheduler.repository.RoleRepository;
import com.project.trainscheduler.repository.TicketHistoryRepository;
import com.project.trainscheduler.repository.UserRepository;
import com.project.trainscheduler.security.jwt.JwtUtils;
import com.project.trainscheduler.security.services.RefreshTokenService;
import com.project.trainscheduler.security.services.UserDetailsImpl;
import com.project.trainscheduler.service.EmailSenderService;
import com.project.trainscheduler.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserService userService;

    @Autowired
    private TicketHistoryRepository ticketHistoryRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailSenderService emailSenderService;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody User loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//        if(!userDetails.getValidation()){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }

        String accessToken = jwtUtils.generateJwtToken(userDetails, 1800000L);

        String refreshToken = jwtUtils.generateJwtToken(userDetails, 86400000L);

        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userDetails.getEmail()));

        refreshTokenService.createRefreshToken(user, refreshToken);

        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        System.out.println(user);

        return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken, userDetails.getId(),
                userDetails.getUsername(), userDetails.getEmail(), roles, userDetails.getValidation() != null ? user.getValidation() : false));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user account
        User user = new User(signupRequest.getUsername(),
                signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);
        user.setValidation(false);
        userRepository.save(user);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );

        confirmationTokenRepository.save(confirmationToken);

        String link = "http://localhost:4200/account-confirmation";
        emailSenderService.send(user.getEmail(), buildEmail(user.getUsername(), link));

        return ResponseEntity.ok(new MessageResponse(token));
    }

    private String buildEmail(String name, String link) {
        return "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"background-color: #d6d6d5;\">\n" +
                "  <tr>\n" +
                "    <td align=\"center\">\n" +
                "      <table width=\"80%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff;\">\n" +
                "        <tr>\n" +
                "          <td bgcolor=\"#000000\" style=\"text-align: left; padding: 20px 10px;\">\n" +
                "            <span style=\"font-family: Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff;\">Train-Scheduler</span>\n" +
                "          </td>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "          <td style=\"text-align: left; padding: 15px;\">\n" +
                "            <div style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px; color: #0b0c0c;\">\n" +
                "              <p style=\"Margin: 0 0 20px 0; font-size: 19px; line-height: 25px; color: #0b0c0c;\">\n" +
                "                Hi " + name + ",</p>\n" +
                "              <p style=\"Margin: 0 0 20px 0; font-size: 19px; line-height: 25px; color: #0b0c0c;\">\n" +
                "                Thank you for registering. Please click on the below link to activate your account: </p>\n" +
                "              <p style=\"Margin: 0 0 20px 0; font-size: 19px; line-height: 25px; color: #0b0c0c;\">\n" +
                "                <a href=\"" + link + "\">Activate Now</a></p>\n" +
                "              <p style=\"Margin: 0 0 20px 0; font-size: 19px; line-height: 25px; color: #0b0c0c;\">\n" +
                "                Link will expire in 15 minutes.</p>\n" +
                "             " +
                "            </div>\n" +
                "          </td>\n" +
                "        </tr>\n" +
                "      </table>\n" +
                "    </td>\n" +
                "  </tr>\n" +
                "</table>";
    }


    @GetMapping(path = "confirm")
    public ResponseEntity<?> confirmAccount(@RequestParam("token") String token) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByConfirmationToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found."));

        if (confirmationToken.getConfirmedAt() != null) {
            return ResponseEntity.badRequest().body("Email already confirmed.");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiredAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expired.");
        }

        confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
        userRepository.enableAppUser(confirmationToken.getUser().getEmail());
        return ResponseEntity.ok(new MessageResponse("Your email has been confirmed."));
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@Valid @RequestHeader(value = "Authorization") String token) {
        token = token.split(" ")[1].trim();
        if (jwtUtils.validateJwtToken(token)) {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserDto userDto = userService.getUserInfo(userDetails.getEmail());
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("User is not logged in."));
        }
    }

    @PutMapping("/user-info")
    public ResponseEntity<Void> updateUserInfo(
            @Valid @RequestHeader(value = "Authorization") String token,
            @RequestBody UserDto userDto
    ) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.updateUserInfo(userDetails.getEmail(), userDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser(@Valid @RequestHeader(value = "Authorization") String token) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id = userDetails.getId();
        refreshTokenService.deleteByUserId(id);
        return ResponseEntity.ok(new MessageResponse("Log out successful."));
    }

    @GetMapping("/isLoggedIn")
    public ResponseEntity<?> isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(new MessageResponse("User is logged in."));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User is not logged in."));
        }
    }

    @PostMapping("/checkStudentId")
    public ResponseEntity<?> checkStudentIdExists(@RequestBody Map<String, String> studentId) {
        boolean checkStudentId = false;
        checkStudentId = userRepository.existsByStudentId(studentId.get("studentId"));
        if (checkStudentId) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Student ID not found."));
        }
    }

    @PostMapping("/checkPupilId")
    public ResponseEntity<?> checkPupilIdExists(@RequestBody Map<String, String> pupilId) {
        boolean checkPupilId = false;
        checkPupilId = userRepository.existsByPupilId(pupilId.get("pupilId"));
        if (checkPupilId) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Pupil ID not found."));
        }
    }


    @GetMapping("/getUserEmail")
    public ResponseEntity<?> getUserEmail(@Valid @RequestHeader(value = "Authorization") String token) {
        token = token.split(" ")[1].trim();
        if (jwtUtils.validateJwtToken(token)) {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String email = userDetails.getEmail();
            return ResponseEntity.ok(email);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("User is not logged in"));
        }
    }

    @GetMapping("/getHistory")
    public ResponseEntity<?> getHistory() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> userOptional = userRepository.findByEmail(userDetails.getEmail());
        User user = userOptional.get();
        List<TicketHistory> ticketHistories = ticketHistoryRepository.findAllByUserId(user.getId().intValue());
        return ResponseEntity.ok(ticketHistories);
    }

}
