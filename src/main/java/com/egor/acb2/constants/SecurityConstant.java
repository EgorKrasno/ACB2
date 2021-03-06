package com.egor.acb2.constants;

public class SecurityConstant {
    public static final long EXPIRATION_TIME = 432_000_000;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String ISSUER = "ACB2";
    public static final String AUDIENCE = "www.ACB2.com";
    public static final String AUTHORITIES = "authorities";
    public static final String UNAUTHENTICATED_MESSAGE = "You need to log in to access this page";
    public static final String FORBIDDEN_MESSAGE = "You do not have permission to access this page";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    public static final String[] PUBLIC_URLS = {"/user/login", "/user/register", "/login", "/", "/signup", "/dashboard", "/static/**", "/manifest.json", "/*.png"};
}
