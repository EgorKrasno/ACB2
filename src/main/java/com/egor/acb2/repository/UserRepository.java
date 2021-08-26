package com.egor.acb2.repository;

import com.egor.acb2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);
    User findUserByEmail(String email);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
