package com.project.trainscheduler.payload.request;

public class RouteRequest {
    private String orasOrigine;
    private String orasDestinatie;
    private String dateTime;

    public String getOrasOrigine() {
        return orasOrigine;
    }

    public void setOrasOrigine(String orasOrigine) {
        this.orasOrigine = orasOrigine;
    }

    public String getOrasDestinatie() {
        return orasDestinatie;
    }

    public void setOrasDestinatie(String orasDestinatie) {
        this.orasDestinatie = orasDestinatie;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
}
