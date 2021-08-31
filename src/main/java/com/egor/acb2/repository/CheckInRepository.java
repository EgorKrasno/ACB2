package com.egor.acb2.repository;

import com.egor.acb2.model.CheckIn;
import com.egor.acb2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {
    List<CheckIn> findAllByCheckInDate(Date publicationDate);

    List<CheckIn> findAllByCheckInTimeBetween(
            Date checkInTimeStart,
            Date checkInTimeEnd);
}
