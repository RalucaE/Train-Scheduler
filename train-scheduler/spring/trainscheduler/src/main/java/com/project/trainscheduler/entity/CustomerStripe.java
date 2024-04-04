package com.project.trainscheduler.entity;

import com.stripe.model.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name ="customers")
public class CustomerStripe {

    @Id
    private String id;
    @Embedded
    private Address address;
    private String description;
    private String email;
    private String name;
    private String phone;
}
