package com.egor.acb2.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class CheckIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    private String questionOne;
    private String questionTwo;
    private String questionThree;
    private String questionFour;
    private String ac;
    private String name;

    @Temporal(TemporalType.DATE)
    Date checkInDate;

    @Temporal(TemporalType.TIME)
    Date checkInTime;
}
