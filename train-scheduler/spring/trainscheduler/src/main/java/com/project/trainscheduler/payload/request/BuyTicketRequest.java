package com.project.trainscheduler.payload.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyTicketRequest {
    private Long trainRouteId;
    private String email;
    private String passengerName;
    private List<String> prices;
    private String ticketType;
    private Integer classType;
    private List<String> timeUntilArrival;
}
