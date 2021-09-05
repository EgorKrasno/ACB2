package com.egor.acb2.constants;

public class Authority {
    public static final String[] USER_AUTHORITIES = {"checkIn:create"};
    public static final String[] ADMIN_AUTHORITIES = {"checkIn:create", "checkIn:read"};
    public static final String[] SUPER_ADMIN_AUTHORITIES = {"checkIn:create", "checkIn:read", "user:create", "user:read", "user:update", "user:delete"};
}
