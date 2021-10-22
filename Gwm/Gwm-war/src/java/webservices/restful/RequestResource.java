/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Party;
import entity.Post;
import entity.Request;
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
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.PostSessionBeanLocal;

/**
 *
 * @author User
 */
@Path("request")
@RequestScoped
public class RequestResource {

    @EJB
    private PostSessionBeanLocal postSessionBeanLocal;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchAllRequest(@PathParam("id") Long uId) {
        if (uId != null) {
            List<Request> results = postSessionBeanLocal.searchRequestsByUser(uId);
            GenericEntity<List<Request>> entity = new GenericEntity<List<Request>>(results) {
            };
            postSessionBeanLocal.searchRequestsResetUser(uId);
            return Response.status(200).entity(entity).build();
        } else {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }

    @DELETE
    @Path("/{uid}/{rid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteRequest(@PathParam("rid") Long rid, @PathParam("uid") Long uid) {
        try {
            postSessionBeanLocal.deleteRequest(rid, uid);
            return Response.status(204).build();
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

}
