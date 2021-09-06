package com.egor.acb2.security;

import com.egor.acb2.exception.EmailExistsException;
import com.egor.acb2.model.User;
import com.egor.acb2.repository.UserRepository;
import com.egor.acb2.response.UserRegisterRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

import static com.egor.acb2.enumeration.Role.ROLE_ADMIN;
import static com.egor.acb2.enumeration.Role.ROLE_USER;

@Service
@Transactional
public class MyUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager; //bean from SecurityConfig

    @Autowired
    public MyUserDetailsService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, @Lazy AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found:  " + username);
        } else {
            user.setLastLoginDate(new Date());
            userRepository.save(user);
        }
        return new UserPrincipal(user);
    }

    public User register(UserRegisterRequest request) throws EmailExistsException {
        validateUser(request);
        User newUser = new User();
        newUser.setActive(true);
        newUser.setEmail(request.getEmail().trim());
        newUser.setUsername(request.getEmail().trim()); //set email as the username also
        newUser.setFirstName(request.getFirstName().trim());
        newUser.setLastName(request.getLastName().trim());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setNotLocked(true);
        newUser.setJoinDate(new Date());

        //testing purposes, move to super admin later
        newUser.setRole(ROLE_USER.toString());
        newUser.setAuthorities(ROLE_USER.getAuthorities()); // String[]

        userRepository.save(newUser);
        return newUser;
    }

    public User login(User loginAttemptUser) {
        //Attempt to Auth, throw 400:BAD_REQUEST in ExceptionHandling
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginAttemptUser.getUsername(), loginAttemptUser.getPassword()));

        //Auth Passed
        User loginUser = userRepository.findUserByUsername(loginAttemptUser.getUsername());
        loginUser.setLastLoginDate(new Date());
        userRepository.save(loginUser);
        return loginUser;
    }

    private void validateUser(UserRegisterRequest request) throws EmailExistsException {
        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new EmailExistsException(request.getEmail().trim() + " is already taken, do you want to log in?");
        }
    }
}
