package com.nurgunmakarov.studweblab4.network.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class RefreshTokenRequest implements Serializable {
    private static final long serialVersionUID = 2580297518975918L;

    private String refreshToken;
}
