package com.egor.acb2.repository;

import com.egor.acb2.model.CheckIn;
import com.egor.acb2.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class CheckInRepositoryTest {

    @Autowired
    private CheckInRepository underTest;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() throws ParseException {
        User user = new User(1L, "test@test.com", "First", "Last", "password");
        userRepository.save(user);

        CheckIn checkInOne = new CheckIn(1L, "y", "y", "y", "y", "Present", "first1 last1",
                new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-01"),
                new SimpleDateFormat("HH:mm").parse("16:30"));

        CheckIn checkInTwo = new CheckIn(2L, "y", "y", "y", "y", "Present", "first2 last2",
                new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-01"),
                new SimpleDateFormat("HH:mm").parse("16:30"));

        CheckIn checkInThree = new CheckIn(3L, "y", "y", "y", "y", "Present", "first3 last3",
                new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-02"),
                new SimpleDateFormat("HH:mm").parse("16:30"));

        CheckIn checkInFour = new CheckIn(4L, "y", "y", "y", "y", "Present", "first4 last4",
                new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-03"),
                new SimpleDateFormat("HH:mm").parse("16:30"));

        underTest.save(checkInOne);
        underTest.save(checkInTwo);
        underTest.save(checkInThree);
        underTest.save(checkInFour);
    }

    @Test
    void findAllByCheckInDate() throws ParseException {
        List<CheckIn> result = underTest.findAllByCheckInDate(
                (new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-01")));

        assertEquals(2, result.size());
        assertTrue(result.stream().map(CheckIn::getId).allMatch(id -> Arrays.asList(1L, 2L).contains(id)));
    }

    @Test
    void findByCheckInDateAndName() throws ParseException {
        Optional<CheckIn> result = underTest.findByCheckInDateAndName(
                (new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-02")), "first3 last3");

        assertTrue(result.isPresent());
        assertEquals(3L,result.get().getId());
    }

    @Test
    @DisplayName("Finds nothing based on non existing date but valid username")
    void findByCheckInDateAndNameNotFound() throws ParseException {
        Optional<CheckIn> result = underTest.findByCheckInDateAndName(
                (new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-05")), "first3 last3");

        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("Finds nothing based on correct date but non existing username")
    void findByCheckInDateAndNameNotFound2() throws ParseException {
        Optional<CheckIn> result = underTest.findByCheckInDateAndName(
                (new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-01")), "No Username");

        assertFalse(result.isPresent());
    }
}