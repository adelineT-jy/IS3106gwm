/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package singleton;

import entity.Admin;
import entity.Card;
import entity.Chat;
import entity.ChatMessage;
import entity.Experience;
import entity.Game;
import entity.Party;
import entity.Post;
import entity.Review;
import entity.User;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
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
import session.ChatSessionLocal;

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

    @EJB
    private ChatSessionLocal chatSessionBeanLocal;

    public DataInitialisationSession() {
    }

    @PostConstruct
    public void postConstruct() {
        initializeData();
    }

    public void initializeData() {
        try {
            Admin admin = new Admin();
            admin.setEmail("admin@gmail.com");
            admin.setPassword("password");
            adminSessionLocal.createAdmin(admin);

            Game g1 = new Game();
            g1.setGameName("League of Legends");
            g1.setGameDescription("League of Legends is a team-based game with over 140 champions to make epic plays with.");
            g1.setGameDownloadLink("https://signup.na.leagueoflegends.com/en/signup/redownload");
            adminSessionLocal.createGame(g1);

            Game g2 = new Game();
            g2.setGameName("Counter-Strike: Global Offensive");
            g2.setGameDescription("Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago.");
            g2.setGameDownloadLink("https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/");
            adminSessionLocal.createGame(g2);

            Game g3 = new Game();
            g3.setGameName("Dota 2");
            g3.setGameDescription("Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover.");
            g3.setGameDownloadLink("https://store.steampowered.com/app/570/Dota_2/");
            adminSessionLocal.createGame(g3);
            

            User u = new User();
            u.setEmail("first@gmail.com");
            u.setUsername("firstUser");
            u.setPassword("password");
            u.setGender((byte) 0);
            u.setDob(new Date());
            Experience e3 = new Experience(g3, "Level 100", "link2.com");
            u.addExperience(e3);
            Experience e4 = new Experience(g1, "Platinum", "link2.com");
            u.addExperience(e4);
            Experience e5 = new Experience(g2, "Pro", "link3.com");
            u.addExperience(e5);
            Card c = new Card();
            c.setCardNum("4411 1111 9411 4781");
            c.setCvv("333");
            c.setExpDate("22/11");
            c.setName("Game With Me");
            u.addCard(c);
            userSessionLocal.createUser(u);

            User u2 = new User();
            u2.setEmail("second@gmail.com");
            u2.setUsername("secondUser");
            u2.setPassword("password");
            u2.setGender((byte) 1);
            u2.setDob(new Date());
            userSessionLocal.createUser(u2);

            User u3 = new User();
            u3.setEmail("third@gmail.com");
            u3.setUsername("thirdUser");
            u3.setPassword("password");
            u3.setGender((byte) 1);
            u3.setDob(new Date());
            userSessionLocal.createUser(u3);

            User u4 = new User();
            u4.setEmail("fourth@gmail.com");
            u4.setUsername("fourthUser");
            u4.setPassword("password");
            u4.setGender((byte) 1);
            u4.setDob(new Date());
            userSessionLocal.createUser(u4);

            User u5 = new User();
            u5.setEmail("fifthd@gmail.com");
            u5.setUsername("fifthUser");
            u5.setPassword("password");
            u5.setGender((byte) 1);
            u5.setDob(new Date());
            userSessionLocal.createUser(u5);

            User u6 = new User();
            u6.setEmail("sixth@gmail.com");
            u6.setUsername("sixthUser");
            u6.setPassword("password");
            u6.setGender((byte) 1);
            u6.setDob(new Date());
            userSessionLocal.createUser(u6);

            User u7 = new User();
            u7.setEmail("seven@gmail.com");
            u7.setUsername("sevenUser");
            u7.setPassword("password");
            u7.setGender((byte) 1);
            u7.setDob(new Date());
            userSessionLocal.createUser(u7);

            User u8 = new User();
            u8.setEmail("eight@gmail.com");
            u8.setUsername("eightUser");
            u8.setPassword("password");
            u8.setGender((byte) 1);
            u8.setDob(new Date());
            userSessionLocal.createUser(u8);

            User u9 = new User();
            u9.setEmail("nine@gmail.com");
            u9.setUsername("nineUser");
            u9.setPassword("password");
            u9.setGender((byte) 1);
            Experience e2 = new Experience(g3, "6000MMR", "link2.com");
            u9.addExperience(e2);
            u9.setDob(new Date());
            userSessionLocal.createUser(u9);

            User u10 = new User();
            u10.setEmail("ten@gmail.com");
            u10.setUsername("tenUser");
            u10.setPassword("password");
            u10.setGender((byte) 1);
            u10.setDob(new Date());
            userSessionLocal.createUser(u10);

            User u11 = new User();
            u11.setEmail("eleven@gmail.com");
            u11.setUsername("elevenUser");
            u11.setPassword("password");
            u11.setGender((byte) 1);
            u11.setDob(new Date());
            userSessionLocal.createUser(u11);

            User u12 = new User();
            u12.setEmail("twelve@gmail.com");
            u12.setUsername("twelveUser");
            u12.setPassword("password");
            u12.setGender((byte) 1);
            u12.setDob(new Date());
            userSessionLocal.createUser(u12);

            User u13 = new User();
            u13.setEmail("thirteen@gmail.com");
            u13.setUsername("13User");
            u13.setPassword("password");
            u13.setGender((byte) 1);
            u13.setDob(new Date());
            userSessionLocal.createUser(u13);

            User u14 = new User();
            u14.setEmail("14@gmail.com");
            u14.setUsername("14User");
            u14.setPassword("password");
            u14.setGender((byte) 1);
            u14.setDob(new Date());
            userSessionLocal.createUser(u14);

            User u15 = new User();
            u15.setEmail("15@gmail.com");
            u15.setUsername("15User");
            u15.setPassword("password");
            u15.setGender((byte) 1);
            Experience e1 = new Experience(g1, "Pro", "link.com");
            u15.addExperience(e1);
            u15.setDob(new Date());
            userSessionLocal.createUser(u15);

            User u16 = new User();
            u16.setEmail("16@gmail.com");
            u16.setUsername("16User");
            u16.setPassword("password");
            u16.setGender((byte) 1);
            u16.setDob(new Date());
            userSessionLocal.createUser(u16);

            User u17 = new User();
            u17.setEmail("17@gmail.com");
            u17.setUsername("17User");
            u17.setPassword("password");
            u17.setGender((byte) 1);
            u17.setDob(new Date());
            userSessionLocal.createUser(u17);

            User u18 = new User();
            u18.setEmail("18@gmail.com");
            u18.setUsername("18User");
            u18.setPassword("password");
            u18.setGender((byte) 1);
            u18.setDob(new Date());
            userSessionLocal.createUser(u18);

            User u19 = new User();
            u19.setEmail("u19@gmail.com");
            u19.setUsername("19dUser");
            u19.setPassword("password");
            u19.setGender((byte) 1);
            u19.setDob(new Date());
            userSessionLocal.createUser(u19);

            User u20 = new User();
            u20.setEmail("20@gmail.com");
            u20.setUsername("20User");
            u20.setPassword("password");
            u20.setGender((byte) 1);
            u20.setDob(new Date());
            userSessionLocal.createUser(u20);

            User u21 = new User();
            u21.setEmail("21@gmail.com");
            u21.setUsername("21User");
            u21.setPassword("password");
            u21.setGender((byte) 1);
            u21.setDob(new Date());
            userSessionLocal.createUser(u21);

            User u22 = new User();
            u22.setEmail("u22@gmail.com");
            u22.setUsername("u22User");
            u22.setPassword("password");
            u22.setGender((byte) 1);
            u22.setDob(new Date());
            userSessionLocal.createUser(u22);

            User u23 = new User();
            u23.setEmail("23@gmail.com");
            u23.setUsername("23User");
            u23.setPassword("password");
            u23.setGender((byte) 1);
            u23.setDob(new Date());
            userSessionLocal.createUser(u23);

            User u24 = new User();
            u24.setEmail("24@gmail.com");
            u24.setUsername("24User");
            u24.setPassword("password");
            u24.setGender((byte) 1);
            u24.setDob(new Date());
            userSessionLocal.createUser(u24);

            User u25 = new User();
            u25.setEmail("25@gmail.com");
            u25.setUsername("25User");
            u25.setPassword("password");
            u25.setGender((byte) 1);
            u25.setDob(new Date());
            userSessionLocal.createUser(u25);

            User u26 = new User();
            u26.setEmail("26@gmail.com");
            u26.setUsername("26User");
            u26.setPassword("password");
            u26.setGender((byte) 1);
            u26.setDob(new Date());
            userSessionLocal.createUser(u26);

            User u27 = new User();
            u27.setEmail("27@gmail.com");
            u27.setUsername("27User");
            u27.setPassword("password");
            u27.setGender((byte) 1);
            u27.setDob(new Date());
            userSessionLocal.createUser(u27);

            User u28 = new User();
            u28.setEmail("28@gmail.com");
            u28.setUsername("28User");
            u28.setPassword("password");
            u28.setGender((byte) 1);
            u28.setDob(new Date());
            userSessionLocal.createUser(u28);

            User u29 = new User();
            u29.setEmail("29@gmail.com");
            u29.setUsername("29User");
            u29.setPassword("password");
            u29.setGender((byte) 1);
            u29.setDob(new Date());
            userSessionLocal.createUser(u29);

            User u30 = new User();
            u30.setEmail("30@gmail.com");
            u30.setUsername("30User");
            u30.setPassword("password");
            u30.setGender((byte) 1);
            u30.setDob(new Date());
            userSessionLocal.createUser(u30);

            User u31 = new User();
            u31.setEmail("31@gmail.com");
            u31.setUsername("31User");
            u31.setPassword("password");
            u31.setGender((byte) 1);
            u31.setDob(new Date());
            userSessionLocal.createUser(u31);
            
            User badUser = new User();
            badUser.setEmail("Naughty@gmail.com");
            badUser.setUsername("NaughtyUser");
            badUser.setPassword("password");
            badUser.setGender((byte) 1);
            badUser.setDob(new Date());
            userSessionLocal.createUser(badUser);


            Party p = new Party();
            p.setInviteLink("https://discord.gg/WnD7mCpw");
            p.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p, 1L);

            Party p1 = new Party();
            p1.setInviteLink("https://discord.gg/WnD7mCpw");
            p1.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p1, 3L);

            Party p2 = new Party();
            p2.setInviteLink("https://discord.gg/WnD7mCpw");
            p2.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p2, 5L);

            Party p3 = new Party();
            p3.setInviteLink("https://discord.gg/WnD7mCpw");
            p3.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p3, 7L);

            Party p4 = new Party();
            p4.setInviteLink("https://discord.gg/WnD7mCpw");
            p4.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p4, 9L);

            Party p5 = new Party();
            p5.setInviteLink("https://discord.gg/WnD7mCpw");
            p5.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p5, 11L);

            Party p6 = new Party();
            p6.setInviteLink("https://discord.gg/WnD7mCpw");
            p6.setPartyStartTime(new SimpleDateFormat("yyyy-MM-dd").parse("2021-11-9"));
            p6.setPartyEndTime(new SimpleDateFormat("yyyy-MM-dd").parse("2021-11-11"));
            postSessionBeanLocal.createParty(p6, 13L);

            Party p7 = new Party();
            p7.setInviteLink("https://discord.gg/WnD7mCpw");
            p7.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p7, 15L);

            Party p8 = new Party();
            p8.setInviteLink("https://discord.gg/WnD7mCpw");
            p8.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p8, 17L);

            Party p9 = new Party();
            p9.setInviteLink("https://discord.gg/WnD7mCpw");
            p9.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p9, 19L);

            Party p10 = new Party();
            p10.setInviteLink("https://discord.gg/WnD7mCpw");
            p10.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p10, 21L);
            
            Party p11 = new Party();
            p11.setInviteLink("inviteLink110");
            p11.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(p11, 23L);
            
            Party badParty = new Party();
            badParty.setInviteLink("badLink");
            badParty.setPartyStartTime(new Date());
            postSessionBeanLocal.createParty(badParty, 32L);

            postSessionBeanLocal.joinParty(1L, 2L);
            postSessionBeanLocal.joinParty(1L, 3L);
            postSessionBeanLocal.joinParty(1L, 4L);
            postSessionBeanLocal.joinParty(1L, 5L);
            postSessionBeanLocal.joinParty(1L, 6L);
            postSessionBeanLocal.joinParty(1L, 7L);
            postSessionBeanLocal.joinParty(1L, 8L);
            postSessionBeanLocal.joinParty(1L, 9L);

            postSessionBeanLocal.joinParty(2L, 10L);
            postSessionBeanLocal.joinParty(2L, 11L);
            postSessionBeanLocal.joinParty(2L, 12L);
            postSessionBeanLocal.joinParty(2L, 13L);
            postSessionBeanLocal.joinParty(2L, 14L);
            postSessionBeanLocal.joinParty(2L, 15L);
            postSessionBeanLocal.joinParty(2L, 16L);

            postSessionBeanLocal.joinParty(3L, 2L);
            postSessionBeanLocal.joinParty(3L, 22L);
            postSessionBeanLocal.joinParty(3L, 15L);
            postSessionBeanLocal.joinParty(3L, 18L);
            postSessionBeanLocal.joinParty(3L, 19L);
            postSessionBeanLocal.joinParty(3L, 21L);
            postSessionBeanLocal.joinParty(3L, 23L);
            postSessionBeanLocal.joinParty(3L, 25L);
            postSessionBeanLocal.joinParty(3L, 27L);

            postSessionBeanLocal.joinParty(4L, 27L);

            postSessionBeanLocal.joinParty(5L, 11L);

            postSessionBeanLocal.joinParty(6L, 20L);
            postSessionBeanLocal.joinParty(6L, 21L);

            postSessionBeanLocal.joinParty(7L, 25L);
            postSessionBeanLocal.joinParty(7L, 26L);
            postSessionBeanLocal.joinParty(7L, 27L);
            postSessionBeanLocal.joinParty(7L, 28L);

            Review r1 = new Review();
            r1.setUserId(25L);
            r1.setRating(3);
            r1.setNote("Not Bad, can be better");

            Review r2 = new Review();
            r2.setUserId(26L);
            r2.setRating(5);
            r2.setNote("Excellent!! Fun team, fun game, ezgame, cheers");

            Review r3 = new Review();
            r3.setUserId(27L);
            r3.setRating(5);
            r3.setNote("GGEZ BROZZZZ");

            Review r4 = new Review();
            r4.setUserId(28L);
            r4.setRating(1);
            r4.setNote("Throw game, report this party lmao");

            postSessionBeanLocal.createReview(r1, 25L, 7L);
            postSessionBeanLocal.createReview(r2, 26L, 7L);
            postSessionBeanLocal.createReview(r3, 27L, 7L);
            postSessionBeanLocal.createReview(r4, 28L, 7L);

            Post o1 = new Post();
            o1.setTitle("Bringing your LOL rank up to the max");
            o1.setDescription("Best service you can ever find. I have never lost.");
            o1.setRequestQty(1);
            o1.setRequestPrice(BigDecimal.valueOf(30));
            o1.setGame(g1);
            postSessionBeanLocal.createPost(o1, 8L, 15L, 1L);

            Post o2 = new Post();
            o2.setTitle("finding friends");
            o2.setDescription("I am lonely");
            o2.setRequestQty(5);
            o2.setRequestPrice(BigDecimal.ZERO);
            o2.setGame(g2);
            postSessionBeanLocal.createPost(o2, 9L, 17L, 2L);

            Post o3 = new Post();
            o3.setTitle("Need Boost to GE");
            o3.setDescription("Need to lvl my CSGO to Global Elite, I will pay any amount coz im filthy rich");
            o3.setRequestQty(4);
            o3.setRequestPrice(BigDecimal.ZERO);
            o3.setGame(g2);
            postSessionBeanLocal.createPost(o3, 10L, 19L, 2L);

            Post o4 = new Post();
            o4.setTitle("Dota 2 MMR > 4000 only");
            o4.setDescription("Join only if your MMR>4000. Else, get lost.");
            o4.setRequestQty(4);
            o4.setRequestPrice(BigDecimal.ZERO);
            o4.setGame(g3);
            postSessionBeanLocal.createPost(o4, 5L, 9L, 3L);

            Post o5 = new Post();
            o5.setTitle("LOL friendly team");
            o5.setDescription("Join if you just wanna have fun!");
            o5.setRequestQty(4);
            o5.setRequestPrice(BigDecimal.ZERO);
            o5.setGame(g1);
            postSessionBeanLocal.createPost(o5, 11L, 21L, 1L);

            Post o6 = new Post();
            o6.setTitle("1v1 Coaching");
            o6.setDescription("Providing 1 on 1 coaching in a 1h 1v1 game");
            o6.setRequestQty(1);
            o6.setRequestPrice(BigDecimal.valueOf(50));
            o6.setGame(g2);
            postSessionBeanLocal.createPost(o6, 4L, 7L, 2L);
            
            Post o7 = new Post();
            o7.setTitle("Hello everyone!");
            o7.setDescription("Testing testing");
            o7.setRequestQty(1);
            o7.setRequestPrice(BigDecimal.valueOf(0));
            o7.setGame(g1);
            postSessionBeanLocal.createPost(o7, 12L, 23L, 1L);
            
            Post badPost = new Post();
            badPost.setTitle("Accepting Bets");
            badPost.setDescription("Random 1v1 game, odds 1:1, no gimmicks, Paypal fast cash, no scams");
            badPost.setRequestQty(100);
            badPost.setRequestPrice(BigDecimal.valueOf(10));
            badPost.setGame(g2);
            postSessionBeanLocal.createPost(badPost, 13L, 32L, 2L);

            Chat c1 = new Chat();
            c1.setName("party p1");
            c1.setParty(Boolean.TRUE);
            c1.getUsers().add(u);
            c1.getUsers().add(u3);
            c1.getUsers().add(u4);
            c1.getUsers().add(u6);
            chatSessionBeanLocal.addGroupChat(c1, new Long(1));

            ChatMessage cm1 = new ChatMessage();
            cm1.setMessage("Hey whatsupppppp");
            chatSessionBeanLocal.addMessage(cm1, new Long(3), new Long(1));

            ChatMessage cm2 = new ChatMessage();
            cm2.setMessage("Yo");
            chatSessionBeanLocal.addMessage(cm2, new Long(6), new Long(1));

            ChatMessage cm3 = new ChatMessage();
            cm3.setMessage("Lets get this Boisssssssssssssssssssssssssssssss");
            chatSessionBeanLocal.addMessage(cm3, new Long(4), new Long(1));

            Chat newC1 = chatSessionBeanLocal.getChat(new Long(1));
            Date time = chatSessionBeanLocal.getChatMessage(new Long(3)).getDateTime();
            newC1.setLastMsgTime(time);

            Chat c2 = new Chat();
            c2.setName("party p2");
            c2.setParty(Boolean.TRUE);
            c2.getUsers().add(u15);
            c2.getUsers().add(u3);
            c2.getUsers().add(u14);
            c2.getUsers().add(u16);
            chatSessionBeanLocal.addGroupChat(c2, new Long(2));

            ChatMessage cm4 = new ChatMessage();
            cm4.setMessage("Nice to meet all of you");
            chatSessionBeanLocal.addMessage(cm4, new Long(3), new Long(2));

            Chat newC2 = chatSessionBeanLocal.getChat(new Long(2));
            Date timec2 = chatSessionBeanLocal.getChatMessage(new Long(4)).getDateTime();
            newC2.setLastMsgTime(timec2);

            Chat c3 = new Chat();
            c3.getUsers().add(u2);
            c3.getUsers().add(u);
            chatSessionBeanLocal.addChat(c3, new Long(2));

            Chat c4 = new Chat();
            c4.getUsers().add(u10);
            c4.getUsers().add(u);
            chatSessionBeanLocal.addChat(c4, new Long(10));

            ChatMessage cm5 = new ChatMessage();
            cm5.setMessage("Hey I am interested in your teaching, may i know what do you teach?");
            chatSessionBeanLocal.addMessage(cm5, new Long(1), new Long(4));

            ChatMessage cm6 = new ChatMessage();
            cm6.setMessage("I am coach for the games. I can lead u in team battles.");
            chatSessionBeanLocal.addMessage(cm6, new Long(10), new Long(4));

            Chat newC4 = chatSessionBeanLocal.getChat(new Long(4));
            Date timec4 = chatSessionBeanLocal.getChatMessage(new Long(6)).getDateTime();
            newC4.setLastMsgTime(timec4);

            Chat c5 = new Chat();
            c5.getUsers().add(u6);
            c5.getUsers().add(u);
            chatSessionBeanLocal.addChat(c5, new Long(6));

            Chat c6 = new Chat();
            c6.getUsers().add(u8);
            c6.getUsers().add(u);
            chatSessionBeanLocal.addChat(c6, new Long(8));

            Chat c7 = new Chat();
            c7.getUsers().add(u15);
            c7.getUsers().add(u);
            chatSessionBeanLocal.addChat(c7, new Long(15));

            Chat c8 = new Chat();
            c8.getUsers().add(u9);
            c8.getUsers().add(u);
            chatSessionBeanLocal.addChat(c8, new Long(9));

            Chat c9 = new Chat();
            c9.getUsers().add(u17);
            c9.getUsers().add(u);
            chatSessionBeanLocal.addChat(c9, new Long(17));

            Chat c10 = new Chat();
            c10.getUsers().add(u27);
            c10.getUsers().add(u);
            chatSessionBeanLocal.addChat(c10, new Long(27));

        } catch (Exception ex) {
            Logger.getLogger(DataInitialisationSession.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
