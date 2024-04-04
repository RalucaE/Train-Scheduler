package com.project.trainscheduler.payload.request;

import com.project.trainscheduler.payload.response.WagonSeatsResponse;

import java.util.List;

public class WagonSeatsRequest {
    private Long wagonId;
    List<WagonSeatsResponse> wagonSeatsResponseList;

    public Long getWagonId() {
        return wagonId;
    }

    public void setWagonId(Long wagonId) {
        this.wagonId = wagonId;
    }

    public List<WagonSeatsResponse> getWagonSeatsResponseList() {
        return wagonSeatsResponseList;
    }

    public void setWagonSeatsResponseList(List<WagonSeatsResponse> wagonSeatsResponseList) {
        this.wagonSeatsResponseList = wagonSeatsResponseList;
    }
}
