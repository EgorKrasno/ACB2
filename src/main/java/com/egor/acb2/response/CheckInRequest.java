package com.egor.acb2.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Setter
@Getter
@ToString
public class CheckInRequest {

    @Pattern(regexp="[yn]")
    private String questionOne;
    @Pattern(regexp="[yn]")
    private String questionTwo;
    @Pattern(regexp="[yn]")
    private String questionThree;
    @Pattern(regexp="[yn]")
    private String questionFour;
    @NotBlank(message = "Please answer all questions")
    private String ac;
}


