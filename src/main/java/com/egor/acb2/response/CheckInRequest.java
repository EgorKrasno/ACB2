package com.egor.acb2.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
@ToString
public class CheckInRequest {

    private String questionOne;
    private String questionTwo;
    private String questionThree;
    private String questionFour;
}


