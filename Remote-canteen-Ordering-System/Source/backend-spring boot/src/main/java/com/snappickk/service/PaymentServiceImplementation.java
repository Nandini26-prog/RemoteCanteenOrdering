package com.snappickk.service;

import com.snappickk.model.Order;
import com.snappickk.model.PaymentResponse;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.repository.RestaurantOrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
public class PaymentServiceImplementation implements PaymentService {

	@Value("${stripe.api.key}")
	private String stripeSecretKey;

	// Add this repository injection
	private final RestaurantOrderRepository restaurantOrderRepository;

	// Constructor injection
	public PaymentServiceImplementation(RestaurantOrderRepository restaurantOrderRepository) {
		this.restaurantOrderRepository = restaurantOrderRepository;
	}

	@Override
	public PaymentResponse generatePaymentLink(Order order) throws StripeException {
		// This method looks fine
		Stripe.apiKey = stripeSecretKey;

		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("https://zosh-food.vercel.app/payment/success/"+order.getId())
				.setCancelUrl("https://zosh-food.vercel.app/cancel")
				.addLineItem(SessionCreateParams.LineItem.builder()
						.setQuantity(1L)
						.setPriceData(SessionCreateParams.LineItem.PriceData.builder()
								.setCurrency("usd")
								.setUnitAmount((long) order.getTotalAmount()*100)
								.setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
										.setName("pizza burger")
										.build())
								.build())
						.build())
				.build();

		Session session = Session.create(params);

		System.out.println("session _____ " + session);

		PaymentResponse res = new PaymentResponse();
		res.setPayment_url(session.getUrl());

		return res;
	}

	@Override
	public void distributePaymentToRestaurants(Order mainOrder) {
		// Fix: Use the instance of the repository
		List<RestaurantOrder> restaurantOrders = restaurantOrderRepository.findByParentOrderId(mainOrder.getId());

		for (RestaurantOrder ro : restaurantOrders) {
			// Update payment status
			ro.setRestaurantPaymentStatus("PAID");
			restaurantOrderRepository.save(ro); // Fix: Use the instance

			// Here you would implement the actual payment distribution logic
			// For example, update restaurant balance, create transaction records, etc.
			// This part depends on your payment gateway integration
		}
	}
}



