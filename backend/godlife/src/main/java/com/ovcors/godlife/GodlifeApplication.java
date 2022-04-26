package com.ovcors.godlife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class GodlifeApplication {
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(GodlifeApplication.class);
		app.addListeners(new ApplicationPidFileWriter());
		app.run(args);
	}
}
