package br.furb.visedu.reasoner.jason.manager;

import java.util.HashMap;
import java.util.Map;

import jason.architecture.AgArch;

/**
 * Gerenciador de agentes.
 * 
 * @author Kevin Eduard Piske.
 */
public class AgentManager {

	private Map<String, AgArch> agentsMap;
	private static AgentManager instance;
	
	// Padrão Singleton
	private AgentManager() {
		agentsMap = new HashMap<String, AgArch>();
	}
	
	/**
	 * Obtém a instância única dessa classe.
	 * 
	 * @return instância única dessa classe.
	 */
	public static AgentManager getInstance() {
		if(instance == null) {
			instance = new AgentManager();
		}
		return instance;
	}
	
	/**
	 * Adiciona um agente ao gerenciador.
	 * 
	 * @param agent agente a ser adicionado ao gerenciador.
	 */
	public void addAgent(AgArch agent) {
		if(agent != null) {
			agentsMap.put(agent.getAgName(), agent);
		}
	}
	
	/**
	 * Obtém o agente correspondente ao nome passado por parâmetro.
	 * 
	 * @param agentName nome do agente a ser obtido.
	 * @return agente correspondente ao nome.
	 */
	public AgArch getAgent(String agentName) {
		return agentsMap.get(agentName);
	}
	
	/**
	 * Remove um agente do gerenciador.
	 * 
	 * @param agentName nome do agente a ser removido.
	 * @return agente removido.
	 */
	public AgArch removeAgent(String agentName) {
		return agentsMap.remove(agentName);
	}
	
}
