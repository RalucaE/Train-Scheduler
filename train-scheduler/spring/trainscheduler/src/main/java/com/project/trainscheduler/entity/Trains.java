package com.project.trainscheduler.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Table(name = "trains")
@AllArgsConstructor
@NoArgsConstructor
public class Trains {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String numarTren;

    private String orasOrigine;

    private String oraPlecare;

    private String oraSosire;
    private String orasDestinatie;

    private String dataTime;

    private boolean firstClass;
    private boolean secondClass;
    private boolean cuseta;

    private boolean bicicleta;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(	name = "train_stations",
//            joinColumns = @JoinColumn(name = "train_id"),
//            inverseJoinColumns = @JoinColumn(name = "station_id"))
//    private Set<Stations> stations = new LinkedHashSet<>();

    @Transient
    private List<Stations> stations = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "train_points",
            joinColumns = @JoinColumn(name = "train_id"),
            inverseJoinColumns = @JoinColumn(name = "cities_id"))
    private Set<CityDistants> cityDistans = new LinkedHashSet<>();


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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumarTren() {
        return numarTren;
    }

    public void setNumarTren(String numarTren) {
        this.numarTren = numarTren;
    }

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

//    public Set<Stations> getStations() {
//        return stations;
//    }
//
//    public void setStations(Set<Stations> stations) {
//        this.stations = stations;
//    }


    public List<Stations> getStations() {
        return stations;
    }

    public void setStations(List<Stations> stations) {
        this.stations = stations;
    }

    public Set<CityDistants> getCityDistans() {
        return cityDistans;
    }

    public void setCityDistans(Set<CityDistants> cityDistans) {
        this.cityDistans = cityDistans;
    }

    public String getDataTime() {
        return dataTime;
    }

    public void setDataTime(String dataTime) {
        this.dataTime = dataTime;
    }

    public boolean isFirstClass() {
        return firstClass;
    }

    public void setFirstClass(boolean firstClass) {
        this.firstClass = firstClass;
    }

    public boolean isSecondClass() {
        return secondClass;
    }

    public void setSecondClass(boolean secondClass) {
        this.secondClass = secondClass;
    }

    public boolean isCuseta() {
        return cuseta;
    }

    public void setCuseta(boolean cuseta) {
        this.cuseta = cuseta;
    }

    public boolean isBicicleta() {
        return bicicleta;
    }

    public void setBicicleta(boolean bicicleta) {
        this.bicicleta = bicicleta;
    }
}
