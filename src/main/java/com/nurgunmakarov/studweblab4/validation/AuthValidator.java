package com.nurgunmakarov.studweblab4.validation;

import com.nurgunmakarov.studweblab4.network.request.RegisterRequest;

import java.util.Optional;

public interface AuthValidator {
    Optional<String> check(RegisterRequest request);
}
