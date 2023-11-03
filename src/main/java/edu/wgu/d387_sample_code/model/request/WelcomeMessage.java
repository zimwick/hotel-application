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

        try {
            thread1.join(); // Waits for thread1 to die
            thread2.join(); // Waits for thread2 to die
        } catch (InterruptedException e) {
            // Handle the interruption appropriately
            Thread.currentThread().interrupt();
            System.out.println("Thread execution was interrupted.");
        }
    }

    public class WelcomeThread1 extends Thread {
        public void run() {
            String english = ResourceBundle.getBundle("locals", Locale.ENGLISH).getString("greeting");
            synchronized (list) {
                list.add(english);
            }
        }
    }

    public class WelcomeThread2 extends Thread {
        public void run() {
            String french = ResourceBundle.getBundle("locals", Locale.CANADA_FRENCH).getString("greeting");
            synchronized (list) {
                list.add(french);
            }
        }
    }

    public synchronized List<String> getWelcomeMessage() {
        return new ArrayList<>(list); // Return a copy to avoid modification from outside
    }
}
