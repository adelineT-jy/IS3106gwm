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
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author User
 */
@Local
public interface ChatSessionLocal {

    public List<Chat> getAllChats(Long userId);

    public List<ChatMessage> getAllMessage(Long chatId);

    public void addGroupChat(Chat chat, Long pid);

    public void addChat(Chat chat, Long uid);

    public void addUserToChat(Long cid, List<User> uids);

    public void addUserToGroupChat(Long cid, List<User> uids);

    public void addMessage(ChatMessage message, Long uid, Long cid);

    public User getUserIndividual(Long chat_Id, Long user_id) throws Exception;

    //helper method
    public Chat getChat(Long cid);

    public ChatMessage getChatMessage(Long cmId);

    public Party getParty(Long partyId) throws NoResultException;

    public User getUser(Long userId) throws NoResultException;

}
