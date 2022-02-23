package com.nurgunmakarov.studweblab4.validation.impl;

import com.nurgunmakarov.studweblab4.network.request.RegisterRequest;
import com.nurgunmakarov.studweblab4.validation.AuthValidator;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class AuthValidatorImpl implements AuthValidator {
    @Override
    public Optional<String> check(RegisterRequest request) {
        if (Objects.equals(request.getUsername(), "") || Objects.equals(request.getPassword(), ""))
            return Optional.of("The username and password cannot be empty");
        return Optional.empty();
    }
}
