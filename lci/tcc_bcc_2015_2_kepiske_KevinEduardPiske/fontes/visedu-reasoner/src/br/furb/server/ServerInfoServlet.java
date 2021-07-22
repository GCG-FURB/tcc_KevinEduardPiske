package br.furb.server;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

@WebServlet("/server") 
public class ServerInfoServlet extends WebSocketServlet { 

	private static final long serialVersionUID = 1L;

	@Override 
	protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
		return new ServerInfoWebSocket(); 
	} 
}