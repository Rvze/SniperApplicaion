package com.nurgunmakarov.studweblab4.security.jwt;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.ProviderException;

@Component
@Slf4j
@AllArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        logger.info("do filter...");
        String token = jwtTokenProvider.resolveToken(request);
        logger.info(token);
        try {
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication authentication = jwtTokenProvider.getAuth(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ProviderException e) {
            e.printStackTrace();
        } catch (Exception e) {
            logger.info("Недостаточно прав");
            SecurityContextHolder.clearContext();
            response.resetBuffer();
        }

        filterChain.doFilter(request, response);
    }
}
