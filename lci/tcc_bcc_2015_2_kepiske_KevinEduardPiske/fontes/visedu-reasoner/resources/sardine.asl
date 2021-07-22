/* Agent Sardine */

/* Initial beliefs and rules */
/* Crenças e regras iniciais */

predator("Tubarão").

/* Initial goals */
/* Objetivos iniciais */
+!explore.

/* Initial plans */
/* Planos iniciais */

+onPercept(Perceiver, Perceived, PerceivedType) : predator(PerceivedType)
	<- flee(Perceiver, Perceived).
	
+onPercept(Perceiver, Perceived, PerceivedType) : not predator(PerceivedType)
	<- explore(Perceiver).
	
+onCollide(Perceiver, Perceived, PerceivedType)
	<- explore(Perceiver).