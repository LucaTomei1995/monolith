package com.mwsx.engine;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.mwsx.model.User;

public class MwsxSessionManager implements Runnable {

	public static final int MAX_CONCURRENT_SESSIONS = 4;
	public static final int SESSIONS_MANAGER_DEFAULT_REFRESH_INTERVAL = 60*60000;
	public static int SESSIONS_MANAGER_CUSTOM_REFRESH_INTERVAL = -1;
	public static final String FOOTPRINT_FILE_NAME = "mastro.session";
	private static MwsxSessionManager sessionManager;
	
	public static MwsxSessionManager getSessionManager(String mastroHomeFolderPath) throws IOException {
		if (MwsxSessionManager.sessionManager == null)
			MwsxSessionManager.sessionManager = new MwsxSessionManager(mastroHomeFolderPath);
		return MwsxSessionManager.sessionManager;
	}
	
	public static MwsxSessionManager getSessionManager() {
		if (MwsxSessionManager.sessionManager == null)
			throw new RuntimeException("Session manager is not initialized");
		return MwsxSessionManager.sessionManager;
	}
	
	private MwsxSessionManager(String ffp) throws IOException {
		this.footprintFilePath = ffp + File.separator +  MwsxSessionManager.FOOTPRINT_FILE_NAME;
		checkAvavilability(ffp);
	}
	private void checkAvavilability(String ffp) throws IOException {
		footprint();
	}
	private void footprint() throws IOException {
		List<String> footprintContent = new LinkedList<String>();
		footprintContent.add("Mwsx Session Manager Status");
		footprintContent.add("Started: " + new Date(this.managerStartTime).toString());
		footprintContent.add("Updated: " + new Date(this.managerUpdateTime).toString());
		for (User user : this.sessions.keySet()) {
			if (user != null) {
				footprintContent.add("User: " + user.getName());
				MwsxSession session = this.sessions.get(user);
				if (session != null) {
					Date start = new Date(session.getSessionStart());
					Date lastUpdate = new Date(session.getSessionLastUpdate());
					String line = session.getSessionId().toString() + ", Start: " + start + ", Update: " + lastUpdate + ", OpCount: " + session.getOperationsCount();
					footprintContent.add(line);
				}
			}
		}
		Path path = Paths.get(this.footprintFilePath);
		Files.write(path, footprintContent);
	}
	
	public Map<User, MwsxSession> getSessions() {
		return sessions;
	}

	public long getManagerStartTime() {
		return managerStartTime;
	}

	public long getManagerUpdateTime() {
		return managerUpdateTime;
	}

	private String footprintFilePath;
	private transient Map<User, MwsxSession> sessions = new HashMap<User, MwsxSession>();
	private long managerStartTime;
	private long managerUpdateTime;
	private boolean exit;
	private Thread sessionManagerThread;
	
	
	public String getUserSessionId(User user) {
		if (this.sessions.containsKey(user))
			return this.sessions.get(user).getSessionId().toString();
		return null;
	}
	
	@Override
	public void run() {
		if (MwsxSessionManager.SESSIONS_MANAGER_CUSTOM_REFRESH_INTERVAL == -1)
			MwsxSessionManager.SESSIONS_MANAGER_CUSTOM_REFRESH_INTERVAL = MwsxSessionManager.SESSIONS_MANAGER_DEFAULT_REFRESH_INTERVAL;
		this.managerStartTime = System.currentTimeMillis();
		this.managerUpdateTime = this.managerStartTime;
		while(!exit) {
			try {
				checkSessions();
				Thread.sleep(MwsxSessionManager.SESSIONS_MANAGER_CUSTOM_REFRESH_INTERVAL);
				this.managerUpdateTime = System.currentTimeMillis();
			} catch (InterruptedException | IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println("Bye!");
	}

	private synchronized void checkSessions() throws IOException {
		List<MwsxSession> closeable = new LinkedList<MwsxSession>();
		for (User user : this.sessions.keySet()) {
			if (user != null) {
				MwsxSession session = this.sessions.get(user);
				if (session != null) {
					if (session.isExpired()) {
						closeable.add(session);
					}
				}
			}
		}
		for(MwsxSession s : closeable) {
			s.close();
			this.sessions.remove(s.getUser());
		}
		footprint();
	}
	
	public void exit() {
		System.out.println("Exiting now!");
		this.exit = true;
	}

	public void setThread(Thread sessionManagerThread) {
		this.sessionManagerThread = sessionManagerThread;
	}
	
	public Thread getThread() {
		return this.sessionManagerThread;
	}

	public MwsxSession createSession(User user) throws IOException {
		checkSessions();
		if (!this.sessions.containsKey(user)) {
			MwsxSession session = new MwsxSession(user);
			this.sessions.put(user, session);
			return session;
		}
		else {
			MwsxSession session = this.sessions.get(user);
			session.refresh();
			return session;
		}
	}

	public void closeSession(User user) throws IOException {
		checkSessions();		
		if (this.sessions.containsKey(user))
			this.sessions.remove(user);
	}

	public MwsxSession getSessionByID(String id) {
		for (MwsxSession session : this.getSessions().values()) {
			if (session.getSessionId().toString().equals(id))
				return session;
		}
		return null;
	}

}
