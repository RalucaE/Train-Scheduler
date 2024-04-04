package com.project.trainscheduler.repository;

import com.project.trainscheduler.entity.Role;
import com.project.trainscheduler.entity.TrainRoutes;
import com.project.trainscheduler.entity.Trains;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainsRepository extends JpaRepository<Trains, Integer> {
}
