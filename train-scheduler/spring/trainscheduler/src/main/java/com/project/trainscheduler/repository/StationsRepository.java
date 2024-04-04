package com.project.trainscheduler.repository;

import com.project.trainscheduler.entity.Stations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationsRepository extends JpaRepository<Stations, Integer> {
}
