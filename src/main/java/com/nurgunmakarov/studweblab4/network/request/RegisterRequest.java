package com.nurgunmakarov.studweblab4.network.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@ToString
public class RegisterRequest implements Serializable {
    private static final long serialVersionUID = 9834754399L;

    private String username;
    private String password;
    private List<String> roles;
}
