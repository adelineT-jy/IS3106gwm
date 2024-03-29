package session;

import entity.Chat;
import entity.Game;
import entity.Party;
import entity.Payment;
import entity.Post;
import entity.Request;
import entity.Review;
import entity.User;
import enumeration.RequestStatus;
import error.AuthenticationException;
import error.InsufficientFundsException;
import error.NoResultException;
import error.RequestExistException;
import error.ReviewExistException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class PostSessionBean implements PostSessionBeanLocal {

    @PersistenceContext(unitName = "Gwm-ejbPU")
    private EntityManager em;

    @EJB
    private GameSessionLocal gameSessionLocal;

    @EJB
    private ChatSessionLocal chatSessionLocal;

    @EJB
    private UserSessionLocal userSessionLocal;

    @EJB
    private TransferSessionLocal transferSessionLocal;

    @Override
    public List<Post> searchPosts(String query) {
        Query q;
        if (query == null) {
            q = em.createQuery("SELECT p FROM Post p");
        } else {
            q = em.createQuery("SELECT DISTINCT p FROM Post p WHERE p.description LIKE :query "
                    + "OR p.title LIKE :query");
            q.setParameter("query", "%" + query.toLowerCase() + "%");
        }

        List<Post> results = q.getResultList();
        /*  for (int i = 0; i < results.size(); i++) {
            results.get(i).getParty();
        }*/
        return results;
    }

    @Override
    public List<Post> searchPostsByUser(Long userId) throws NoResultException {
        return getUser(userId).getPosts();
    }

    @Override
    public List<Post> searchPostsByUsername(String username) {
        Query q;

        if (username != null) {
            q = em.createQuery("SELECT p FROM Post p INNER JOIN User u ON p.userId = u.userId WHERE LOWER(u.username) LIKE :username");
            q.setParameter("username", "%" + username.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT p FROM Post p");
        }
        return q.getResultList();
    }

    @Override
    public List<Request> searchRequestsByUser(Long userId) throws NoResultException {
        //return getUser(userId).getRequests();
        List<Request> r = getUser(userId).getRequests();
        /*for (Request rr : r) {
            rr.setRequester(null);
        }*/
        return r;
    }

    @Override
    public void searchRequestsResetUser(Long userId) throws NoResultException {
        //return getUser(userId).getRequests();
        User u = getUser(userId);
        List<Request> r = getUser(userId).getRequests();
        for (Request rr : r) {
            rr.setRequester(u);
        }
    }

    @Override
    public List<Party> searchPartiesByUser(Long userId) throws NoResultException {
        System.out.println(getUser(userId));
        return getUser(userId).getParties();
    }

    @Override
    public List<Party> searchPartiesByUsername(String username) {
        Query q;
        if (username != null) {
            q = em.createQuery("SELECT p FROM Party p WHERE LOWER(p.partyOwner.username) LIKE :username");
            q.setParameter("username", "%" + username.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT p FROM Party p");
        }
        return q.getResultList();
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
        party.setReviews(new ArrayList<>());
        party.setPartyStartTime(new Date());
        party.setHidden(false);

        em.persist(party);
        u.getParties().add(party);
        em.flush();

        Chat c = new Chat();
        c.setParty(Boolean.TRUE);
        c.setName("Party" + party.getPartyId());
        c.setUsers(users);
        em.persist(c);
        party.setChat(c);
        for (User uu : users) {
            User uuu = getUser(uu.getUserId());
            uuu.getChats().add(c);
        }
    }

    /*@Override
    public void createParty(Party party, Long userId, Long postId) throws NoResultException {
        User u = getUser(userId);
        List<User> users = new ArrayList<>();
        users.add(u);

        party.setPartyOwner(u);
        party.setUsers(users);
        party.setReviews(new ArrayList<>());
        Post p = getPost(postId);
        party.setPost(p);

        em.persist(party);
        // em.flush();
        u.getParties().add(party);

        //p.setParty(party);
    }*/
    @Override
    public void joinParty(Long partyId, Long userId) throws NoResultException {
        User u = getUser(userId);
        Party party = getParty(partyId);

        if (party.getUsers().contains(u)) {
            return;
        }

        party.getUsers().add(u);
        u.getParties().add(party);

        try {
            Post p = party.getPost();
            p.setRequestQty(p.getRequestQty() - 1);
            if (p.getRequestQty() == 0) {
                p.setIsAvailable(false);
            }
        } catch (NullPointerException ex) {
        }
    }

    @Override
    public void acceptToParty(Long rId, Long partyId, Long userId) throws NoResultException, AuthenticationException, InsufficientFundsException { // userId is the one accepting, has to be party owner.

        if (!checkPartyOwner(partyId, userId)) {
            throw new AuthenticationException("User not authenticated to accept request.");
        }

        Request r = getRequest(rId);

        BigDecimal price = r.getRequestPrice();
        User toAdd = r.getRequester();
        User owner = getUser(userId);

        try {
            transferSessionLocal.transferFunds(toAdd.getUserId(), userId, price);
            r.setStatus(RequestStatus.ACCEPTED);
            joinParty(partyId, toAdd.getUserId());
            Chat c = getParty(partyId).getChat();
            Chat cc = chatSessionLocal.getChat(c.getChatId());
            cc.getUsers().add(toAdd);

        } catch (InsufficientFundsException ex1) {
            throw new InsufficientFundsException("Requester does not have enough funds to join.");
        } catch (NoResultException ex2) {
            throw new NoResultException("Invalid user.");
        }
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
    public void deleteParty(Long partyId, Long userId) throws NoResultException, AuthenticationException, InsufficientFundsException {
        if (!checkPartyOwner(partyId, userId)) {
            throw new AuthenticationException("User not authenticated to delete party.");
        }

        Party p = getParty(partyId);
        if (p.getPartyEndTime() != null) {
            throw new NoResultException("No such party. Unsuccessful deletion.");
        }

        // Return to requesters
        try {
            List<Request> requests = p.getPost() == null ? new ArrayList<>() : p.getPost().getRequest();
            for (Request r : requests) {
                if (r.getStatus().equals(RequestStatus.ACCEPTED)) {
                    transferSessionLocal.transferFundsUser(p.getPartyOwner(), r.getRequester(), r.getRequestPrice());
                }
            }
        } catch (InsufficientFundsException ex) {
            throw new InsufficientFundsException("Invalid users.");
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
    public void createPost(Post p, Long partyId, Long userId, Long gameId) throws NoResultException {
        if (!checkPartyUser(partyId, userId)) {
            throw new NoResultException("You are not in this party.");
        }

        User user = getUser(userId);
        Game game = gameSessionLocal.getGame(gameId);
        p.setGame(game);
        p.setIsAvailable(true);
        p.setPostDate(new Date());
        p.setUserId(user.getUserId());
        p.setHidden(false);

        em.persist(p);
        em.flush();

        user.getPosts().add(p);
        Party party = getParty(partyId);
        party.setPost(p);
    }

    /* @Override
    public void createPost(Post p, Long userId, Long gameId) {
        User user = getUser(userId);
        Game game = gameSessionLocal.getGame(gameId);
        p.setGame(game);
        p.setIsAvailable(true);
        p.setUserId(user.getUserId());
        em.persist(p);

        user.getPosts().add(p);
        em.flush();
    }*/
    @Override
    public void editPost(Post p, Long userId, Long gameId) throws NoResultException, AuthenticationException {

        if (!checkPostOwner(p.getPostId(), userId)) {
            throw new AuthenticationException("You are not the owner of the post.");
        }
        Game game = gameSessionLocal.getGame(gameId);
        Post oldP = getPost(p.getPostId());
        oldP.setDescription(p.getDescription());
        oldP.setGame(game);
        oldP.setGratitude(p.getGratitude());
        oldP.setIsAvailable(p.isIsAvailable());
        oldP.setRequestPrice(p.getRequestPrice());
        oldP.setRequestQty(p.getRequestQty());
        oldP.setIsAvailable(p.getRequestQty() != 0);
        oldP.setTitle(p.getTitle());
    }

    @Override
    public void deletePost(Long pId, Long userId) throws NoResultException, AuthenticationException {
        if (!checkPostOwner(pId, userId)) {
            throw new AuthenticationException("You are not the owner of the post.");
        }
        Post p = getPost(pId);
        User u = getUser(userId);
        u.getPosts().remove(p);
        Party party = getPartyFromPost(pId);
        party.setPost(null);
        em.remove(p);
    }

    @Override
    public Boolean checkRequestCreated(Long pId, Long uId) throws NoResultException {
        Post p = getPost(pId);
        for (Request r : p.getRequest()) {
            if (r.getRequestId() == uId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void createRequest(Request r, Long pId, Long uId) throws NoResultException, RequestExistException {
        Post p = getPost(pId);
        User u = getUser(uId);

        if (u.getRequests().stream().anyMatch(x -> x.getPost().getPostId().equals(pId))) {
            throw new RequestExistException("You have already made a request for this post");
        }

        r.setStatus(RequestStatus.PENDING);
        r.setRequester(u);
        em.persist(r);

        u.getRequests().add(r);
        r.setPost(p);
        r.setRequestPrice(p.getRequestPrice());
        p.getRequest().add(r);
        em.flush();
    }

    @Override
    public void deleteRequest(Long rId, Long userId) throws NoResultException, AuthenticationException {
        Request r = getRequest(rId);
        if (!r.getRequester().getUserId().equals(userId)) {
            throw new AuthenticationException("User not authenticated to delete request");
        }
        User u = getUser(userId);
        Post p = getPost(r.getPost().getPostId());
        //r.getPost().getParty().getRequests().remove(r);
        r.setPost(null);
        r.setRequester(null);
        p.getRequest().remove(r);
        u.getRequests().remove(r);
        em.remove(r);
        em.flush(); // need to get rid of request on party side
    }

    @Override
    public void makePayment(Payment p, Long pId, Long userId) throws NoResultException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean checkPartyUser(Long partyId, Long userId) {
        try {
            Party p = getParty(partyId);
            List<User> users = p.getUsers();
            for (User u : users) {
                if (u.getUserId() == userId) {
                    return true;
                }
            }
            return false;
        } catch (NoResultException e) {
            return false;
        }
    }

    @Override
    public void createReview(Review rev, Long userId, Long partyId) throws NoResultException, ReviewExistException {
        rev.setUserId(userId);
        Party p = getParty(partyId);
        if (!checkPartyUser(partyId, userId)) {
            throw new NoResultException("You were not in this party.");
        }
        if (p.getReviews().stream().anyMatch(x -> x.getUserId().equals(userId))) {
            throw new ReviewExistException("You have already left a review");
        }
        em.persist(rev);
        p.getReviews().add(rev);
        getUser(userId).getReviews().add(rev);
        em.flush();
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
        //   party.getRequests();
        party.getUsers();
        party.getReviews();

        return party;
    }

    @Override
    public boolean checkPartyOwner(Long partyId, Long userId) {
        try {
            return getParty(partyId)
                    .getPartyOwner()
                    .getUserId()
                    .equals(userId);
        } catch (NoResultException e) {
            return false;
        }
    }

    @Override
    public Post getPost(Long postId) throws NoResultException {
        Post post = em.find(Post.class, postId);

        if (post == null) {
            throw new NoResultException("No such post");
        }

        //  post.getParty();
        post.getRequest();
        post.getPayment();

        return post;
    }

    @Override
    public boolean checkPostOwner(Long postId, Long userId) {
        try {
            return getPost(postId)
                    //.getUser()
                    .getUserId()
                    .equals(userId);
        } catch (NoResultException e) {
            return false;
        }
    }

    @Override
    public Party getPartyFromPost(Long postId) throws NoResultException {
        Query q = em.createQuery("SELECT p FROM Party p WHERE p.post.postId = :postId ");
        q.setParameter("postId", postId);
        return (Party) q.getSingleResult();

    }

    @Override
    public Request getRequest(Long rId) throws NoResultException {
        Request request = em.find(Request.class, rId);

        if (request == null) {
            throw new NoResultException("No such request");
        }
        request.getPost();
        request.getRequester();

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

    @Override
    public void hidePost(Long postId) throws NoResultException {
        Post post = getPost(postId);
        if (!post.isHidden()) {
            post.setHidden(true);
        } else {
            throw new NoResultException("Post is already hidden.");
        }
    }

    @Override
    public void unhidePost(Long postId) throws NoResultException {
        Post post = getPost(postId);
        if (post.isHidden()) {
            post.setHidden(false);
        } else {
            throw new NoResultException("Post is not hidden.");
        }
    }

    @Override
    public void hideParty(Long partyId) throws NoResultException {
        Party party = getParty(partyId);
        if (!party.isHidden()) {
            party.setHidden(true);
            try {
                party.getPost().setHidden(true);
            } catch (NullPointerException Ex) {
            }
        } else {
            throw new NoResultException("Party is already hidden.");
        }
    }

    @Override
    public void unhideParty(Long partyId) throws NoResultException {
        Party party = getParty(partyId);
        if (party.isHidden()) {
            party.setHidden(false);
        } else {
            throw new NoResultException("Party is not hidden.");
        }
    }
}
