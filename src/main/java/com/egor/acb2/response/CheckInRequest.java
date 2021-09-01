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

    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionOne;
    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionTwo;
    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionThree;
    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionFour;
    @NotBlank(message = "Please answer all questions")
    @Pattern(regexp = "\\b(?:Present|Telework|TDY|PTDY|CON Leave|Leave|Pass|Sick Call|Emergency|Other)\\b", message = "Bad Accountability Status, try again")
    private String ac;
}


