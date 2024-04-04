package com.project.trainscheduler.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyTicketResponse {
    private Long id;
    private String email;
    private List<String> passengerList;
    private List<Double> prices;
    private List<String> ticketTypes;
    private Integer classType;
}
