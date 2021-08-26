package com.egor.acb2.constants;

public class Authority {
    public static final String[] USER_AUTHORITIES = {"content:read"};
    public static final String[] ADMIN_AUTHORITIES = {"content:read, user:read, user:create, user:update, user:delete"};
    public static final String[] SUPER_ADMIN_AUTHORITIES = {"content:read", "content:update","user:create", "user:read", "user:update", "user:delete"};

}
