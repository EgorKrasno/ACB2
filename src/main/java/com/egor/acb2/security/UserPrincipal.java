package com.egor.acb2.security;

import com.egor.acb2.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class UserPrincipal implements UserDetails {
    private User user;

    public UserPrincipal(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //changed from stream(
        return Stream.of(this.user.getAuthorities()).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.isNotLocked();
    }

    @Override
    public boolean isEnabled() {
        return user.isNotLocked();
    }



    // Not Used
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    // Not Used
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
}
