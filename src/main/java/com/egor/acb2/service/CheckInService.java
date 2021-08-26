package com.egor.acb2.service;

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
    public CheckInService(UserRepository userRepository, CheckInRepository checkInRepository){
        this.userRepository = userRepository;
        this.checkInRepository = checkInRepository;
    }

    public CheckIn saveCheckIn(CheckInRequest request, Authentication auth){
        System.out.println(request);
        CheckIn checkIn = new CheckIn();
        checkIn.setDate(new Date());
        checkIn.setName(auth.getName());
        checkIn.setQuestionOne(request.getQuestionOne());
        checkIn.setQuestionTwo(request.getQuestionTwo());
        checkIn.setQuestionThree(request.getQuestionThree());
        checkIn.setQuestionFour(request.getQuestionFour());
        checkInRepository.save(checkIn);
        return checkIn;
    }
}
