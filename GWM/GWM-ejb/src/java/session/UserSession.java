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
import error.ExperienceExistException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
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
    public void createUser(User u) {
        em.persist(u);
    }

    @Override
    public User getUserById(Long userId) throws NoResultException {
        User u = em.find(User.class, userId);
        
        if (u != null) {
            return u;
        } else {
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
        
        oldU.setEmail(u.getEmail());
        //this should be a method on its own?
        oldU.setProtectedPassword(u.getProtectedPassword());
        oldU.setUsername(u.getUsername());
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
        oldExp.setRank(exp.getRank());
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
    public List<User> getUserFollowing(Long userId) throws NoResultException {
        User u = getUserById(userId);
        List<User> following = u.getFollowing();
        return following;
    }

    @Override
    public void addFollowing(Long userId, Long followingUserId) throws NoResultException {
        User u = getUserById(userId);
        User toFollow = getUserById(followingUserId);
        u.addFollowing(toFollow);
    }

    @Override
    public void deleteFollowing(Long userId, Long followingUserId) throws NoResultException {
        User u = getUserById(userId);
        User unfollow = getUserById(followingUserId);
        u.getFollowing().remove(unfollow);
    }

    //should reviews be connected to user?
    @Override
    public List<Review> viewReviewsGiven(Long userId) throws NoResultException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
