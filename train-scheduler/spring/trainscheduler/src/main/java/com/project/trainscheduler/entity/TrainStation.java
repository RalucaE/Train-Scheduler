package com.project.trainscheduler.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trains_station")
@AllArgsConstructor
@NoArgsConstructor
public class TrainStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne()
    @JoinColumn(name = "stations_id")
    private Stations stationsId;

    @ManyToOne()
    @JoinColumn(name = "train_id")
    private Trains trainId;

    private Integer stationOrder;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }



    public Integer getStationOrder() {
        return stationOrder;
    }

    public void setStationOrder(Integer stationOrder) {
        this.stationOrder = stationOrder;
    }

    public Stations getStationsId() {
        return stationsId;
    }

    public void setStationsId(Stations stationsId) {
        this.stationsId = stationsId;
    }

    public Trains getTrainId() {
        return trainId;
    }

    public void setTrainId(Trains trainId) {
        this.trainId = trainId;
    }
}
