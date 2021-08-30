package com.egor.acb2.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
@ToString
public class CheckInRequest {

    @NotBlank(message = "Please answer all questions")
    private String questionOne;
    @NotBlank(message = "Please answer all questions")
    private String questionTwo;
    @NotBlank(message = "Please answer all questions")
    private String questionThree;
    @NotBlank(message = "Please answer all questions")
    private String questionFour;
    @NotBlank(message = "Please answer all questions")
    private String ac;
}


