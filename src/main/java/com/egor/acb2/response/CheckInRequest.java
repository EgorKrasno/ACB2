package com.egor.acb2.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Pattern;

@Setter
@Getter
@ToString
@AllArgsConstructor
public class CheckInRequest {

    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionOne;
    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionTwo;
    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionThree;
    @Pattern(regexp = "[yn]", message = "Please answer all questions")
    private String questionFour;
    @Pattern(regexp = "\\b(?:Present|Telework|TDY|PTDY|CON Leave|Leave|Pass|Sick Call|Emergency|Other)\\b", message = "Bad Accountability Status, try again")
    private String ac;
}


