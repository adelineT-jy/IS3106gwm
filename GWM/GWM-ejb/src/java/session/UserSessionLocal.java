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
import javax.ejb.Local;
import error.NoResultException;

/**
 *
 * @author ruth
 */
@Local
public interface UserSessionLocal {
    
    //user (profile, card, experience, history of requests/posts/parties/reviews)
    public void createUser(User u) throws CreateUserException;
    
    public User doLogin(String username, String password) throws InvalidLoginException;
    
    public User getUserById(Long userId) throws NoResultException; 
    
    public List<User> searchUser(String username) throws NoResultException;
    
    public void updateUserProfile(User u) throws NoResultException;
    
    public void addCard(Long userId, Card c) throws NoResultException;
    
    public void deleteCard(Long userId, Long cardId) throws NoResultException;
    
    public List<Experience> getUserExperiences(Long userId)throws NoResultException;
    
    public void addExperience(Long userId, Experience exp, Long gameId) throws NoResultException, ExperienceExistException;
    
    public void updateExperience(Experience exp) throws NoResultException;
    
    public void deleteExperience(Long userId,  Long expId) throws NoResultException;
    
    public List<User> getUserFollowers(Long userId) throws NoResultException;
    
    public List<User> getUserFollowing(Long userId) throws NoResultException;
    
    public void addFollowing(Long userId, Long followingUserId) throws NoResultException;
    
    public void deleteFollowing(Long userId, Long followingUserId) throws NoResultException;
    
    public List<Review> viewMyReviews(Long userId) throws NoResultException;
    
        public List<Game> getAllGames() throws NoResultException;

    
    

    
}
