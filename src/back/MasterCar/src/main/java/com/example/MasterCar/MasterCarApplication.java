package com.example.MasterCar;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MasterCarApplication {

	// @Autowired
	// private EmailSenderService senderService;

	public static void main(String[] args) {
		SpringApplication.run(MasterCarApplication.class, args);
	}

	/*@EventListener(ApplicationReadyEvent.class)
	public void sendMail(){
		senderService.sendEmail("gabrielnvresende@gmail.com", "teste de email", "only testing whether the email service is working");
	}*/

}
