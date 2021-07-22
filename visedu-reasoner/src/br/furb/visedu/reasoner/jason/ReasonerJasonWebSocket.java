package br.furb.visedu.reasoner.jason;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

import br.furb.visedu.log.Log;
import br.furb.visedu.reasoner.jason.manager.MessageManager;

@SuppressWarnings("deprecation")
public class ReasonerJasonWebSocket extends MessageInbound {
	
	@Override	
	protected void onOpen(WsOutbound outbound) {
		Log.info("onOpen: websocket is open");
		MessageManager.getInstance().setWebSocket(this);
	}

	@Override
	protected void onBinaryMessage(ByteBuffer bb) throws IOException {
		throw new IOException("Method is not implemented!");
	}
	
	@Override
	protected void onTextMessage(CharBuffer message) throws IOException {
		Log.info("onTextMessage: " + message);
		MessageManager.getInstance().manage(message.toString());
	}
	
	public void sendMessage(String message) {
		Log.info("sendMessage: " + message);
		
		try {
			getWsOutbound().writeTextMessage(CharBuffer.wrap(message));
		} catch (IOException e) {
			e.printStackTrace();			
		}
	}	
	
}