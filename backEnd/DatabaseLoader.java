//package com.cafeteria;
//
//import com.cafeteria.models.SimpleUser;
//import com.cafeteria.repositories.SimpleUserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//
//@Component
//public class DatabaseLoader implements CommandLineRunner {
//
//    private final SimpleUserRepository repository;
//
//    @Autowired
//    public DatabaseLoader(SimpleUserRepository repository) {
//        this.repository = repository;
//    }
//
//    @Override
//    public void run(String... strings) throws Exception {
//        this.repository.save(new SimpleUser("melindadeac000",
//                                            "12345",
//                                            0,
//                                            "melindadeac000@gmail.com",
//                                            null,
//                                            "Melinda",
//                                            "Deac",
//                                            (LocalDate.of(2001,06, 12))));
//    }
//}
