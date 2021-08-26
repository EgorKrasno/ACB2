package com.egor.acb2.enumeration;

import static com.egor.acb2.constants.Authority.*;

public enum Role {

    //Each enum has a list of Strings associated with it
    ROLE_USER(USER_AUTHORITIES),
    ROLE_ADMIN(ADMIN_AUTHORITIES),
    ROLE_SUPER_ADMIN(SUPER_ADMIN_AUTHORITIES);

    //Create a role with the specific list of strings, unknown number of strings
    private String[] authorities;

    Role(String... authorities) {
        this.authorities = authorities;
    }

    public String[] getAuthorities() { //pull values from the ENUM
        return authorities;
    }
}
