/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Chat;
import entity.ChatMessage;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
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
        Query q;
        q = em.createQuery("SELECT c FROM Chat,IN c.user u "
                + "WHERE u.userId = :userId AND u.isAvailable =:isAvailable");
        q.setParameter("userId", userId);
        q.setParameter("isAvailable", Boolean.TRUE);
        return q.getResultList();
    }

    @Override
    public List<ChatMessage> getMessage(Long chatId) {
        Query q;
        q = em.createQuery("SELECT c FROM Chat c WHERE c.chatId = :chatId");
        q.setParameter("chatId", chatId);
        return q.getResultList();
    }

    @Override
    public void addChat(Chat chat) {
        if (chat != null) {
            em.persist(chat);
        }
    }

    @Override
    public void addMessage(ChatMessage message) {
        if (message != null) {
            em.persist(message);
        }
    }
}
