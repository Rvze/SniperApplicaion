package com.nurgunmakarov.studweblab4.network.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
public class JwtTokenResponse {
    private String accessToken;

    private String tokenType;

    private String refreshToken;

    private Long userId;

    private String username;

    private Collection<String> roles;

}
