package com.nurgunmakarov.studweblab4.network.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class RefreshTokenResponse implements Serializable {
    private static final long serialVersionUID = 748392034857L;

    private String accessToken;
    private String refreshToken;
    private String tokenType;
}