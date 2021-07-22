package br.furb.visedu.reasoner.jason.manager;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import br.furb.visedu.reasoner.enumeration.ActionType;
import br.furb.visedu.reasoner.enumeration.AgentType;
import br.furb.visedu.reasoner.jason.agent.FishAgent;
import br.furb.visedu.reasoner.jason.factory.AgentFactory;
import jason.architecture.AgArch;
import jason.asSyntax.Literal;

public class ActionManager {

	private static ActionManager instance;
	
	private ActionManager() {
		// Padrão Singleton
	}
	
	/**
	 * Obtém a instância única dessa classe.
	 * 
	 * @return instância única dessa classe.
	 */
	public static ActionManager getInstance() {
		if(instance == null) {
			instance = new ActionManager();
		}
		return instance;
	}
	
	public void manage(ActionType actionType, JSONObject jsonObject) {
		switch (actionType) {
		case CREATE_AGENT:
			String agentTypeDescription = jsonObject.getString("agentType");
			AgentType agentType = AgentType.getAgentTypeByDescription(agentTypeDescription);
			String agentName = jsonObject.getString("name");
			AgArch newAgent = AgentFactory.createAgent(agentType, agentName);
			AgentManager.getInstance().addAgent(newAgent);
			break;
		case PERCEPTION:
			agentName = jsonObject.getString("name");
			JSONArray perceptionsArray = jsonObject.getJSONArray("perceptions");
			FishAgent agent = (FishAgent) AgentManager.getInstance().getAgent(agentName);
			List<Literal> perceptions = convertPerceptions(perceptionsArray);
			agent.configureAgent();
			agent.setPerceptions(perceptions);
			agent.run();
			break;
		default:
		case UNKNOWN:
			break;
		}
	}
	
	private List<Literal> convertPerceptions(JSONArray perceptionsArray) {
		List<Literal> perceptions = new ArrayList<Literal>();
		for (int i = 0; i < perceptionsArray.length(); i++) {
			perceptions.add( Literal.parseLiteral( perceptionsArray.getString(i) ) );
		}
		
		return perceptions;
	}
	
}
