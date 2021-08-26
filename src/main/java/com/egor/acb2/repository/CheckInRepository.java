package com.egor.acb2.repository;

import com.egor.acb2.model.CheckIn;
import com.egor.acb2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {
}
