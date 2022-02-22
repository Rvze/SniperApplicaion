package com.nurgunmakarov.studweblab4.network.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class LoginRequest implements Serializable {

    private static final long serialVersionUID = -7438057489L;

    private String username;
    private String password;
}
