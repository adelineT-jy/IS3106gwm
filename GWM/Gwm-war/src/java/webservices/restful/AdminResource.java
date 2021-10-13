package webservices.restful;

import entity.Admin;
import entity.Game;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.AdminSessionLocal;

@Path("admin")
@RequestScoped
public class AdminResource {

    @EJB
    private AdminSessionLocal adminSessionLocal;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Admin createAdmin(Admin admin) {
        adminSessionLocal.createAdmin(admin);
        return admin;
    }
    
    @GET
    @Path("/{adminId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetAdmin(@PathParam("adminId") Long adminId) {
        try {
            Admin admin = adminSessionLocal.getAdmin(adminId);
            return Response.status(200).entity(admin).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
 
    @PUT
    @Path("/{adminId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editAdmin(@PathParam("adminId") Long adminId, Admin admin) {
        admin.setUserId(adminId);
        try {
            adminSessionLocal.updateAdmin(admin);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @DELETE
    @Path("/{adminId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCustomer(@PathParam("adminId") Long adminId) {
        try {
            adminSessionLocal.deleteAdmin(adminId);
            return Response.status(204).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @PUT
    @Path("/ban/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response banUser(@PathParam("userId") Long userId) {
        try {
            adminSessionLocal.banUser(userId);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("/unban/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response unbanUser(@PathParam("userId") Long userId) {
        try {
            adminSessionLocal.unbanUser(userId);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @POST
    @Path("/game")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Game createGame(Game game) {
        adminSessionLocal.createGame(game);
        return game;
    }
    
    @GET
    @Path("/game/{gameId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetGame(@PathParam("gameId") Long gameId) {
        try {
            Game game = adminSessionLocal.getGame(gameId);
            return Response.status(200).entity(game).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
 
    @PUT
    @Path("/game/{gameId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editGame(@PathParam("gameId") Long gameId, Game game) {
        game.setGameId(gameId);
        try {
            adminSessionLocal.updateGame(game);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
}
