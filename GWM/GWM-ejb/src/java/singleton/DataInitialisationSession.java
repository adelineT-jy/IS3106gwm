/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package singleton;

import entity.Game;
import entity.Post;
import entity.User;
import error.CreateUserException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import session.AdminSessionLocal;
import session.PostSessionBeanLocal;
import session.UserSessionLocal;

/**
 *
 * @author ruth
 */
@Singleton
@LocalBean
@Startup
public class DataInitialisationSession {
    
    @EJB
    private UserSessionLocal userSessionLocal;
    
    @EJB
    private AdminSessionLocal adminSessionLocal;

    @EJB
    private PostSessionBeanLocal postSessionBeanLocal;
    
    public DataInitialisationSession() {
    }
    
    @PostConstruct
    public void postConstruct() {
        initializeData(); 
    }
    
    public void initializeData() {
        System.out.println("Data init!");
        Game g = new Game();
        g.setGameDescription("Battle of Wits");
        g.setGameDownloadLink("lol.com");
        g.setGameName("LOL");
        adminSessionLocal.createGame(g);
        
        try {    
            User u = new User();

            u.setEmail("first@gmail.com");
            u.setUsername("firstUser");
            u.setProtectedPassword("fff");
            u.setIsAvailable(true);
            userSessionLocal.createUser(u);

            Post p = new Post();
            p.setTitle("finding peeps");
            p.setDescription("asap");
            p.setRequestQty(1);
            p.setRequestPrice(BigDecimal.ONE);
            p.setGame(g);
            //System.out.println("dhajfhks");
            postSessionBeanLocal.createPost(p, Long.valueOf(1), Long.valueOf(1));
 
        } catch (Exception ex) {
            Logger.getLogger(DataInitialisationSession.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
    }

}
