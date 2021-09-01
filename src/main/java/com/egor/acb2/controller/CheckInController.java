package com.egor.acb2.controller;

import com.egor.acb2.exception.InvalidStatusException;
import com.egor.acb2.model.CheckIn;
import com.egor.acb2.response.CheckInRequest;
import com.egor.acb2.response.TodayStatusResponse;
import com.egor.acb2.security.UserPrincipal;
import com.egor.acb2.service.CheckInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.text.ParseException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(value= "check")
public class CheckInController {

    private CheckInService checkInService;

    @Autowired
    public CheckInController(com.egor.acb2.service.CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @PostMapping("/save")
    public ResponseEntity<CheckIn> saveCheckIn(Authentication authentication, @Valid @RequestBody CheckInRequest request) throws InvalidStatusException {
        CheckIn checkIn = checkInService.saveCheckIn(request, authentication);
        return new ResponseEntity<>(checkIn, OK);
    }

    @GetMapping("/today")
    public ResponseEntity<List<TodayStatusResponse>> getTodayStatus(Authentication authentication) {
        List<TodayStatusResponse> checkIns = checkInService.getTodayStatus(authentication);
        return new ResponseEntity<>(checkIns, OK);
    }

    @GetMapping("/checked")
    public ResponseEntity<Boolean> isCheckedIn(Authentication authentication) {
        return new ResponseEntity<>(checkInService.isCheckedIn(authentication), OK);
    }

}
