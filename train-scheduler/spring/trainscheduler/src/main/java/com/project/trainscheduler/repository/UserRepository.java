package com.project.trainscheduler.repository;

import com.project.trainscheduler.entity.User;
import com.project.trainscheduler.payload.request.SignupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByStudentId(String id);

    Boolean existsByPupilId(String id);

    @Transactional
    @Modifying
    @Query("UPDATE User a " +
            "SET a.validation = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);
}