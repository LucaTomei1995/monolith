package com.mwsx.engine;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import com.mwsx.model.Permission;
import com.mwsx.model.Role;
import com.mwsx.model.User;

public class MwsxPermissionManager {

	public static final String PERMISSIONS_FILE_NAME = "mastro.permissions";
	public static MwsxPermissionManager permissionManager;
	private String permissionFilePath;
	private Map<String, User> usersByname;
	private Map<String, Role> rolesByname;
	private Map<String, String> usersPasswords;
	
	public static MwsxPermissionManager getPermissionManager(String permissionFilePath) throws IOException {
		if (MwsxPermissionManager.permissionManager == null)
			MwsxPermissionManager.permissionManager = new MwsxPermissionManager(permissionFilePath + File.separator + MwsxPermissionManager.PERMISSIONS_FILE_NAME);
		return MwsxPermissionManager.permissionManager;
	}
	
	public static MwsxPermissionManager getPermissionManager() {
		if (MwsxPermissionManager.permissionManager == null)
			throw new RuntimeException("Permission manager is not initialized yet");
		return MwsxPermissionManager.permissionManager;
	}
	
	private MwsxPermissionManager(String permissionFilePath) throws IOException {
		Path path = Paths.get(permissionFilePath);
		this.permissionFilePath = permissionFilePath;
		if (Files.exists(path)) {			
			loadPermissions();
		}
		else {
			loadDefaultPermissions();
		}
	}
	
	private void loadDefaultPermissions() throws IOException {
		Permission adminPerm = new Permission();
		adminPerm.setAction("*");
		adminPerm.setDomain("*");
		adminPerm.setId("*");
		Role admin = new Role();
		admin.setName("ADMIN");
		List<Permission> perms = new LinkedList<Permission>();
		perms.add(adminPerm);
		admin.setPermissions(perms);
		User u1 = new User();
		u1.setName("mastro");
		User u2 = new User();
		u2.setName("santaroni");
		List<Role> r1 = new LinkedList<Role>();
		List<Role> r2 = new LinkedList<Role>();
		r1.add(admin);
		r2.add(admin);
		u1.setRoles(r1);
		u2.setRoles(r2);
		this.usersPasswords = new HashMap<String, String>();
		this.usersPasswords.put("mastro", "mastro");
		this.usersPasswords.put("santaroni", "ronconelli");
		this.usersByname = new HashMap<String, User>();
		this.usersByname.put("mastro", u1);
		this.usersByname.put("santaroni", u2);
		this.rolesByname = new HashMap<String, Role>();
		this.rolesByname.put("admin", admin);
		writePermissionsToDisk();
	}

	private void writePermissionsToDisk() throws IOException {
		List<String> lines = new LinkedList<String>();
		lines.add("# default permission file with auto-generated credentials set");
		lines.add("");
		lines.add("[users]");
		for (String name : this.usersByname.keySet()) {
			User u = this.usersByname.get(name);
			String pwd = this.usersPasswords.get(name);
			lines.add(u.toString(pwd));
		}
		lines.add("");
		lines.add("[roles]");
		for (String name : this.rolesByname.keySet()) {
			Role r = this.rolesByname.get(name);
			lines.add(r.toString());
		}
		Files.write(Paths.get(this.permissionFilePath), lines);		
	}

	public boolean isAuthenticated(User user, String pwd) {
		if (this.usersByname.containsKey(user.getName())) {
			if (this.usersPasswords.containsKey(user.getName())) {
				if (this.usersPasswords.get(user.getName()).equals(pwd))
					return true;
				else
					return false;
			}
			return false;
		}
		return false;
	}
	
	public boolean isAuthorized(User user, Role role) {
		return user.getRoles().contains(role);
	}	
	
	public User getUser(String username) {
		if (this.usersByname.containsKey(username))
			return this.usersByname.get(username);
		else
			throw new NoSuchElementException("Missing username " + username);
	}
	
	private void loadPermissions() throws IOException {
		List<String> permissions = Files.readAllLines(Paths.get(this.permissionFilePath));
		extractRoles(permissions);
		extractUsers(permissions);
	}

	private void extractUsers(List<String> usersDesc) {
		this.usersByname = new HashMap<String, User>();
		usersDesc = extractSection(usersDesc, "users");
		System.out.println("USERS: " + usersDesc);
		for (String userDesc : usersDesc) {
			User user = parseUser(userDesc);
			this.usersByname.put(user.getName(), user);
		}
	}

	private User parseUser(String userDesc) {
		int idx = userDesc.indexOf("=");
		if (idx == -1)
			throw new RuntimeException("Malformed user string " + userDesc + " (missing '=' symbol)");
		String username = userDesc.substring(0, idx).trim();
		userDesc = userDesc.substring(idx + 1).trim();
		int pwdIdx = userDesc.indexOf(",");
		if (pwdIdx == -1)
			throw new RuntimeException("Malformed user string " + userDesc + " (at least one role should be specified)");
		String password = userDesc.substring(0, pwdIdx).trim();
		if (this.usersPasswords == null)
			this.usersPasswords = new HashMap<String, String>();
		if (this.usersPasswords.containsKey(username))
			throw new RuntimeException("Duplicated user definition line " + username);
		else
			this.usersPasswords.put(username, password);
		userDesc = userDesc.substring(pwdIdx + 1).trim();
		List<Role> roles = parseUserRoles(username, userDesc);
		User user = new User();
		user.setName(username);
		user.setRoles(roles);
		return user;
	}

	private List<Role> parseUserRoles(String username, String trim) {
		List<Role> roles = new LinkedList<Role>();
		for (String role : trim.split(",")) {
			role = role.trim();
			if (this.rolesByname.containsKey(role))
				roles.add(this.rolesByname.get(role));
			else
				throw new RuntimeException("Cannot find role named " + role + " for user " + username);
		}
		return roles;
	}

	private void extractRoles(List<String> rolesDesc) throws IOException {
		this.rolesByname = new HashMap<String, Role>();
		rolesDesc = extractSection(rolesDesc, "roles");
		System.out.println("ROLES: " + rolesDesc);
		for (String roleDesc : rolesDesc) {
			Role role = parseRole(roleDesc);
			this.rolesByname.put(role.getName(), role);
		}
	}
	
	private Role parseRole(String roleDesc) {
		int idx = roleDesc.indexOf("=");
		if (idx == -1)
			throw new RuntimeException("Malformed role string " + roleDesc);
		Role r = new Role();
		String name = roleDesc.substring(0, idx).trim();
		List<Permission> perms = parsePermissions(roleDesc.substring(idx + 1).trim());
		r.setName(name);
		r.setPermissions(perms);
		return r;
	}

	private List<Permission> parsePermissions(String trim) {
		List<Permission> perms = new LinkedList<Permission>();
		for (String perm : trim.split(",")) {
			perm = perm.trim();
			Permission p = parsePermission(perm);
			perms.add(p);
		}
		return perms;
	}

	private Permission parsePermission(String perm) {
		String[] pp = perm.split(":");
		Permission p = new Permission();
		if (pp.length == 1) {
			if (pp[0].equals("*")) {
				p.setAction("*");
				p.setDomain("*");
				p.setId("*");
				return p;
			}
			else {
				throw new RuntimeException("Malformed permission string " + perm);
			}
		}
		else if (pp.length == 2) {
			if (pp[1].equals("*") && !pp[0].equals("*")) {
				p.setAction("*");
				p.setDomain(pp[0]);
				p.setId("*");
				return p;
			}
			else {
				throw new RuntimeException("Malformed permission string " + perm);
			}
		}
		else {
			p.setDomain(pp[0]);
			p.setAction(pp[1]);
			p.setId(pp[2]);
			return p;
		}
	}

	private List<String> extractSection(List<String> lines, String delim) {
		List<String> filter = new LinkedList<String>();
		boolean inSection = false;
		for (String actLine : lines) {
			if (actLine.trim().length() == 0)
				continue;
			if (actLine.trim().startsWith("#"))
				continue;
			if (actLine.trim().equals("[" + delim + "]")) {
				inSection = true;
				continue;
			}
			if (!actLine.trim().equals("[" + delim + "]") &&  (actLine.trim().startsWith("[") && actLine.trim().endsWith("]"))) {
				inSection = false;
				continue;
			}
			if (inSection) {
				filter.add(actLine.trim());
			}
		}
		return filter;
	}
	
	public static void main(String[] args) throws IOException {
		MwsxPermissionManager pm = new MwsxPermissionManager("/home/marco/mastro-home/mastro.permissions");
		for (String user : pm.usersByname.keySet()) {
			System.out.println(pm.usersByname.get(user).getName());
			for (Role role : pm.usersByname.get(user).getRoles()) {
				System.out.println(" -> " + role.getName());
				for (Permission perm : role.getPermissions()) {
					System.out.println("    -> " + perm.toString());
				}
			}
		}
		User u = pm.usersByname.get("mastro");
		System.out.println(pm.isAuthenticated(u, "dasilab"));
		System.out.println(pm.isAuthenticated(u, "dasilabss"));
		Role r = pm.rolesByname.get("ADMIN");
		Role r1 = pm.rolesByname.get("SPUTNIK");
		System.out.println(pm.isAuthorized(u, r));
		System.out.println(pm.isAuthorized(u, r1));
	}

}
