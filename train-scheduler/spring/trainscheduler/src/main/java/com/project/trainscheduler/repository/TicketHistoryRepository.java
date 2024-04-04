package com.project.trainscheduler.repository;

import com.project.trainscheduler.entity.TicketHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketHistoryRepository extends JpaRepository<TicketHistory, Integer> {

    List<TicketHistory> findAllByUserId(Integer id);

}
