package SQLite.DBOnline.controller;



import SQLite.DBOnline.model.SessionData;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;


@Controller
public class HomeController {

    private SessionData sessionData = new SessionData();


    @GetMapping("/")
    public String home(@RequestParam(name="showUsers", required = false) boolean showUsers, Model model) {
        model.addAttribute("features", Arrays.asList("bho", "forse", "non lo so"));
        model.addAttribute("giveName", sessionData.getTitle());
        //System.out.println(sessionName);
        model.addAttribute("showUsers", showUsers);
        return "home";
    }

}
