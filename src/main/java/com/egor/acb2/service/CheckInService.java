package com.egor.acb2.service;

import com.egor.acb2.exception.InvalidStatusException;
import com.egor.acb2.model.CheckIn;
import com.egor.acb2.repository.CheckInRepository;
import com.egor.acb2.repository.UserRepository;
import com.egor.acb2.response.CheckInRequest;
import com.egor.acb2.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CheckInService {
    private UserRepository userRepository;
    private CheckInRepository checkInRepository;

    @Autowired
    public CheckInService(UserRepository userRepository, CheckInRepository checkInRepository) {
        this.userRepository = userRepository;
        this.checkInRepository = checkInRepository;
    }

    public CheckIn saveCheckIn(CheckInRequest request, Authentication auth) throws InvalidStatusException {
        String ac = switch (request.getAc()) {
            case "1" -> "Present";
            case "2" -> "Telework";
            case "3" -> "TDY";
            case "4" -> "PTDY";
            case "5" -> "CON Leave";
            case "6" -> "Leave";
            case "7" -> "Pass";
            case "8" -> "Sick Call";
            case "9" -> "Emergency";
            case "10" -> "Other";
            default -> throw new InvalidStatusException("Invalid Accountability Status");
        };

        CheckIn checkIn = new CheckIn();
        checkIn.setDate(new Date());
        checkIn.setName(auth.getName());
        checkIn.setQuestionOne(request.getQuestionOne());
        checkIn.setQuestionTwo(request.getQuestionTwo());
        checkIn.setQuestionThree(request.getQuestionThree());
        checkIn.setQuestionFour(request.getQuestionFour());
        checkIn.setAc(ac);
        checkInRepository.save(checkIn);
        return checkIn;
    }
}
