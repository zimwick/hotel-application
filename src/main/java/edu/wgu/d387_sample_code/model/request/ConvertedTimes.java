package edu.wgu.d387_sample_code.model.request;

import net.bytebuddy.asm.Advice;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class ConvertedTimes {
    private int hour;
    private int minute;
    private String etTime;
    private String mtTime;
    private String utcTime;

    public void setTime(int hour, int minute){
        this.hour = hour;
        this.minute = minute;
        LocalTime presentationTime = LocalTime.of(hour, minute);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mma");
        this.etTime = presentationTime.format(formatter);

        presentationTime = LocalTime.of(hour - 2 , minute);
        this.mtTime = presentationTime.format(formatter);

        presentationTime = LocalTime.of(hour + 4, minute);
        this.utcTime = presentationTime.format(formatter);
    }

    public String getTime(){
        return etTime + "_ET " + mtTime + "_MT " + utcTime + "_UTC";

    }



}
