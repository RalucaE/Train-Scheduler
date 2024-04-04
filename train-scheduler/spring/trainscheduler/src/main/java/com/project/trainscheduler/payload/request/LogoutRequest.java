package com.project.trainscheduler.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;

import javax.validation.constraints.NotBlank;

@Data
public class LogoutRequest {

    @NotBlank
    private String refreshToken;
}
