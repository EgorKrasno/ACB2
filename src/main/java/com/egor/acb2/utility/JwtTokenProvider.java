package com.egor.acb2.utility;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.egor.acb2.constants.SecurityConstant;
import com.egor.acb2.security.UserPrincipal;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.egor.acb2.constants.SecurityConstant.*;
import static java.util.Arrays.stream;

@Component
public class JwtTokenProvider {
    @Value("${JWT}")
    private String secret;

    public String generateJwtToken(UserPrincipal userPrincipal) {
        String[] claims = getClaimsFromUser(userPrincipal);
        return JWT.create()
                .withIssuer(ISSUER)
                .withAudience(AUDIENCE)
                .withIssuedAt(new Date())
                .withSubject(userPrincipal.getUsername())
                .withArrayClaim("authorities", claims)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    public List<GrantedAuthority> getAuthorities(DecodedJWT token) {
        String[] claims = getClaimsFromToken(token);
        return stream(claims).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    private String[] getClaimsFromToken(DecodedJWT token) {
        return token.getClaim(AUTHORITIES).asArray(String.class); //returns array[] of strings
    }

    private String[] getClaimsFromUser(UserPrincipal userPrincipal) {
        List<String> authorities = new ArrayList<>();
        for (GrantedAuthority grantedAuthority : userPrincipal.getAuthorities()) {
            authorities.add(grantedAuthority.getAuthority());
        }
        return authorities.toArray(new String[0]);
    }

    public String getSubject(DecodedJWT token) {
        return token.getSubject();
    }

    public Authentication getAuthentication(String username, List<GrantedAuthority> authorities, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);

        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //setting up spring security context details
        return usernamePasswordAuthenticationToken;
    }

    public boolean isTokenValid(String username, DecodedJWT token) {
        return StringUtils.isNotEmpty(username) && !isTokenExpired(token); //username exists and token not expired
    }

    public DecodedJWT verifyToken(String authHeader) {
        String token = authHeader.substring(SecurityConstant.TOKEN_PREFIX.length());
        JWTVerifier verifier = getVerifier();
        try {
            return verifier.verify(token);
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    private boolean isTokenExpired(DecodedJWT token) {
        return token.getExpiresAt().before(new Date()); //return true is token expired before today
    }

    private JWTVerifier getVerifier() {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        return JWT.require(algorithm).withIssuer(ISSUER).build();
    }
}
