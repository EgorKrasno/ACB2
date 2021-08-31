package com.egor.acb2.service;

import com.egor.acb2.exception.InvalidStatusException;
import com.egor.acb2.model.CheckIn;
import com.egor.acb2.model.User;
import com.egor.acb2.repository.CheckInRepository;
import com.egor.acb2.repository.UserRepository;
import com.egor.acb2.response.CheckInRequest;
import com.egor.acb2.response.TodayStatusResponse;
import com.egor.acb2.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
        User user = userRepository.findUserByUsername(auth.getName());
        CheckIn checkIn = new CheckIn();
        Date date = new Date();
        checkIn.setCheckInDate(date);
        checkIn.setCheckInTime(date);
        checkIn.setCreationDateTime(date);
        checkIn.setName(user.getFirstName() + " " + user.getLastName());
        checkIn.setQuestionOne(request.getQuestionOne());
        checkIn.setQuestionTwo(request.getQuestionTwo());
        checkIn.setQuestionThree(request.getQuestionThree());
        checkIn.setQuestionFour(request.getQuestionFour());
        checkIn.setAc(ac);
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
            if(optCheckIn.isPresent()){
                CheckIn foundCheckIn = optCheckIn.get();
                String covidStatus = foundCheckIn.getQuestionOne().equals("y") &&
                        foundCheckIn.getQuestionTwo().equals("y") &&
                        foundCheckIn.getQuestionThree().equals("y") &&
                        foundCheckIn.getQuestionFour().equals("y") ? "Good" : "Bad";

                TodayStatusResponse userResponse = new TodayStatusResponse(foundCheckIn.getName(), foundCheckIn.getCheckInTime(), foundCheckIn.getAc(), covidStatus);
                result.add(userResponse);
            } else {
                result.add(new TodayStatusResponse(fullName));
            }


        }
        return result;
    }
}


//        List<CheckIn> result = checkInRepository.findAllByPublicationTimeBetween(
//                new SimpleDateFormat("HH:mm").parse("21:00"),
//                new SimpleDateFormat("HH:mm").parse("22:05"));

//        List<Article> result = repository.findAllWithCreationDateTimeBefore(
//                new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2017-12-15 10:00"));
