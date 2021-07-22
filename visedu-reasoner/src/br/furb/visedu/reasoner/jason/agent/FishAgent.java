package br.furb.visedu.reasoner.jason.agent;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import br.furb.visedu.log.Log;
import br.furb.visedu.reasoner.jason.manager.MessageManager;
import jason.JasonException;
import jason.architecture.AgArch;
import jason.asSemantics.ActionExec;
import jason.asSemantics.Agent;
import jason.asSemantics.Message;
import jason.asSemantics.TransitionSystem;
import jason.asSyntax.Literal;

public class FishAgent extends AgArch {

	private String name;
	private String aslFilePath;
	private List<Literal> perceptions = new ArrayList<Literal>();

	public FishAgent(String name, String aslFile) {
		try {
			setName(name);
			setAslFilePath(getClass().getClassLoader().getResource(aslFile).toURI().toString());
		} catch (URISyntaxException e) {
			e.printStackTrace();
			showError("Error loading agent mind");
		}
	}

	public void configureAgent() {
		try {
			Agent jasonAgent = new Agent();
			new TransitionSystem(jasonAgent, null, null, this);
			jasonAgent.initAg(getAslFilePath());
			showInfo(String.format("Agent \"%s\" using static mind @ %s", getAgName(), getAslFilePath()));
		} catch (JasonException e) {
			e.printStackTrace();
			showError("Error initializing agent");
		}
	}

	public void run() {
		showInfo("Reasoning cycle...");
		getTS().reasoningCycle();
	}

	@Override
	public String getAgName() {
		return name;
	}

	@Override
	public List<Literal> perceive() {
		return perceptions;
	}

	@Override
	public void act(ActionExec action, List<ActionExec> feedback) {
		showInfo("Agent " + getAgName() + ": doing: " + action.getActionTerm());
		MessageManager.getInstance().sendMessage( action.getActionTerm().toString() );
		action.setResult(true);
		feedback.add(action);
	}

	@Override
	public boolean canSleep() {
		return true;
	}

	@Override
	public boolean isRunning() {
		return true;
	}

	@Override
	public void sleep() {
		sleep(1000);
	}

	private void sleep(final long millis) { 
		try { 
			Thread.sleep(millis);
		} catch (Exception e) { 
			e.printStackTrace();
		} 
	}

	@Override
	public void sendMsg(Message message) throws Exception {	
		// Não utilizado
	}

	@Override
	public void broadcast(Message message) throws Exception {
		// Não utilizado
	}

	@Override
	public void checkMail() {
		// Não utilizado
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPerceptions(List<Literal> perceptions) {
		this.perceptions = perceptions;
	}

	public void setAslFilePath(String aslFilePath) {
		this.aslFilePath = aslFilePath;
	}

	public String getAslFilePath() {
		return aslFilePath;
	}

	public List<Literal> getPerceptions() {
		return perceptions;
	}

	private void showInfo(String info) {
		Log.info(info);		
	}

	private void showError(String error) {
		Log.err(error);
	}

}