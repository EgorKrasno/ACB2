package com.egor.acb2.security;

import com.egor.acb2.enumeration.Role;
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

    @Override //Called by AythenticationProvider for authentication
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) { //User auth succesfull, find his username
            throw new UsernameNotFoundException("Username not found:  " + username);
        } else {
            //Username was correct but password was not
            user.setLastLoginDate(new Date());
            userRepository.save(user);
        }
        return new UserPrincipal(user);
    }

    public User register(UserRegisterRequest request) throws EmailExistsException {
        validateUser(request);
        User newUser = new User();
        newUser.setActive(true);
        newUser.setEmail(request.getEmail());
        newUser.setUsername(request.getEmail());
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setNotLocked(true);
        newUser.setJoinDate(new Date());
        newUser.setRole(ROLE_ADMIN.toString()); //returns ROLE_USER
        newUser.setAuthorities(ROLE_ADMIN.getAuthorities()); // String[]

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
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailExistsException(request.getEmail() + " is already taken, do you want to log in?");
        }
    }
}
