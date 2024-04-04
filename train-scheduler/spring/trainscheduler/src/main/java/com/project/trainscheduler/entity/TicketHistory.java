package com.project.trainscheduler.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="ticketHistory")
@AllArgsConstructor
@NoArgsConstructor
public class TicketHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String pret;
    private String numarTren;

    private String orasPlecare;

    private String orasSosire;

    private String oraPlecare;

    private String oraSosire;

    private String numePasager;
    private String dataCumparareTicket;

    private String classType;

    private String tipTicket;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPret() {
        return pret;
    }

    public void setPret(String pret) {
        this.pret = pret;
    }

    public String getNumarTren() {
        return numarTren;
    }

    public void setNumarTren(String numarTren) {
        this.numarTren = numarTren;
    }

    public String getOrasPlecare() {
        return orasPlecare;
    }

    public void setOrasPlecare(String orasPlecare) {
        this.orasPlecare = orasPlecare;
    }

    public String getOrasSosire() {
        return orasSosire;
    }

    public void setOrasSosire(String orasSosire) {
        this.orasSosire = orasSosire;
    }

    public String getOraPlecare() {
        return oraPlecare;
    }

    public void setOraPlecare(String oraPlecare) {
        this.oraPlecare = oraPlecare;
    }

    public String getOraSosire() {
        return oraSosire;
    }

    public void setOraSosire(String oraSosire) {
        this.oraSosire = oraSosire;
    }

    public String getDataCumparareTicket() {
        return dataCumparareTicket;
    }

    public void setDataCumparareTicket(String dataCumparareTicket) {
        this.dataCumparareTicket = dataCumparareTicket;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }

    public String getTipTicket() {
        return tipTicket;
    }

    public void setTipTicket(String tipTicket) {
        this.tipTicket = tipTicket;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNumePasager() {
        return numePasager;
    }

    public void setNumePasager(String numePasager) {
        this.numePasager = numePasager;
    }
}
