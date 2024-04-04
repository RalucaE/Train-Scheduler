package com.project.trainscheduler.repository;

import com.project.trainscheduler.entity.TrainStation;
import com.project.trainscheduler.entity.Trains;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainsStationRepository extends JpaRepository<TrainStation, Long> {

    List<TrainStation> findAllByTrainId(Trains id);
}
