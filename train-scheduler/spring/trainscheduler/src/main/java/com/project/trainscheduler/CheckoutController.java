package com.project.trainscheduler;

import com.project.trainscheduler.entity.CustomerStripe;
import com.project.trainscheduler.payload.response.MessageResponse;
import com.project.trainscheduler.service.CustomerService;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("")
@RequiredArgsConstructor
public class CheckoutController {

    private String stripePublicKey = "pk_test_51N7dPgLkenDR0OlpAVkHPWOElRHOjyqvwKBjFmyoif2sze1m7rNbqNPjHoqONPgoOwVwvgQtqHJts5DvuAQ9bE4p00kh82yGTa";

    private final StripeService stripeService;

    private final CustomerService customerService;


    @GetMapping("/showForm")
    public ResponseEntity<?> checkout(Model model) {
        model.addAttribute("amount", 50 * 100);
        model.addAttribute("stripePublicKey", stripePublicKey);
        model.addAttribute("currency", "ron");
        return ResponseEntity.ok(new MessageResponse("Checkout successful"));
    }

    @PostMapping("/charge")
    public ResponseEntity<?> charge(@RequestBody ChargeRequest chargeRequest, Model model)
            throws StripeException {
        CustomerStripe customerStripe = new CustomerStripe();
        customerStripe.setEmail(chargeRequest.getEmail());

        Customer existingCustomer = customerService.extractCustomer(customerStripe);

        if (existingCustomer != null) {
            chargeRequest.setCustomer(existingCustomer.getId());
        } else {
            // Create a card token
            Map<String, Object> card = new HashMap<>();
            card.put("name", chargeRequest.getCardHolderName());
            card.put("number", chargeRequest.getNumber());
            card.put("exp_month", chargeRequest.getExpMonth());
            card.put("exp_year", chargeRequest.getExpYear());
            card.put("cvc", chargeRequest.getCvc());
            Token token = Token.create(Map.of("card", card));

            // Create customer
            Map<String, Object> customerParams = new HashMap<>();
            customerParams.put("name", chargeRequest.getCardHolderName());
            customerParams.put("email", chargeRequest.getEmail());
            customerParams.put("source", token.getId());
            Customer customer = Customer.create(customerParams);

            customerService.saveCustomer(customer);

            // Add the card token to the charge request
            chargeRequest.setStripeToken(token.getId());

            chargeRequest.setCustomer(customer.getId());

        }

        chargeRequest.setDescription("testing");
        chargeRequest.setCurrency("ron");

        // Set the amount in cents
        chargeRequest.setAmount(chargeRequest.getAmount() * 100);

        // Charge the card
        Charge charge = stripeService.charge(chargeRequest);
        model.addAttribute("id", charge.getId());
        model.addAttribute("status", charge.getStatus());
        model.addAttribute("chargeId", charge.getId());
        model.addAttribute("balance_transaction", charge.getBalanceTransaction());
        model.addAttribute("amount", charge.getAmount() / 100); // Convert amount back to original value

        return ResponseEntity.ok(new MessageResponse("Payment successful"));
    }


    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }
}
