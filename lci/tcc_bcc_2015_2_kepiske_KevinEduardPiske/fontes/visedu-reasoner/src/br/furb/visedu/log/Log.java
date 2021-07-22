package br.furb.visedu.log;

import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Log {	
	
	private static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss.SSS");
	
	public static void info(String msg) {
		print(System.out, LogType.INFO, msg);		
	}
	
	public static void err(String msg) {
		print(System.err, LogType.ERROR, msg);
	}
	
	private static void print(PrintStream ps, LogType tipo, String msg) {
		if ( !Boolean.parseBoolean(System.getProperty(LogType.ALL.getSysprop(), LogType.ALL.getSysPropDefValue())) ) {
			if ( !Boolean.parseBoolean( System.getProperty(tipo.getSysprop(), tipo.getSysPropDefValue()) )) {
				return;
			}			
		}		
		ps.printf("%s [%s] %s\r\n", sdf.format(Calendar.getInstance().getTime()), tipo.getId(), msg);
	}

}
