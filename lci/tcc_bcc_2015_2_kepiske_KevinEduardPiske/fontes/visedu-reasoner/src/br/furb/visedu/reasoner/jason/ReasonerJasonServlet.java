package br.furb.visedu.reasoner.jason;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

@SuppressWarnings("deprecation")
@WebServlet("/jason")
public class ReasonerJasonServlet extends WebSocketServlet {

	private static final long serialVersionUID = 1L;
	
	protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
		return new ReasonerJasonWebSocket();
	}

}