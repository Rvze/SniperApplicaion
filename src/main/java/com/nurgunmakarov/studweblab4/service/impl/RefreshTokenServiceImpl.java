package com.nurgunmakarov.studweblab4.service.impl;

import com.nurgunmakarov.studweblab4.model.entities.RefreshToken;
import com.nurgunmakarov.studweblab4.model.entities.User;
import com.nurgunmakarov.studweblab4.repository.RefreshTokenRepository;
import com.nurgunmakarov.studweblab4.repository.UserRepository;
import com.nurgunmakarov.studweblab4.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public Optional<String> create(Long userId) {
        RefreshToken refreshToken = new RefreshToken();
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent())
            refreshToken.setUser(userOptional.get());
        else
            return Optional.empty();
        String tokenData = UUID.randomUUID().toString();
        refreshToken.setRefreshToken(tokenData);

        refreshTokenRepository.save(refreshToken);
        return Optional.of(tokenData);
    }

    @Override
    public int deleteByUserId(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.map(refreshTokenRepository::deleteByUser).orElse(0);
    }

    @Override
    public Optional<String> updateRefreshToken(Long userId) {
        this.deleteByUserId(userId);
        return this.create(userId);
    }

    @Override
    public Optional<RefreshToken> findByRefreshTokenString(String refreshTokenString) {
        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshTokenString);
        if (token == null)
            return Optional.empty();
        return Optional.of(token);
    }
}
