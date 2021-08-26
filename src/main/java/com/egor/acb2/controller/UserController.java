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

import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/testGet")
    public Map<String, String> testGet() {
        Map<String, String> map = new HashMap<>();
        map.put("Test", "Hello World");
        return map;
    }


    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserRegisterRequest request) throws  EmailExistsException {
        User newUser = userService.register(request);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User loginUser = userService.login(user);
        HttpHeaders jwtHeader = getJwtHeader(new UserPrincipal(loginUser));
        return new ResponseEntity<>(loginUser, jwtHeader, OK);
    }
    

    //Should probably probably move this mess
    private HttpHeaders getJwtHeader(UserPrincipal userPrincipal) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(userPrincipal));
        return headers;
    }


}
