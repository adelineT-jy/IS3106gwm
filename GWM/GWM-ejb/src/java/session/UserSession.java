/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session; 

import entity.Card;
import entity.Experience;
import entity.Game;
import entity.Review;
import entity.User;
import error.CreateUserException;
import error.ExperienceExistException;
import error.InvalidLoginException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import error.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

/**
 *
 * @author ruth
 */
@Stateless
public class UserSession implements UserSessionLocal {

    @PersistenceContext
    private EntityManager em;
    

    @Override
    public User doLogin(String username, String password) throws InvalidLoginException {
        try {
            System.out.println("EJB: login");
            User user = getUserByUsername(username);
            if (user.getPassword().equals(password) && user.isIsAvailable()) {
                return user;
            } else {
                throw new InvalidLoginException("Password Incorrect");
            }
        } catch (NoResultException ex) {
            throw new InvalidLoginException("Username not found"); 
        }
    }
    
    private User getUserByUsername(String username) throws NoResultException {
        Query query = em.createQuery("SELECT u FROM User u WHERE u.username = :username");
        query.setParameter("username", username);

        try {
            User u = (User) query.getSingleResult();
            return u;
        } catch (javax.persistence.NoResultException | NonUniqueResultException ex) {
            throw new NoResultException("Username does not exist");
        }
    }
    
    private boolean doesUsernameExist(String username) throws CreateUserException {
        Query query = em.createQuery("SELECT u FROM User u WHERE u.username = :username");
        query.setParameter("username", username);

        List<User> u = query.getResultList();
        if (u != null && u.size() == 1) {
            return true;
        } else {
            return false;
        }
    }
    
    private boolean doesEmailExist(String email) throws CreateUserException {
        TypedQuery<Long> query = em.createQuery("SELECT COUNT(u) FROM User u WHERE u.email = :email", Long.class);
        query.setParameter("email", email);
        Long count = query.getSingleResult();

        if (count >= 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void createUser(User u) throws CreateUserException {
        if (doesUsernameExist(u.getUsername())) {
            throw new CreateUserException("Username exists");
        }
        if (doesEmailExist(u.getEmail())) {
            throw new CreateUserException("Email exists");
        }
        em.persist(u);
        em.flush();
    }

    @Override
    public User getUserById(Long userId) throws NoResultException {
        try {    
            User u = em.find(User.class, userId);
            if (u != null) {
                return u;
            } else {
                throw new NoResultException("Not found");
            }
        } catch (Exception ex) {
            throw new NoResultException("Not found");
        }
    }

    @Override
    public List<User> searchUser(String username) throws NoResultException {
        Query q;
        if (username != null) {
            q = em.createQuery("SELECT u FROM User u WHERE " + "LOWER(u.username) LIKE :username");
            q.setParameter("username", "%" + username.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT u FROM User u");
        }

        return q.getResultList();
    }

    @Override
    public void updateUserProfile(User u) throws NoResultException {
        User oldU = getUserById(u.getUserId());
        if (u.getEmail() == null || u.getEmail().equals("")){
            throw new NoResultException("Email is required");
        } else {
            oldU.setEmail(u.getEmail());
        }
        if (u.getUsername() == null || u.getUsername().equals("")){
            throw new NoResultException("Username is required"); 
        } else {
            oldU.setUsername(u.getUsername());           
        }
        oldU.setGender(u.getGender());
        oldU.setDob(u.getDob());
    }

    @Override
    public void addCard(Long userId, Card c) throws NoResultException {
        User u = getUserById(userId);
        
        if (c.getCardNum().equals("") || c.getCvv().equals("") 
                || c.getName().equals("") || c.getExpDate() == null) {
            throw new NoResultException("Missing values");
        } else {
        em.persist(c);
        u.addCard(c);
        }
    }

    @Override
    public void deleteCard(Long userId, Long cardId) throws NoResultException {
        User u = getUserById(userId);
        //should check if there is any ongoing transactions before deleting
        u.getCards().remove(em.find(Card.class, cardId));
    }
    
    @Override
    public List<Experience> getUserExperiences(Long userId)throws NoResultException {
        User u  = getUserById(userId);
        if (u != null) {
            return u.getExperiences();
        } else {
            throw new NoResultException("No Exceperiences");
        }
    }

    @Override
    public void addExperience(Long userId, Experience exp, Long gameId) throws NoResultException, ExperienceExistException {
        User u = getUserById(userId);
        Game game = em.find(Game.class, gameId);
//        System.out.println("game found");
//        System.out.println("Adding for" + gameId);
//        System.out.println("Adding for" + game.getGameName());
        if (game != null) {
            //check if game experience has already been added
            Query q = em.createQuery("SELECT DISTINCT exp FROM User u, IN (u.experiences) exp WHERE u.userId = :userId AND exp.game.gameId = :gameId");
            q.setParameter("userId", userId);
            q.setParameter("gameId", gameId);
            List<Experience> test = (List<Experience>) q.getResultList();
            if (test.size() > 0) {
//                System.out.println(test.get(0).getExperienceId());
//                System.out.println("exp found");
                throw new ExperienceExistException("Experience for game exists already");
            } else {
                exp.setGame(game);
                em.persist(exp);
                u.addExperience(exp);
//                System.out.println("exp not found");
                em.flush();
            }
        } else {
            throw new NoResultException("Game cannot be found");
        }

    }
    
    @Override
    public List<Game> getAllGames() throws NoResultException {
        Query q;
            q = em.createQuery("SELECT g from Game g WHERE !isHidden ORDER BY g.gameId");

        return q.getResultList();
    }

    @Override
    public void updateExperience(Experience exp) throws NoResultException {
        Experience oldExp = em.find(Experience.class, exp.getExperienceId());
        oldExp.setProfileLink(exp.getProfileLink());
        oldExp.setRanking(exp.getRanking());
    }

    @Override
    public void deleteExperience(Long userId, Long expId) throws NoResultException {
        User u = getUserById(userId);
        Experience exp = em.find(Experience.class, expId);
        if (exp != null) {
            u.getExperiences().remove(exp);
            em.flush();
        } else {
            throw new NoResultException("Experience cannot be deleted");
        }
    }
    
    @Override
    public List<User> getUserFollowers(Long userId) throws NoResultException {
        Query q = em.createQuery("SELECT DISTINCT u FROM User u, u.following f WHERE f.userId = :userId");
        q.setParameter("userId", userId);
        return (List<User>) q.getResultList();
//          User u = getUserById(userId);
//          return u.getFollowers();
    }

    @Override
    public List<User> getUserFollowing(Long userId) throws NoResultException {
        User u = getUserById(userId);
        List<User> following = u.getFollowing();
        return following;
    }

    @Override
    public void addFollowing(Long userId, Long followingUserId) throws NoResultException {
        if (userId != followingUserId) {
            User u = getUserById(userId);
            User toFollow = getUserById(followingUserId);
            u.addFollowing(toFollow);
//            toFollow.addFollower(u);
        } else {
            throw new NoResultException("User cannot follow yourself");
        }
    }

    @Override
    public void deleteFollowing(Long userId, Long followingUserId) throws NoResultException {
        User u = getUserById(userId);
        User unfollow = getUserById(followingUserId);
        u.getFollowing().remove(unfollow);
//        unfollow.removeFollower(u);
    }

    @Override
    public List<Review> viewMyReviews(Long userId) throws NoResultException {
        User u = getUserById(userId);
        if (u.getReviews().size() > 0) {
            return u.getReviews();
        } else {
            throw new NoResultException("User does not have any reviews");
        }
    }
}
