/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package singleton;

import entity.Admin;
import entity.Game;
import entity.Party;
import entity.Post;
import entity.User;
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
            u.setPassword("password");
            u.setGender((byte) 0);
            u.setIsAvailable(true);
            userSessionLocal.createUser(u);

            User u2 = new User();
            u2.setEmail("second@gmail.com");
            u2.setUsername("secondUser");
            u2.setPassword("password");
            u.setGender((byte) 1);
            u2.setIsAvailable(true);
            userSessionLocal.createUser(u2);

            Party party = new Party();
            party.setInviteLink("xxxLOLshhaicnru.djannic.lol");
            party.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(party, Long.valueOf(1));
            
            Game game = new Game();
            game.setGameName("League of Legends");
            game.setGameDescription("League of Legends is a team-based game with over 140 champions to make epic plays with.");
            game.setGameDownloadLink("https://signup.na.leagueoflegends.com/en/signup/redownload");
            
            Post p = new Post();
            p.setTitle("finding peeps");
            p.setDescription("asap");
            p.setRequestQty(1);
            p.setRequestPrice(BigDecimal.ONE);
            p.setGame(g);
            postSessionBeanLocal.createPost(p,1L, 1L, 1L);

            Admin admin = new Admin();
            admin.setEmail("admin@gmail.com");
            admin.setPassword("password");
        } catch (Exception ex) {
            Logger.getLogger(DataInitialisationSession.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

}
