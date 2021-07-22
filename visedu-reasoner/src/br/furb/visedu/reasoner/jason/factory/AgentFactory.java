package br.furb.visedu.reasoner.jason.factory;

import br.furb.visedu.reasoner.enumeration.AgentType;
import br.furb.visedu.reasoner.jason.agent.FishAgent;
import jason.architecture.AgArch;

/**
 * Fábrica de agentes.
 * 
 * @author Kevin Eduard Piske.
 */
public class AgentFactory {

	/**
	 * Cria um agente de acordo com o tipo pedido.
	 * 
	 * @param type tipo do agente a ser criado.
	 * @param name nome do agente a ser criado.
	 * @return novo agente conforme tipo solicitado.
	 */
	public static AgArch createAgent(AgentType type, String name) {
		switch (type) {
		case SHARK:
			return new FishAgent(name, "shark.asl");
		case SARDINE:
			return new FishAgent(name, "sardine.asl");
		default:
		case UNKNOWN:
			return null;
		}
	}
	
}
