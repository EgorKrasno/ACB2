package com.egor.acb2.controller;


import com.egor.acb2.exception.EmailExistsException;
import com.egor.acb2.model.User;
import com.egor.acb2.response.UserRegisterRequest;
import com.egor.acb2.security.MyUserDetailsService;
import com.egor.acb2.security.UserPrincipal;
import com.egor.acb2.utility.JwtTokenProvider;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


import static com.egor.acb2.constants.SecurityConstant.JWT_TOKEN_HEADER;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(value = "user")
public class UserController {
    private MyUserDetailsService userService;
    private JwtTokenProvider jwtTokenProvider;

    public UserController(MyUserDetailsService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserRegisterRequest request) throws  EmailExistsException {
        User newUser = userService.register(request);
        System.out.println(newUser);
        User userToLogin = new User();
        userToLogin.setUsername(request.getEmail());
        userToLogin.setPassword(request.getPassword());
        User loggedInUser = userService.login(userToLogin);

        HttpHeaders jwtHeader = getJwtHeader(new UserPrincipal(loggedInUser));
        return new ResponseEntity<>(loggedInUser, jwtHeader, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User loginUser = userService.login(user);
        HttpHeaders jwtHeader = getJwtHeader(new UserPrincipal(loginUser));
        return new ResponseEntity<>(loginUser, jwtHeader, OK);
    }
    

    private HttpHeaders getJwtHeader(UserPrincipal userPrincipal) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(userPrincipal));
        return headers;
    }


}
