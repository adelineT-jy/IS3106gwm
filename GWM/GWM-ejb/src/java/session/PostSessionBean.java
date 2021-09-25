package session;

import entity.Party;
import entity.Payment;
import entity.Post;
import entity.Request;
import entity.Review;
import entity.User;
import enumeration.RequestStatus;
import error.AuthenticationException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class PostSessionBean implements PostSessionBeanLocal {

    @PersistenceContext(unitName = "Gwm-ejbPU")
    private EntityManager em;

    @Override
    public List<Post> searchPosts(String query) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Post> searchPostsByUser(Long userId) throws NoResultException {
        return getUser(userId).getPosts();
    }

    @Override
    public List<Request> searchRequestsByUser(Long userId) throws NoResultException {
        return getUser(userId).getRequests();
    }

    @Override
    public List<Party> searchPartiesByUser(Long userId) throws NoResultException {
        return getUser(userId).getParties();
    }

    @Override
    public List<Review> searchReviewsByUser(Long userId) throws NoResultException {
        Query q = em.createQuery("SELECT r FROM Review r WHERE r.userId = :inUserId");
        q.setParameter("inUserId", userId);
        
        return q.getResultList();
    }

    @Override
    public List<Review> searchReviewsOfUser(Long userId) throws NoResultException {
        Query q = em.createQuery("SELECT r FROM User u JOIN u.parties p JOIN p.reviews r "
                + "WHERE u.userId <> r.userId");
        
        return q.getResultList();
    }

    @Override
    public void createParty(Party party, Long userId) throws NoResultException {
        User u = getUser(userId);
        List<User> users = new ArrayList<>();
        users.add(u);
        
        party.setPartyOwner(u);
        party.setUsers(users);
        party.setRequests(new ArrayList<>());
        party.setReviews(new ArrayList<>());
        em.persist(party);
        u.getParties().add(party);
    }

    @Override
    public void joinParty(Long partyId, Long userId) throws NoResultException {
        User u = getUser(userId);
        Party party = getParty(partyId);
        
        if (party.getUsers().contains(u)) {
            return;
        }
        
        party.getUsers().add(u);
        u.getParties().add(party);
    }

    @Override
    public void acceptToParty(Long rId, Long partyId, Long userId) throws NoResultException, AuthenticationException { // userId is the one accepting, has to be party owner.
        if (!checkPartyOwner(partyId, userId)) {
            throw new AuthenticationException("User not authenticated to accept request.");
        }
        
        Request r = getRequest(rId);
        User toAdd = r.getRequester();
        
        r.setStatus(RequestStatus.ACCEPTED);
        joinParty(partyId, toAdd.getUserId());
    }

    @Override
    public void rejectFromParty(Long rId, Long partyId, Long userId) throws NoResultException, AuthenticationException {
        if (!checkPartyOwner(partyId, userId)) {
            throw new AuthenticationException("User not authenticated to reject request.");
        }
        
        Request r = getRequest(rId);
        r.setStatus(RequestStatus.REJECTED);
    }

    @Override
    public void deleteParty(Long partyId, Long userId) throws NoResultException, AuthenticationException {
        if (!checkPartyOwner(partyId, userId)) {
            throw new AuthenticationException("User not authenticated to delete party.");
        }
        
        Party p = getParty(partyId);
        if (p.getPartyEndTime() != null) {
            throw new NoResultException("No such party cannot be deleted.");
        }
        
        for (int i = 0; i < p.getUsers().size(); i++) {
            p.getUsers().get(i).getParties().remove(p);
        }
        p.setUsers(new ArrayList<>());
        em.remove(p);
    }

    @Override
    public void endParty(Long partyId, Long userId) throws NoResultException, AuthenticationException {
        if (!checkPartyOwner(partyId, userId)) {
            throw new AuthenticationException("User not authenticated to delete party.");
        }
        Party p = getParty(partyId);
        p.setPartyEndTime(new Date());
    }

    @Override
    public void createPost(Post p, Long partyId, Long userId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void editPost(Post p, Long userId) throws NoResultException, AuthenticationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void deletePost(Long pId, Long userId) throws NoResultException, AuthenticationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void createRequest(Request r, Long pId) throws NoResultException {
        r.setStatus(RequestStatus.PENDING);
        em.persist(r);
        User u = getUser(r.getRequester().getUserId());
        u.getRequests().add(r);
        Party p = getParty(pId);
        p.getRequests().add(r);
    }

    @Override
    public void deleteRequest(Long rId, Long userId) throws NoResultException, AuthenticationException {
        Request r = getRequest(rId);
        if (!r.getRequester().getUserId().equals(userId)) {
            throw new AuthenticationException("User not authenticated to delete request");
        }
        
        User u = getUser(userId);
        u.getRequests().add(r);
        em.remove(r);
        em.flush(); // need to get rid of request on party side
    }

    @Override
    public void makePayment(Payment p, Long pId, Long userId) throws NoResultException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void createReview(Review rev, Long userId, Long partyId) throws NoResultException {
        rev.setUserId(userId);
        Party p = getParty(partyId);
        if (p.getUsers().stream()
                .filter(x -> x.getUserId().equals(userId))
                .findFirst()
                .get() == null) {
            throw new NoResultException("You were not in this party.");
        }
        em.persist(rev);
        p.getReviews().add(rev);
    }

    @Override
    public User getUser(Long userId) throws NoResultException {
        User user = em.find(User.class, userId);
        
        if (user == null) {
            throw new NoResultException("User");
        }
        
        return user;
    }

    @Override
    public Party getParty(Long partyId) throws NoResultException {
        Party party = em.find(Party.class, partyId);
        
        if (party == null) {
            throw new NoResultException("No such party");
        }
        party.getPartyOwner();
        
        return party;
    }
    
    @Override
    public boolean checkPartyOwner(Long partyId, Long userId) {        
        return getParty(partyId).getPartyOwner().getUserId().equals(userId);
    }

    @Override
    public Post getPost(Long postId) throws NoResultException {
        Post post = em.find(Post.class, postId);
        
        if (post == null) {
            throw new NoResultException("No such post");
        }
        post.getUser();
        post.getParty();
        post.getRequest();
        post.getPayment();
        
        return post;
    }

    @Override
    public Request getRequest(Long rId) throws NoResultException {
        Request request = em.find(Request.class, rId);
        
        if (request == null) {
            throw new NoResultException("No such request");
        }
        
        return request;
    }

    @Override
    public Payment getPayment(Long paymentId) throws NoResultException {
        Payment payment = em.find(Payment.class, paymentId);
        
        if (payment == null) {
            throw new NoResultException("No such payment");
        }
        
        return payment;
    }

    @Override
    public Review getReview(Long revId) throws NoResultException {
        Review review = em.find(Review.class, revId);
        
        if (review == null) {
            throw new NoResultException("No such review");
        }
        
        return review;
    }

}
