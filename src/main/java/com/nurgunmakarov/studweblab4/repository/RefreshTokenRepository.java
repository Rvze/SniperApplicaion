package com.nurgunmakarov.studweblab4.repository;

import com.nurgunmakarov.studweblab4.model.entities.RefreshToken;
import com.nurgunmakarov.studweblab4.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    @Transactional
    int deleteByUser(User user);

    RefreshToken findByRefreshToken(String refreshToken);
}
