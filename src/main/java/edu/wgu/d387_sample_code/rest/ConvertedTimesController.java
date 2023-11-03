package edu.wgu.d387_sample_code.rest;

import edu.wgu.d387_sample_code.model.request.ConvertedTimes;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConvertedTimesController {
    @GetMapping("/time")
    public ConvertedTimes getResponse(){
        ConvertedTimes convertedTimes = new ConvertedTimes();
        convertedTimes.setTime(17, 30);

        return convertedTimes;
    }
}
