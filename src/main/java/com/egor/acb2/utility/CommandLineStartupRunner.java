package com.egor.acb2.utility;

import com.egor.acb2.model.User;
import com.egor.acb2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;

import static com.egor.acb2.enumeration.Role.ROLE_SUPER_ADMIN;

@Component
public class CommandLineStartupRunner implements CommandLineRunner {


    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public CommandLineStartupRunner(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.existsByUsername("super@super.com")) {
            return;
        }
        User newUser = new User();
        newUser.setActive(true);
        newUser.setEmail("super@super.com");
        newUser.setUsername("super@super.com"); //set email as the username also
        newUser.setFirstName("Egor");
        newUser.setLastName("K");
        newUser.setPassword(passwordEncoder.encode("123456"));
        newUser.setNotLocked(true);
        newUser.setJoinDate(new Date());
        newUser.setRole(ROLE_SUPER_ADMIN.toString());
        newUser.setAuthorities(ROLE_SUPER_ADMIN.getAuthorities());
        userRepository.save(newUser);
    }
}
