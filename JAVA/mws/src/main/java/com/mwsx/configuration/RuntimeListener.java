package com.mwsx.configuration;

import java.io.IOException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.mwsx.engine.MwsxOntologyManager;
import com.mwsx.engine.MwsxPermissionManager;
import com.mwsx.engine.MwsxRepositoryManager;
import com.mwsx.engine.MwsxSessionManager;

@WebListener
public class RuntimeListener implements ServletContextListener {

	private static MwsxRepositoryManager repositoryManager;
	private static MwsxOntologyManager ontologyManager;
	private static MwsxSessionManager sessionManager;
	private static Thread sessionManagerThread;
	private static MwsxPermissionManager permissionManager;

	public static void init() throws IOException {
		RuntimeListener.repositoryManager = MwsxRepositoryManager.getRepositoryManager();
		RuntimeListener.sessionManager = MwsxSessionManager.getSessionManager(RuntimeListener.repositoryManager.getMastroHome());
		RuntimeListener.permissionManager = MwsxPermissionManager.getPermissionManager(RuntimeListener.repositoryManager.getMastroHome());
		RuntimeListener.ontologyManager = MwsxOntologyManager.getOntologyManager();
		RuntimeListener.sessionManagerThread = new Thread(RuntimeListener.sessionManager);
		RuntimeListener.sessionManagerThread.start();
		RuntimeListener.sessionManager.setThread(RuntimeListener.sessionManagerThread);
	}
	
	public static void exit() throws InterruptedException {
		RuntimeListener.sessionManager.exit();
	}
	
	public void contextInitialized(ServletContextEvent event) {
		System.out.println("********************* STARTING SESSION MANAGER *********************");
		new CustomApplication();
		try {
			init();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void contextDestroyed(ServletContextEvent event) {
		System.out.println("********************* CLOSING SESSION MANAGER *********************");
		RuntimeListener.sessionManager.exit();	
	}
	
	public static MwsxSessionManager getSessionManager() {
		return RuntimeListener.sessionManager;
	}
	
	public static MwsxOntologyManager getOntologyManager() {
		return RuntimeListener.ontologyManager;
	}
	
	public static MwsxPermissionManager getPermissionManager() {
		return RuntimeListener.permissionManager;
	}
	
}