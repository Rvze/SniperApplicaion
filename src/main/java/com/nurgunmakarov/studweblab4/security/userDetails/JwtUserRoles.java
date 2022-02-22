package com.nurgunmakarov.studweblab4.security.userDetails;

import org.springframework.security.core.GrantedAuthority;

public enum JwtUserRoles implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
