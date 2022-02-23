package com.nurgunmakarov.studweblab4.security;

import com.nurgunmakarov.studweblab4.model.UserRole;
import com.nurgunmakarov.studweblab4.security.jwt.JwtConfigurer;
import com.nurgunmakarov.studweblab4.security.jwt.JwtTokenProvider;
import com.nurgunmakarov.studweblab4.security.userDetails.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

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
        http.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/*").permitAll()
                .antMatchers("/weblab4/users/**").permitAll()
                .antMatchers("/weblab4/points/check/*").hasAnyAuthority(
                        UserRole.ROLE_USER.getAuthority()
                )
                .antMatchers("/weblab4/points/get/*").hasAnyAuthority(
                        UserRole.ROLE_USER.getAuthority()
                )
                .antMatchers("/weblab4/points/clear/*").hasAnyAuthority(
                        UserRole.ROLE_USER.getAuthority()
                )
                .anyRequest().authenticated();
        http.apply(new JwtConfigurer(jwtTokenProvider));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }
}
