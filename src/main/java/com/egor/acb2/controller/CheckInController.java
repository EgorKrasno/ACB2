package com.egor.acb2.controller;

import com.egor.acb2.exception.InvalidStatusException;
import com.egor.acb2.model.CheckIn;
import com.egor.acb2.response.CheckInRequest;
import com.egor.acb2.response.TodayStatusResponse;
import com.egor.acb2.service.CheckInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
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
    @PreAuthorize("hasAuthority('checkIn:create')")
    public ResponseEntity<CheckIn> saveCheckIn(Authentication authentication, @Valid @RequestBody CheckInRequest request) throws InvalidStatusException {
        CheckIn checkIn = checkInService.saveCheckIn(request, authentication);
        return new ResponseEntity<>(checkIn, CREATED);
    }

    @PreAuthorize("hasAuthority('checkIn:read')")
    @GetMapping("/today")
    public ResponseEntity<List<TodayStatusResponse>> getTodayStatus(Authentication authentication) {
        System.out.println(authentication.getAuthorities());
        List<TodayStatusResponse> checkIns = checkInService.getTodayStatus(authentication);
        return new ResponseEntity<>(checkIns, OK);
    }

    @GetMapping("/checked")
    @PreAuthorize("hasAuthority('checkIn:create')")
    public ResponseEntity<Boolean> isCheckedIn(Authentication authentication) {
        return new ResponseEntity<>(checkInService.isCheckedIn(authentication), OK);
    }

}
