package com.egor.acb2.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.egor.acb2.constants.SecurityConstant;
import com.egor.acb2.utility.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public JwtAuthFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getMethod().equalsIgnoreCase(SecurityConstant.OPTIONS_HTTP_METHOD)){ //"OPTIONS"
            response.setStatus(HttpStatus.OK.value());
        } else {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if(authHeader == null || !authHeader.startsWith(SecurityConstant.TOKEN_PREFIX)){
                filterChain.doFilter(request, response); //go to next filter
                return;
            }

            DecodedJWT token = jwtTokenProvider.verifyToken(authHeader);
            //Authentication Failed
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }
            String username = jwtTokenProvider.getSubject(token);

            //Check is token has a username and is not expired
            if(jwtTokenProvider.isTokenValid(username, token)){
                //pull authorities
                List<GrantedAuthority> authorities = jwtTokenProvider.getAuthorities(token);
                Authentication authentication = jwtTokenProvider.getAuthentication(username, authorities, request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                SecurityContextHolder.clearContext();
            }
            filterChain.doFilter(request, response);
        }
    }
}
