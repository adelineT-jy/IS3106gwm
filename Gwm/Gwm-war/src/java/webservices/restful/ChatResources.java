/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Chat;
import entity.ChatMessage;
import entity.User;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.ChatSessionLocal;
import session.UserSessionLocal;

/**
 *
 * @author User
 */
@Path("chats")
@RequestScoped
public class ChatResources {

    @EJB
    private ChatSessionLocal chatSessionLocal;

    @EJB
    private UserSessionLocal userSessionLocal;

    @GET
    @Path("/{user_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChatList(@PathParam("user_id") Long userId) {
        try {
            List<Chat> results = chatSessionLocal.getAllChats(userId);
            GenericEntity<List<Chat>> entity = new GenericEntity<List<Chat>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/{user_id}/other/{chat_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIndividualUser(@PathParam("user_id") Long uId, @PathParam("chat_id") Long cId) {
        try {
            User u = chatSessionLocal.getUserIndividual(cId, uId);
            System.out.println(u.getUsername());
            return Response.status(200).entity(u).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/{user_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createNewChat(@PathParam("user_id") Long uId, Chat chat) {
        try {
            chatSessionLocal.addChat(chat, uId);
            User u = userSessionLocal.getUserById(uId);
            return u;
        } catch (Exception ex) {
            System.out.println("creatNewChat error");
            return null;
        }
    }

    @GET
    @Path("/message/{chat_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChatMessage(@PathParam("chat_id") Long chatId) {
        try {
            List<ChatMessage> results = chatSessionLocal.getAllMessage(chatId);
            GenericEntity<List<ChatMessage>> entity = new GenericEntity<List<ChatMessage>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/{chat_id}/user/{user_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewChatMsg(@PathParam("user_id") Long uId,
            @PathParam("chat_id") Long cId, ChatMessage cm) {
        try {
            chatSessionLocal.addMessage(cm, uId, cId);
            Chat c = chatSessionLocal.getChat(cId);
            return Response.status(200).entity(c).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

}
