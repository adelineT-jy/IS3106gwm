package session;

import entity.Chat;
import entity.ChatMessage;
import entity.Party;
import entity.Payment;
import entity.Post;
import entity.Request;
import entity.Review;
import entity.User;
import error.AuthenticationException;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

@Local
public interface PostSessionBeanLocal {

    public List<Post> searchPosts(String query);

    public List<Post> searchPostsByUser(Long userId) throws NoResultException;

    public List<Request> searchRequestsByUser(Long userId) throws NoResultException;

    public void searchRequestsResetUser(Long userId) throws NoResultException;

    public List<Party> searchPartiesByUser(Long userId) throws NoResultException;

    public List<Review> searchReviewsByUser(Long userId) throws NoResultException;

    public List<Review> searchReviewsOfUser(Long userId) throws NoResultException;

    public void createParty(Party party, Long userId, Long postId) throws NoResultException;

    public void joinParty(Long partyId, Long userId) throws NoResultException;

    public void acceptToParty(Long rId, Long partyId, Long userId) throws NoResultException, AuthenticationException;

    public void rejectFromParty(Long rId, Long partyId, Long userId) throws NoResultException, AuthenticationException;

    public void deleteParty(Long partyId, Long userId) throws NoResultException, AuthenticationException;

    public void endParty(Long partyId, Long userId) throws NoResultException, AuthenticationException;

    public void createPost(Post p, Long partyId, Long userId, Long gameId);

    public void createPost(Post p, Long userId, Long gameId);

    public void editPost(Post p, Long userId) throws NoResultException, AuthenticationException;

    public void deletePost(Long pId, Long userId) throws NoResultException, AuthenticationException;

    public void createRequest(Request r, Long pId, Long uId) throws NoResultException;

    public Boolean checkRequestCreated(Long pId, Long uId);

    public void deleteRequest(Long rId, Long userId) throws NoResultException, AuthenticationException;

    public void makePayment(Payment p, Long pId, Long userId) throws NoResultException;

    public void createReview(Review rev, Long userId, Long forUserId, Long partyId) throws NoResultException;

    // Helper methods
    public User getUser(Long userId) throws NoResultException;

    public Party getParty(Long partyId) throws NoResultException;

    public boolean checkPartyOwner(Long partyId, Long userId);

    public boolean checkPartyUser(Long partyId, Long userId);

    public Post getPost(Long postId) throws NoResultException;

    public Post getPostFromParty(Long partyId) throws NoResultException;

    public boolean checkPostOwner(Long postId, Long userId);

    public Request getRequest(Long rId) throws NoResultException;

    public Payment getPayment(Long paymentId) throws NoResultException;

    public Review getReview(Long revId) throws NoResultException;

}
