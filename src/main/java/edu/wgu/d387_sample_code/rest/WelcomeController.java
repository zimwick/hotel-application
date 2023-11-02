package edu.wgu.d387_sample_code.rest;

import edu.wgu.d387_sample_code.model.request.WelcomeMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {


    @GetMapping("/welcome")
    public WelcomeMessage getResponse(){

        return new WelcomeMessage();
    }
}
