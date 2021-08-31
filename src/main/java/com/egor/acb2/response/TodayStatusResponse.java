package com.egor.acb2.response;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TodayStatusResponse {
    private String name;
    private Date checkInTime;
    private String acStatus;
    private String covidStatus;

    public TodayStatusResponse(String name, Date checkInTime, String acStatus, String covidStatus) {
        this.name = name;
        this.checkInTime = checkInTime;
        this.acStatus = acStatus;
        this.covidStatus = covidStatus;
    }

    public TodayStatusResponse(String name) {
        this.name = name;
    }
}
