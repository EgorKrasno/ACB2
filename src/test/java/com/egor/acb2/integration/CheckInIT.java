package com.egor.acb2.integration;

import com.egor.acb2.model.CheckIn;
import com.egor.acb2.model.User;
import com.egor.acb2.repository.CheckInRepository;
import com.egor.acb2.repository.UserRepository;
import com.egor.acb2.response.CheckInRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-it.properties")
@AutoConfigureMockMvc
public class CheckInIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CheckInRepository checkInRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        User user = new User(1L, "test@test.com", "First", "Last", "123456");
        userRepository.save(user);
        User admin = new User(2L, "admin@admin.com", "Another", "User", "admin123");
        userRepository.save(admin);
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "123456", authorities = {"checkIn:create"})
    public void canSaveCheckIn() throws Exception {
        CheckInRequest checkInRequest = new CheckInRequest("y", "y", "y", "y", "Present");

        ResultActions resultActions = mockMvc.perform(post("/check/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkInRequest)));

        resultActions.andExpect(status().isCreated());
        resultActions.andExpect(content().contentType(MediaType.APPLICATION_JSON));
        resultActions.andExpect(jsonPath("$.length()", is(9)));
        resultActions.andExpect(jsonPath("$.name", is("First Last")));
        resultActions.andExpect(jsonPath("$.ac", is("Present")));
        Optional<CheckIn> savedCheckIn = checkInRepository.findByCheckInDateAndName(new Date(), "First Last");
        assertTrue(savedCheckIn.isPresent());
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "123456", authorities = {"checkIn:create"})
    public void badRequestOnBlankAcStatusResponse() throws Exception {
        CheckInRequest checkInRequest = new CheckInRequest("y", "y", "y", "y", "");

        ResultActions resultActions = mockMvc.perform(post("/check/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkInRequest)));

        resultActions.andExpect(status().isBadRequest());
        resultActions.andExpect(content().contentType(MediaType.APPLICATION_JSON));
        Optional<CheckIn> savedCheckIn = checkInRepository.findByCheckInDateAndName(new Date(), "First Last");
        assertFalse(savedCheckIn.isPresent());
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "123456", authorities = {"checkIn:create"})
    public void willOverwriteLastCheckIn() throws Exception {
        CheckInRequest checkInRequest = new CheckInRequest("n", "n", "n", "y", "Emergency");

        Date date = new Date();
        CheckIn checkIn = new CheckIn(1L, "y", "y", "y", "y", "Present", "First Last",
                date,
                date);
        checkInRepository.save(checkIn);

        ResultActions resultActions = mockMvc.perform(post("/check/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkInRequest)));

        resultActions.andExpect(status().isCreated());
        resultActions.andExpect(content().contentType(MediaType.APPLICATION_JSON));
        List<CheckIn> savedCheckIns = checkInRepository.findAll();
        assertEquals(1, savedCheckIns.size());
        assertEquals( checkInRequest.getAc(), savedCheckIns.get(0).getAc());
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "123456", authorities = {"checkIn:create"})
    public void willNotOverWritePriorDayCheckIn() throws Exception {
        CheckInRequest checkInRequest = new CheckInRequest("n", "n", "n", "y", "Emergency");


        CheckIn priorCheckIn = new CheckIn(1L, "y", "y", "y", "y", "Present", "First Last",
                new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-01"),
                new SimpleDateFormat("HH:mm").parse("16:30"));
        checkInRepository.save(priorCheckIn);

        ResultActions resultActions = mockMvc.perform(post("/check/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkInRequest)));

        resultActions.andExpect(status().isCreated());
        resultActions.andExpect(content().contentType(MediaType.APPLICATION_JSON));
        List<CheckIn> savedCheckIns = checkInRepository.findAll();
        assertEquals(2, savedCheckIns.size());
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "123456", authorities = {"checkIn:create"})
    public void returnsTrueIfAlreadyCheckedIn() throws Exception {
        Date date = new Date();
        CheckIn checkIn = new CheckIn(1L, "y", "y", "y", "y", "Present", "First Last",
                date,
                date);
        checkInRepository.save(checkIn);

        ResultActions resultActions = mockMvc.perform(get("/check/checked"));

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(content().string("true"));
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "123456", authorities = {"checkIn:create"})
    public void returnsFalseIfNotCheckedIn() throws Exception {
        CheckIn priorCheckIn = new CheckIn(1L, "y", "y", "y", "y", "Present", "First Last",
                new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-01"),
                new SimpleDateFormat("HH:mm").parse("16:30"));
        checkInRepository.save(priorCheckIn);

        ResultActions resultActions = mockMvc.perform(get("/check/checked"));

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(content().string("false"));
    }

    @Test
    @WithMockUser(username = "admin@admin.com", password = "admin123", authorities = {"checkIn:read"})
    public void returnsEveryoneCheckedInToday() throws Exception {
        Date date = new Date();
        CheckIn checkInOne = new CheckIn(1L, "y", "y", "y", "y", "Present", "First Last",
                date,
                date);

        CheckIn checkInTwo = new CheckIn(2L, "y", "y", "y", "y", "Present", "Another User",
                date,
                new SimpleDateFormat("HH:mm").parse("16:30"));

        CheckIn checkInThree = new CheckIn(3L, "y", "y", "y", "y", "Present", "First3 Last3",
                new SimpleDateFormat("yyyy-MM-dd").parse("2021-01-03"),
                new SimpleDateFormat("HH:mm").parse("16:30"));
        checkInRepository.save(checkInOne);
        checkInRepository.save(checkInTwo);
        checkInRepository.save(checkInThree);

        ResultActions resultActions = mockMvc.perform(get("/check/today"));

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(content().contentType(MediaType.APPLICATION_JSON));
        resultActions.andExpect(jsonPath("$.length()", is(2)));
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "123456", authorities = {"checkIn:create"})
    public void userAccessDashboardThrows403() throws Exception {

        ResultActions resultActions = mockMvc.perform(get("/check/today"));
        resultActions.andExpect(status().isForbidden());
    }

    @AfterEach
    void tearDown() {
        checkInRepository.deleteAll();
        userRepository.deleteAll();
    }
}
