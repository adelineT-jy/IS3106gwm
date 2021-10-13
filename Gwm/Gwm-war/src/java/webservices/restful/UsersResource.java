/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Card;
import entity.Chat;
import entity.Review;
import entity.User;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.ChatSession;
import session.ChatSessionLocal;
import session.UserSessionLocal;

/**
 * REST Web Service
 *
 * @author User
 */
@Path("users")
@RequestScoped
public class UsersResource {

    @EJB
    private UserSessionLocal userSessionLocal;

    @EJB
    private ChatSessionLocal chatSessionLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        return userSessionLocal.searchUser(null);
    }

    @GET
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchCustomers(@QueryParam("name") String name) {
        if (name != null) {
            List<User> results = userSessionLocal.searchUser(name);
            GenericEntity<List<User>> entity = new GenericEntity<List<User>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("id") Long uId) {
        try {
            User u = userSessionLocal.getUserById(uId);
            return Response.status(200).entity(u).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUser(@PathParam("id") Long uId, User u) {
        u.setUserId(uId);
        try {
            userSessionLocal.updateUserProfile(u);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/{user_id}/cards")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User addCard(@PathParam("user_id") Long uId, Card c) {
        try {
            userSessionLocal.addCard(uId, c);
            User u = userSessionLocal.getUserById(uId);
            return u;
        } catch (Exception ex) {
            System.out.println("Add card error");
            return null;
        }
    }

    @POST
    @Path("/{user_id}/cards")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User deleteCard(@PathParam("user_id") Long uId, Long cId) {
        try {
            userSessionLocal.deleteCard(uId, cId);
            User u = userSessionLocal.getUserById(uId);
            return u;
        } catch (Exception ex) {
            System.out.println("Add card error");
            return null;
        }
    }

    @GET
    @Path("/{id}/following")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserFollowing(@PathParam("id") Long uId) {
        try {
            List<User> results = userSessionLocal.getUserFollowing(uId);
            GenericEntity<List<User>> entity = new GenericEntity<List<User>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/{user_id}/following/{follow_Id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User addFollowing(@PathParam("user_id") Long uId, @PathParam("follow_Id") Long followId) {
        try {
            userSessionLocal.addFollowing(uId, followId);
            User u = userSessionLocal.getUserById(uId);
            return u;
        } catch (Exception ex) {
            System.out.println("addfollowing error");
            return null;
        }
    }

    @DELETE
    @Path("/{user_id}/following/{follow_Id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User deleteFollowing(@PathParam("user_id") Long uId, @PathParam("follow_Id") Long followId) {
        try {
            userSessionLocal.deleteFollowing(uId, followId);
            User u = userSessionLocal.getUserById(uId);
            return u;
        } catch (Exception ex) {
            System.out.println("delete following error");
            return null;
        }
    }

    @GET
    @Path("/{user_id}/reviews")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getReviews(@PathParam("user_id") Long userId) {
        try {
            List<Review> results = userSessionLocal.viewReviewsGiven(userId);
            GenericEntity<List<Review>> entity = new GenericEntity<List<Review>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/{user_id}/chats")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChats(@PathParam("user_id") Long userId) {
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

    @POST
    @Path("/{user_id}/chats")
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

    @POST
    @Path("/{user_id}/chats")
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

}
