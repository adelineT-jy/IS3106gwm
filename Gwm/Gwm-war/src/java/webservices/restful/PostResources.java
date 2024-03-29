/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Post;
import entity.Request;
import error.NoResultException;
import error.RequestExistException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
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

/**
 *
 * @author User
 */
@Path("posts")
@RequestScoped
public class PostResources {

    @EJB
    private UserSessionLocal userSessionLocal;
    @EJB
    private PostSessionBeanLocal postSessionBeanLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Post> getAllPost() {
        //System.out.println(postSessionBeanLocal.searchPosts(null));
        return postSessionBeanLocal.searchPosts(null);
    }

    @GET
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchPosts(@QueryParam("query") String search) {
        if (search != null) {
            List<Post> results = postSessionBeanLocal.searchPosts(search);
            GenericEntity<List<Post>> entity = new GenericEntity<List<Post>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }
    
    @GET
    @Path("/searchPost")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchPostsByUsername(@QueryParam("username") String username) {
        if (username != null) {
            List<Post> results = postSessionBeanLocal.searchPostsByUsername(username);
            GenericEntity<List<Post>> entity = new GenericEntity<List<Post>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else {
            JsonObject exception = Json.createObjectBuilder().add("error", "No query conditions").build();
            return Response.status(400).entity(exception).build();
        }
    }
//
//    @PUT
//    @Path("/{postId}/by/{uId}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response editPost(@PathParam("postId") Long pId, @PathParam("uId") Long uId, Post p) {
//        try {
//            postSessionBeanLocal.editPost(p, uId);
//            return Response.status(200).entity(p).type(MediaType.APPLICATION_JSON).build();
//        } catch (Exception ex) {
//            JsonObject exception = Json.createObjectBuilder().add("error", "Not found").build();
//            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
//        }
//    }

    @DELETE
    @Path("/{postId}/by/{uId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePost(@PathParam("postId") Long pId, @PathParam("uId") Long uId) {
        try {
            postSessionBeanLocal.deletePost(pId, uId);
            return Response.status(204).build();
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/{postId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPost(@PathParam("postId") Long pId) {
        try {
            Post p = postSessionBeanLocal.getPost(pId);
            return Response.status(200).entity(p)
                    .type(MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/{postId}/request/{uid}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createRequest(@PathParam("uid") Long uid, @PathParam("postId") Long pId, Request r) {
        try {
            postSessionBeanLocal.createRequest(r, pId, uid);
            return Response.status(201).build();
        } catch (RequestExistException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404, ex.getMessage()).entity(exception).type(MediaType.APPLICATION_JSON).build();
        } catch (NoResultException ex2) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex2.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/hide/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response hidePost(@PathParam("postId") Long postId) {
        try {
            postSessionBeanLocal.hidePost(postId);
            return Response.status(204).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/unhide/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response unhidePost(@PathParam("postId") Long postId) {
        try {
            postSessionBeanLocal.unhidePost(postId);
            return Response.status(204).build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
}
