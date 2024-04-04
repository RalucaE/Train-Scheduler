package com.project.trainscheduler.payload.request;

import com.project.trainscheduler.entity.Trains;
import com.project.trainscheduler.entity.WagonSeats;

import java.util.List;

public class DataEmailRequest {

    private Integer trainRouteId;

    private String email;
    private String passagerName;

    private List<String> prices;
    private String ticketType;
    private String classType;

    private List<String> timeUntilArrival;

    private Integer seatNumbers;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public List<String> getPrices() {
        return prices;
    }

    public void setPrices(List<String> prices) {
        this.prices = prices;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }


    public Integer getTrainRouteId() {
        return trainRouteId;
    }

    public void setTrainRouteId(Integer id) {
        this.trainRouteId = id;
    }

    public String getPassagerName() {
        return passagerName;
    }

    public void setPassagerName(String passagerName) {
        this.passagerName = passagerName;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public List<String> getTimeUntilArrival() {
        return timeUntilArrival;
    }

    public void setTimeUntilArrival(List<String> timeUntilArrival) {
        this.timeUntilArrival = timeUntilArrival;
    }

    public Integer getSeatNumbers() {
        return seatNumbers;
    }

    public void setSeatNumbers(Integer seatNumbers) {
        this.seatNumbers = seatNumbers;
    }
}
