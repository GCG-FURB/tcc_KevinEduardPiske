package br.furb.visedu.reasoner.jason.manager;

import org.json.JSONObject;

import br.furb.visedu.reasoner.enumeration.ActionType;
import br.furb.visedu.reasoner.jason.ReasonerJasonWebSocket;

/**
 * Gerenciador de mensagens.
 * 
 * @author Kevin Eduard Piske
 */
public class MessageManager {

	private static MessageManager instance;
	private static final String HAND_SHAKE = "HAND_SHAKE";
	private JSONObject jsonObject;
	private ReasonerJasonWebSocket websocket;

	private MessageManager() {
		// Padrão Singleton
	}

	/**
	 * Obtém a instância única dessa classe.
	 * 
	 * @return instância única dessa classe.
	 */
	public static MessageManager getInstance() {
		if(instance == null) {
			instance = new MessageManager();
		}
		return instance;
	}

	/**
	 * Gerencia a mensagem passada por parâmetro.
	 * 
	 * @param message mensagem a ser gerenciada.
	 */
	public void manage(String message) {
		if (HAND_SHAKE.equalsIgnoreCase(message)) {
			sendMessage(HAND_SHAKE);
			return;
		}

		jsonObject = new JSONObject(message);
		String actionTypeDescription = jsonObject.getString("action");
		ActionType actionType = ActionType.getActionTypeByDescription(actionTypeDescription);
		ActionManager.getInstance().manage(actionType, jsonObject);
	}

	public void sendMessage(String message) {
		if (!HAND_SHAKE.equalsIgnoreCase(message)) {
			jsonObject = new JSONObject();
			jsonObject.put("action", message);
			message = jsonObject.toString();
		}

		websocket.sendMessage(message);
	}

	public ReasonerJasonWebSocket getWebSocket() {
		return websocket;
	}

	public void setWebSocket(ReasonerJasonWebSocket websocket) {
		this.websocket = websocket;
	}

}