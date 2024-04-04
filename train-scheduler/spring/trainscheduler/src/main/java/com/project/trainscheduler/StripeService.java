package com.project.trainscheduler;

import com.stripe.exception.*;
import com.stripe.model.Charge;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    private String secretKey = "sk_test_51N7dPgLkenDR0Olp3jXDoBwDlLdh6p3WQFX1NqWasY2ktpzYOgVO8YsKFCritFaYASD7i0EL8UO07xZHRvj2jkdN00IwQnGwph";


    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }
    public Charge charge(ChargeRequest chargeRequest)
            throws AuthenticationException, InvalidRequestException,
            APIConnectionException, CardException, APIException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", chargeRequest.getAmount());
        chargeParams.put("currency", chargeRequest.getCurrency());
//        chargeParams.put("source", chargeRequest.getStripeToken());
        chargeParams.put("customer", chargeRequest.getCustomer());
        return Charge.create(chargeParams);
    }
}
