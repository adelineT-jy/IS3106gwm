/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Chat;
import entity.ChatMessage;
import entity.Party;
import entity.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author User
 */
@Stateless
public class ChatSession implements ChatSessionLocal {

    @PersistenceContext(unitName = "Gwm-ejbPU")
    private EntityManager em;

    @Override
    public List<Chat> getAllChats(Long userId) {
        User u = getUser(userId);
        return u.getChats();
    }

    @Override
    public List<ChatMessage> getAllMessage(Long chatId) {
        Query q;
        q = em.createQuery("SELECT c FROM Chat c WHERE c.chatId = :chatId");
        q.setParameter("chatId", chatId);
        return q.getResultList();
    }

    @Override
    public void addChat(Chat chat, Long uid) {
        if (chat != null) {
            chat.setParty(Boolean.FALSE);
            em.persist(chat);

            User u = getUser(uid);
            u.getChats().add(chat);
        }
    }

    @Override
    public void addGroupChat(Chat chat, Long uid) {

        if (chat != null) {
            chat.setParty(Boolean.TRUE);
            em.persist(chat);

            Party p = getParty(uid);
            p.setChat(chat);
            User u = getUser(uid);
            u.getChats().add(chat);
        }

    }

    @Override
    public void addUserToChat(Long cid, List<User> uids) {
        Chat c = getChat(cid);
        if (c.getUsers().size() < 2) {
            c.setUsers(uids);
        }
    }

    @Override
    public void addUserToGroupChat(Long cid, List<User> uids) {
        Chat c = getChat(cid);
        c.setUsers(uids);
    }

    @Override
    public void addMessage(ChatMessage message, Long cid) {
        if (message != null) {
            em.persist(message);
        }

        Chat c = getChat(cid);
        c.setChatMessage(message);
    }

    //helper method
    @Override
    public Chat getChat(Long cid) {
        Chat c = em.find(Chat.class, cid);

        if (c == null) {
            throw new NoResultException("No chat record");
        }

        return c;
    }

    @Override
    public ChatMessage getChatMessage(Long cmId) {
        ChatMessage cm = em.find(ChatMessage.class, cmId);

        if (cm == null) {
            throw new NoResultException("No chat message");
        }
        return cm;
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
    public User getUser(Long userId) throws NoResultException {
        User user = em.find(User.class, userId);

        if (user == null) {
            throw new NoResultException("User");
        }

        return user;
    }

}
