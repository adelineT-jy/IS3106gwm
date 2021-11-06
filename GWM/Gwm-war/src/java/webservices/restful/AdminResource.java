package webservices.restful;

import entity.Admin;
import entity.Game;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.NoResultException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
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
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
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
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/{adminId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAdmin(@PathParam("adminId") Long adminId) {
        try {
            adminSessionLocal.deleteAdmin(adminId);
            return Response.status(204).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
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
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
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
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
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
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/game/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchUsers(@QueryParam("name") String name) {
        if (name != null) {
            List<Game> results = adminSessionLocal.searchGame(name);
            GenericEntity<List<Game>> entity = new GenericEntity<List<Game>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
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
            return Response.status(200).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("/hideGame/{gameId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response hideGame(@PathParam("gameId") Long gameId) {
        try {
            adminSessionLocal.hideGame(gameId);
            return Response.status(204).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("/unhideGame/{gameId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response unhideGame(@PathParam("gameId") Long gameId) {
        try {
            adminSessionLocal.unhideGame(gameId);
            return Response.status(204).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
}
