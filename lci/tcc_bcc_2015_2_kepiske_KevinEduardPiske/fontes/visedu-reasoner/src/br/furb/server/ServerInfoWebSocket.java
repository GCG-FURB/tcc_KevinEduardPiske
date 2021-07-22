package br.furb.server;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

import br.furb.visedu.log.Log;

@SuppressWarnings("deprecation")
public class ServerInfoWebSocket extends MessageInbound {
	
	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	
	@Override
	protected void onOpen(WsOutbound outbound) {
	}

	@Override
	protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
	}
	
	@Override
	protected void onTextMessage(CharBuffer msg) throws IOException {
		String cmd = msg.toString();
		if ("time".equalsIgnoreCase(cmd.trim())) {
			sendMessage( sdf.format( Calendar.getInstance().getTime() ) );
		}
	}
	
	public void sendMessage(String message) {
		Log.info("sendMessage: " + message);
		try {
			getWsOutbound().writeTextMessage( CharBuffer.wrap(message) );
		} catch (IOException e) {
			e.printStackTrace();			
		}
	}	

}
