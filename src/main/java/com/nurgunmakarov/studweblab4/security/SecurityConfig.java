package com.nurgunmakarov.studweblab4.security;

import com.nurgunmakarov.studweblab4.model.UserRole;
import com.nurgunmakarov.studweblab4.security.jwt.JwtFilterConfigurer;
import com.nurgunmakarov.studweblab4.security.jwt.JwtTokenProvider;
import com.nurgunmakarov.studweblab4.security.userDetails.JwtUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtUserDetailsService jwtUserDetailsService;

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers("/*").permitAll()
                .antMatchers("/built/**").permitAll()
                .antMatchers("/weblab4/users/**").permitAll()
                .antMatchers("/weblab4/points/check/*").hasAnyAuthority(
                        UserRole.ROLE_USER.getAuthority()
                )
                .antMatchers("/weblab4/points/getAll/*").hasAnyAuthority(
                        UserRole.ROLE_USER.getAuthority()
                )
                .antMatchers("/weblab4/points/clear/*").hasAnyAuthority(
                        UserRole.ROLE_USER.getAuthority()
                )
                .anyRequest().authenticated();
        http.apply(new JwtFilterConfigurer(jwtTokenProvider));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }
}
