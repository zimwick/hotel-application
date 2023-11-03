package edu.wgu.d387_sample_code.model.request;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

public class WelcomeMessage {
    List<String> list = new ArrayList<>();
    public WelcomeMessage() {
        Thread thread1 = new WelcomeThread1();
        Thread thread2 = new WelcomeThread2();
        thread1.start();
        thread2.start();
    }

    public class WelcomeThread1 extends Thread{
        public void run(){
            String english = ResourceBundle.getBundle("locals", Locale.ENGLISH).getString("greeting");
            list.add(english);
        }
    }
    public class WelcomeThread2 extends Thread{
        public void run(){
            String french = ResourceBundle.getBundle("locals", Locale.CANADA_FRENCH).getString("greeting");
            list.add(french);
        }
    }


    public List<String> getWelcomeMessage(){
        return list;
    }
}


