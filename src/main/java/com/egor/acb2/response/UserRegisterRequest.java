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
public class UserRegisterRequest {

    @NotBlank(message="Username not valid")

    @NotBlank(message="First name not valid")
    private String firstName;

    @NotBlank(message="Last Name not valid")
    private String lastName;

    @Email(message="Email not valid")
    private String email;

    @NotBlank(message = "Password can't be blank")
    @Size(min=6, message = "Password is too short")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

}
