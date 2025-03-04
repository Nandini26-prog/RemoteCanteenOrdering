package com.snappickk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.snappickk"})
public class ZoshFoodApplication {

	public static void main(String[] args) {

		SpringApplication.run(ZoshFoodApplication.class, args);
	}

}
