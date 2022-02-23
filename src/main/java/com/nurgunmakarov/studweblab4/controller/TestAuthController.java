package com.nurgunmakarov.studweblab4.controller;

import com.nurgunmakarov.studweblab4.exception.InvalidLoginRequestException;
import com.nurgunmakarov.studweblab4.model.UserRole;
import com.nurgunmakarov.studweblab4.model.entities.User;
import com.nurgunmakarov.studweblab4.dto.UserDTO;
import com.nurgunmakarov.studweblab4.network.request.LoginRequest;
import com.nurgunmakarov.studweblab4.network.request.RegisterRequest;
import com.nurgunmakarov.studweblab4.network.response.JwtTokenResponse;
import com.nurgunmakarov.studweblab4.network.response.MessageResponse;
import com.nurgunmakarov.studweblab4.repository.RoleRepository;
import com.nurgunmakarov.studweblab4.security.jwt.JwtTokenProvider;
import com.nurgunmakarov.studweblab4.security.userDetails.JwtUserDetails;
import com.nurgunmakarov.studweblab4.service.RefreshTokenService;
import com.nurgunmakarov.studweblab4.service.UserService;
import com.nurgunmakarov.studweblab4.validation.AuthValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.exceptions.InvalidRequestException;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/weblab4/users")
@Slf4j
@CrossOrigin
public class TestAuthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final AuthValidator authValidator;

    @Autowired
    public TestAuthController(JwtTokenProvider jwtTokenProvider,
                              AuthenticationManager authenticationManager,
                              RoleRepository roleRepository,
                              UserService userService,
                              RefreshTokenService refreshTokenService,
                              AuthValidator authValidator) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
        this.authValidator = authValidator;
    }

    @GetMapping("/findAll")
    public List<User> getUsers() {
        return userService.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        Optional<String> checkReq = authValidator.check(request);
        if (checkReq.isPresent())
            return ResponseEntity.badRequest().body(new MessageResponse(checkReq.get()));
        if (userService.findByUsername(request.getUsername()) != null)
            return ResponseEntity.badRequest().body(new MessageResponse("User already exist!"));

        UserDTO user = new UserDTO(request.getUsername(), request.getPassword());
        Set<UserRole> roleSet = new HashSet<>();
        roleSet.add(UserRole.ROLE_USER);
        user.setRoleSet(roleSet);
        return ResponseEntity.ok().body(userService.register(user));
    }

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            if (request.getUsername() == null)
                throw new InvalidLoginRequestException("The username must not be empty");
            if (request.getPassword() == null)
                throw new InvalidLoginRequestException("The password must not be empty");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            JwtUserDetails userDetails = (JwtUserDetails) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
            String accessToken = jwtTokenProvider.createToken(userDetails);

            Optional<String> refreshTokenOptional = refreshTokenService.updateRefreshToken(userDetails.getId());
            if (!refreshTokenOptional.isPresent())
                throw new InvalidLoginRequestException("User doesnt found in db");
            return ResponseEntity.status(HttpStatus.CREATED).body(new JwtTokenResponse(accessToken,
                    "Bearer",
                    refreshTokenOptional.get(),
                    userDetails.getId(),
                    userDetails.getUsername(),
                    roles)
            );
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(new MessageResponse((e.getMessage())));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid username or password"));
        }
    }


}
