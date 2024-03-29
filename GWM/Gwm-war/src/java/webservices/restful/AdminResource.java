package webservices.restful;

import entity.Admin;
import entity.Game;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonObject;
import error.NoResultException;
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

    @GET
    @Path("/login/{email}/{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@PathParam("email") String email,
            @PathParam("password") String password) {
        try {
            Admin admin = adminSessionLocal.loginAdmin(email, password);
            return Response.status(200).entity(admin).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404, ex.getMessage()).entity(exception).type(MediaType.APPLICATION_JSON).build();
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
    public Response createGame(Game game) {
        try {
            adminSessionLocal.createGame(game);
            return Response.status(200).entity(game).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404, ex.getMessage()).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
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
            try {
                List<Game> results = adminSessionLocal.searchGame(name);
                GenericEntity<List<Game>> entity = new GenericEntity<List<Game>>(results) {
                };
                return Response.status(200).entity(entity).build();
            } catch (NoResultException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "Users cannot be found").build();
                return Response.status(400).entity(exception).build();
            }
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }

    @GET
    @Path("/game")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGames() {
        try {
            List<Game> results = adminSessionLocal.searchGame(null);
            GenericEntity<List<Game>> entity = new GenericEntity<List<Game>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Users cannot be found").build();
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
            return Response.status(404, ex.getMessage()).entity(exception).type(MediaType.APPLICATION_JSON).build();
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
