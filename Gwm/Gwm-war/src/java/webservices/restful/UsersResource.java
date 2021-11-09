/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Card;
import entity.Chat;
import entity.ChatMessage;
import entity.Party;
import entity.Review;
import entity.User;
import error.NoResultException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
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
import session.PostSessionBeanLocal;
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
    private PostSessionBeanLocal postSessionBeanLocal;

    @EJB
    private ChatSessionLocal chatSessionLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        try {
            return userSessionLocal.searchUser(null);
        } catch (NoResultException ex) {
            Logger.getLogger(UsersResource.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    @GET
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchUsers(@QueryParam("name") String name) {
        if (name != null) {
            try {
                List<User> results = userSessionLocal.searchUser(name);
                GenericEntity<List<User>> entity = new GenericEntity<List<User>>(results) {
                };
                return Response.status(200).entity(entity).build();
            } catch (NoResultException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "No Users found").build();
                return Response.status(400).entity(exception).build();
            }
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createUser(User u) {
        try {
            userSessionLocal.createUser(u);
            return u;
        } catch (Exception ex) {
            return null;
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
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Path("/login/{username}/{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@PathParam("username") String username, 
            @PathParam("password") String password) {
        try {
            System.out.println("REST: login");
            User u = userSessionLocal.doLogin(username, password);
            return Response.status(200).entity(u).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
        
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUser(@PathParam("id") Long uId, User u) {
        System.out.println("edituser");
        u.setUserId(uId);
        try {
            userSessionLocal.updateUserProfile(u);
            return Response.status(200).entity(u).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            System.out.println("editUser failed");
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found ha").build();
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

    @DELETE
    @Path("/{user_id}/cards/{cId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User deleteCard(@PathParam("user_id") Long uId, @PathParam("cId") Long cId) {
        try {
            userSessionLocal.deleteCard(uId, cId);
            return userSessionLocal.getUserById(uId);
        } catch (Exception ex) {
            System.out.println("Add card error");
            return null;
        }
    }
    
    @GET
    @Path("{id}/followers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserFollowers(@PathParam("id") Long uId) {
        try {
            List<User> results = userSessionLocal.getUserFollowers(uId);
            GenericEntity<List<User>> entity = new GenericEntity<List<User>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
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
            List<Review> results = userSessionLocal.viewMyReviews(userId);
            GenericEntity<List<Review>> entity = new GenericEntity<List<Review>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/{uId}/party")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchParty(@PathParam("uId") Long uId) {
        if (uId != null) {
            try {
                List<Party> results = postSessionBeanLocal.searchPartiesByUser(uId);
                GenericEntity<List<Party>> entity = new GenericEntity<List<Party>>(results) {
                };
                return Response.status(200).entity(entity).build();
            } catch (NoResultException ex) {
                Logger.getLogger(UsersResource.class.getName()).log(Level.SEVERE, null, ex);
                JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
                return Response.status(400).entity(exception).build();
            }
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }
}
