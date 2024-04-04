package com.project.trainscheduler.payload.response;

import com.project.trainscheduler.entity.Trains;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class TrainRouteResponse {
    private Long id;
    private String oraPlecare;

    private String oraSosire;

    private String orasDestinatie;

    private String orasOrigine;

    private Trains trenSchimbare1;

    private Trains trenSchimbare2;


    private Trains trenSchimbare3;


    private Trains trenSchimbare4;

}
