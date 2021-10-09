/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Chat;
import entity.ChatMessage;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author User
 */
@Local
public interface ChatSessionLocal {

    public List<Chat> getAllChats(Long userId);

    public List<ChatMessage> getMessage(Long chatId);

    public void addChat(Chat chat);

    public void addMessage(ChatMessage message);
}
