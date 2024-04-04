package com.project.trainscheduler.payload.response;

public class WagonSeatsResponse {
    private Integer seatNumber;
    private Integer seatState;

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Integer getSeatState() {
        return seatState;
    }

    public void setSeatState(Integer seatState) {
        this.seatState = seatState;
    }
}
