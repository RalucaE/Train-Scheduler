package com.project.trainscheduler.repository;

import com.project.trainscheduler.entity.StudentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentIdRepository extends JpaRepository<StudentId, Long> {
}
