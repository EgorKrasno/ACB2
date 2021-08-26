package com.egor.acb2.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;

    //Passed in by User in UserResgisterRequest
    private String username;
    private String firstName;
    private String lastName;

    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Date joinDate;
    private Date lastLoginDate;

    private String role;
    private String[] authorities;
    private boolean isActive;
    private boolean isNotLocked;
}
