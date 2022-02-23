package com.nurgunmakarov.studweblab4.controller;

import com.nurgunmakarov.studweblab4.model.UserRole;
import com.nurgunmakarov.studweblab4.model.entities.User;
import com.nurgunmakarov.studweblab4.network.UserDTO;
import com.nurgunmakarov.studweblab4.network.request.RegisterRequest;
import com.nurgunmakarov.studweblab4.network.response.MessageResponse;
import com.nurgunmakarov.studweblab4.repository.RefreshTokenRepository;
import com.nurgunmakarov.studweblab4.repository.RoleRepository;
import com.nurgunmakarov.studweblab4.security.jwt.JwtTokenProvider;
import com.nurgunmakarov.studweblab4.service.RefreshTokenService;
import com.nurgunmakarov.studweblab4.service.UserService;
import com.nurgunmakarov.studweblab4.validation.AuthValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("weblab4/users")
@Slf4j
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

    @PostMapping(value = "/register")
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
}
