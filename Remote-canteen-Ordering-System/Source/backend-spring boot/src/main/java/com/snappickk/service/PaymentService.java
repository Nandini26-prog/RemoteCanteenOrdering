package com.snappickk.service;

import com.stripe.exception.StripeException;
import com.snappickk.model.Order;
import com.snappickk.model.PaymentResponse;

public interface PaymentService {

	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
