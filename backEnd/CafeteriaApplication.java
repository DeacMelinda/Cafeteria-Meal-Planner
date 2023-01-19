package com.cafeteria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDate;
import java.util.ArrayList;

@SpringBootApplication
@EnableScheduling
public class CafeteriaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CafeteriaApplication.class, args);

	}

}

//@Configuration
//@EnableScheduling
//@ConditionalOnProperty(name = "scheduling.enabled", matchIfMissing = true)
//class SchedulingConfiguration {
//
//}
