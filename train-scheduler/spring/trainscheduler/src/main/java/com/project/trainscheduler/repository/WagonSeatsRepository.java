package com.project.trainscheduler.repository;

import com.project.trainscheduler.entity.WagonSeats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WagonSeatsRepository extends JpaRepository<WagonSeats,Long> {

    List<WagonSeats> findAllByWagonId(Long id);
}
