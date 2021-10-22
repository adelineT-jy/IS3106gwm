/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Party;
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

}
