/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Party;
import entity.Post;
import entity.User;
import entity.Request;
import entity.Review;
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
import session.PostSessionBeanLocal;
import session.UserSessionLocal;

@Path("party")
@RequestScoped
public class PartyResource {

    @EJB
    private UserSessionLocal userSessionLocal;

    @EJB
    private PostSessionBeanLocal postSessionBeanLocal;

    @PUT
    @Path("/{partyId}/joinParty")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response joinParty(@PathParam("partyId") Long pId, Long uId) {
        try {
            postSessionBeanLocal.joinParty(pId, uId);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/{partyId}/endParty")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response endParty(@PathParam("partyId") Long pId, Long uId) {
        try {
            postSessionBeanLocal.endParty(pId, uId);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/{partyId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Party deleteParty(@PathParam("partyId") Long pId, Long uId) {
        try {
            postSessionBeanLocal.deleteParty(pId, uId);
            Party p = postSessionBeanLocal.getParty(pId);
            return p;
        } catch (Exception ex) {
            System.out.println("delete party error");
            return null;
        }
    }

    @POST
    @Path("/{partyId}/requestby/{uId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Party createRequest(@PathParam("partyId") Long pid,
            @PathParam("uId") Long uid, Request r) {
        postSessionBeanLocal.createRequest(r, pid, uid);
        return postSessionBeanLocal.getParty(pid);
    }

    @PUT
    @Path("/{partyId}/request/{rid}/accept")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response acceptParty(@PathParam("partyId") Long pId,
            @PathParam("rid") Long rid, Long uId) {
        try {
            postSessionBeanLocal.acceptToParty(rid, pId, uId);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/{partyId}/request/{rid}/reject")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response rejectParty(@PathParam("partyId") Long pId,
            @PathParam("rid") Long rid, Long uId) {
        try {
            postSessionBeanLocal.rejectFromParty(rid, pId, uId);
            return Response.status(404).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchParty(@PathParam("id") Long pId) {
        if (pId != null) {
            List<Party> results = postSessionBeanLocal.searchPartiesByUser(pId);
            GenericEntity<List<Party>> entity = new GenericEntity<List<Party>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }

}
