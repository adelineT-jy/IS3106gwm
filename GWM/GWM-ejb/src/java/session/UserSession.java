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

    @Override
    public void createUser(User u) throws CreateUserException {
        try {
            em.persist(u);
            em.flush();
        } catch (Exception ex) {
            throw new CreateUserException(ex.getMessage());
        }
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
        em.persist(c);
        u.addCard(c);
    }

    @Override
    public void deleteCard(Long userId, Long cardId) throws NoResultException {
        User u = getUserById(userId);
        //should check if there is any ongoing transactions before deleting
        u.getCards().remove(em.find(Card.class, cardId));
    }

    @Override
    public void addExperience(Long userId, Experience exp, Long gameId) throws NoResultException, ExperienceExistException {
        User u = getUserById(userId);
        Game game = em.find(Game.class, gameId);

        if (game != null) {
            //check if game experience has already been added
            Query q = em.createQuery("SELECT DISTINCT u FROM User u WHERE u.userId = :userId AND u.experiences.game.gameId = :gameId");
            q.setParameter("userId", userId);
            q.setParameter("gameId", gameId);
            try {
                q.getSingleResult();

                exp.setGame(game);
                em.persist(exp);
                u.addExperience(exp);
            } catch (Exception e) {
                throw new ExperienceExistException("Experience for game exists already");
            }
        } else {
            throw new NoResultException("Game cannot be found");
        }

    }

    @Override
    public void updateExperience(Experience exp, Long gameId) throws NoResultException {
        Experience oldExp = em.find(Experience.class, exp.getExperienceId());

        if (gameId != oldExp.getGame().getGameId() && gameId != null) {
            Game updatedGame = em.find(Game.class, gameId);
            oldExp.setGame(updatedGame);
        }

        oldExp.setProfileLink(exp.getProfileLink());
        oldExp.setRanking(exp.getRanking());
    }

    @Override
    public void deleteExperience(Long userId, Long expId) throws NoResultException {
        User u = getUserById(userId);
        Experience exp = em.find(Experience.class, expId);
        if (exp != null) {
            u.getExperiences().remove(exp);
        } else {
            throw new NoResultException("Experience cannot be deleted");
        }
    }
    
    @Override
    public List<User> getUserFollowers(Long userId) throws NoResultException {
        Query q = em.createQuery("SELECT DISTINCT u FROM User u, u.following f WHERE f.userId = :userId");
        q.setParameter("userId", userId);
        return (List<User>) q.getResultList();
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
        } else {
            throw new NoResultException("User cannot follow yourself");
        }
    }

    @Override
    public void deleteFollowing(Long userId, Long followingUserId) throws NoResultException {
        User u = getUserById(userId);
        User unfollow = getUserById(followingUserId);
        u.getFollowing().remove(unfollow);
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
