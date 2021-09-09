package com.egor.acb2.service;

import com.egor.acb2.exception.InvalidStatusException;
import com.egor.acb2.model.CheckIn;
import com.egor.acb2.model.User;
import com.egor.acb2.repository.CheckInRepository;
import com.egor.acb2.repository.UserRepository;
import com.egor.acb2.response.CheckInRequest;
import com.egor.acb2.response.TodayStatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
        String ac = request.getAc();
        User user = userRepository.findUserByUsername(auth.getName());
        String fullName = user.getFirstName() + " " + user.getLastName();
        Date date = new Date();
        CheckIn checkIn = new CheckIn();

        checkIn.setCheckInDate(date);
        checkIn.setCheckInTime(date);
        checkIn.setName(fullName);
        checkIn.setQuestionOne(request.getQuestionOne());
        checkIn.setQuestionTwo(request.getQuestionTwo());
        checkIn.setQuestionThree(request.getQuestionThree());
        checkIn.setQuestionFour(request.getQuestionFour());
        checkIn.setAc(ac);

        Optional<CheckIn> optCheckIn = checkInRepository.findByCheckInDateAndName(date, fullName);
        optCheckIn.ifPresent(op -> checkInRepository.delete(op));
        checkInRepository.save(checkIn);
        return checkIn;
    }

    public List<TodayStatusResponse> getTodayStatus(Authentication authentication){
        List<User> users = userRepository.findAll();
        List<CheckIn> checkIns = checkInRepository.findAllByCheckInDate(
                new Date());

        List<TodayStatusResponse> result = new ArrayList<>();
        for (User user : users) {
            String fullName = user.getFirstName() + " " + user.getLastName();

            Optional<CheckIn> optCheckIn = checkIns.stream().filter(e -> e.getName().equals(fullName)).findFirst();
            //If user has checked in today (is in CheckIn Row for today)
            if(optCheckIn.isPresent()){
                CheckIn foundCheckIn = optCheckIn.get();
                String covidStatus = foundCheckIn.getQuestionOne().equals("n") &&
                        foundCheckIn.getQuestionTwo().equals("n") &&
                        foundCheckIn.getQuestionThree().equals("n") &&
                        foundCheckIn.getQuestionFour().equals("y") ? "Good" : "Bad";

                TodayStatusResponse userResponse = new TodayStatusResponse(foundCheckIn.getName(), foundCheckIn.getCheckInTime(), foundCheckIn.getAc(), covidStatus);
                result.add(userResponse);
            } else {
                result.add(new TodayStatusResponse(fullName));
            }
        }
        return result;
    }

    public boolean isCheckedIn(Authentication authentication) {
        User user = userRepository.findUserByUsername(authentication.getName());
        String username = user.getFirstName() + " " + user.getLastName();

        Optional<CheckIn> op = checkInRepository.findByCheckInDateAndName(new Date(), username);
        return op.isPresent();
    }
}


//        List<CheckIn> result = checkInRepository.findAllByPublicationTimeBetween(
//                new SimpleDateFormat("HH:mm").parse("21:00"),
//                new SimpleDateFormat("HH:mm").parse("22:05"));

//        List<Article> result = repository.findAllWithCreationDateTimeBefore(
//                new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2017-12-15 10:00"));
