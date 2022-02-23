package com.nurgunmakarov.studweblab4.service;

import com.nurgunmakarov.studweblab4.model.entities.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
    Optional<String> create(Long userId);

    int deleteByUserId(Long userId);

    Optional<String> updateRefreshToken(Long userId);

    Optional<RefreshToken> findByRefreshTokenString(String refreshTokenString);
}
