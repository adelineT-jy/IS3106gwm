/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Game;
import entity.Party;
import entity.Post;
import java.util.List;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.GameSession;
import session.GameSessionLocal;
import session.PostSessionBeanLocal;
import session.UserSessionLocal;

@Path("party")
@RequestScoped
public class PartyResource {

    @EJB
    private UserSessionLocal userSessionLocal;
    @EJB
    private PostSessionBeanLocal postSessionBeanLocal;
    @EJB
    private GameSessionLocal gameSessionBeanLocal;

    @POST
    @Path("/{uid}/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Party createParty(@PathParam("uid") Long uid, Party p) {
        postSessionBeanLocal.createParty(p, uid);
        return p;
    }

    @PUT
    @Path("/{partyId}/user/{uId}/end")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response endParty(@PathParam("uId") Long uId, @PathParam("partyId") Long pId) {
        try {
            postSessionBeanLocal.endParty(pId, uId);
            Party p = postSessionBeanLocal.getParty(pId);
            return Response.status(200).entity(p).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/{partyId}/user/{uId}/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteParty(@PathParam("partyId") Long pId, @PathParam("uId") Long uId) {
        try {
            postSessionBeanLocal.deleteParty(pId, uId);
            return Response.status(204).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @PUT
    @Path("/{partyId}/user/{uId}/acceptRequest/{rid}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response acceptRequest(@PathParam("partyId") Long pId,
            @PathParam("uId") Long uId,
            @PathParam("rid") Long rid) {
        try {
            postSessionBeanLocal.acceptToParty(rid, pId, uId);
            Party p = postSessionBeanLocal.getParty(pId);
            return Response.status(200).entity(p).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/{partyId}/user/{uId}/rejectRequest/{rid}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response rejectRequest(@PathParam("partyId") Long pId,
            @PathParam("rid") Long rid, @PathParam("partyId") Long uId) {
        try {
            postSessionBeanLocal.rejectFromParty(rid, pId, uId);
            Party p = postSessionBeanLocal.getParty(pId);
            return Response.status(200).entity(p).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/{partyId}/users/{uId}/games/{gId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Post createPost(@PathParam("partyId") Long partyid, @PathParam("uId") Long uid,
            @PathParam("gId") Long gameId, Post p) {
        postSessionBeanLocal.createPost(p, partyid, uid, gameId);
        return p;
    }

    @PUT
    @Path("/{partyId}/post/{postId}/editBy/{uId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editPost(@PathParam("partyId") Long partyid,
            @PathParam("postId") Long pId, @PathParam("uId") Long uId, Post p) {

        try {
            if (postSessionBeanLocal.getParty(partyid).getPost().getPostId().equals(pId)) {
                p.setPostId(pId);
                postSessionBeanLocal.editPost(p, uId);
                return Response.status(200).entity(p).type(MediaType.APPLICATION_JSON).build();
            } else {
                throw new Exception();
            }
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/{partyId}/post/{postId}/deleteBy/{uId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePost(@PathParam("partyId") Long partyid,
            @PathParam("postId") Long pId, @PathParam("uId") Long uId) {
        try {
            if (postSessionBeanLocal.getParty(partyid).getPost().getPostId().equals(pId)) {
                postSessionBeanLocal.deletePost(pId, uId);
                return Response.status(204).build();
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/games")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGames() {
        List<Game> games = gameSessionBeanLocal.getAllGames();
        GenericEntity<List<Game>> entity = new GenericEntity<List<Game>>(games) {
        };
        return Response.status(200).entity(entity).build();
    }

}
