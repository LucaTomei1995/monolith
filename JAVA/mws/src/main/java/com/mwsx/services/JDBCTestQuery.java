package com.mwsx.services;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;


import com.mwsx.model.SQLQuery;



public class JDBCTestQuery {	// PROVA CON MYSQL
	private static SQLQuery query;
	private static  String jdbcDriver; 
	private static String jdbcUrl;
	private static String jdbcUsername;
	private static String jdbcPassword;
	public JDBCTestQuery(SQLQuery query, String jdbcDriver, String jdbcUrl, String jdbcUsername, String jdbcPassword) {
		this.query = query;
		this.jdbcDriver = jdbcDriver;
		this.jdbcPassword = jdbcPassword;
		this.jdbcUrl = jdbcUrl;
		this.jdbcUsername = jdbcUsername;
	}
	public static SQLQuery getQuery() {
		return query;
	}
	
	public String getResults(String query) {
		String resultString = "", columns_name = "";
		try {
			Class.forName(this.jdbcDriver);
			Connection conn = DriverManager.getConnection(this.jdbcUrl /*+ dbName*/, this.jdbcUsername, this.jdbcPassword);
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnsNumber = rsmd.getColumnCount();
			boolean oneShot = false;
			while(rs.next()) {
				for(int i = 1; i <= columnsNumber; i++) {
					if(!oneShot)	columns_name += rsmd.getColumnName(i) + " | ";
					resultString += rs.getString(i) + " | ";
				}
				oneShot = true;
				resultString += "\n";
			}
			conn.close();
		}catch (Exception e) {System.err.println(e);}
		resultString = columns_name + "\n" + resultString;
		return resultString;
	}
	// object mapper
	public String getTables() {
		String jsonRes = "{\"tables\":[";
		
		try {
			
			Class.forName(this.jdbcDriver);
			Connection conn = DriverManager.getConnection(this.jdbcUrl /*+ dbName*/, this.jdbcUsername, this.jdbcPassword);
			DatabaseMetaData dbmd = conn.getMetaData();
            String[] types = {"TABLE"};
            ResultSet rs = dbmd.getTables(null, null, "%", types);
            while(rs.next()) {
            	String tableName = rs.getString("TABLE_NAME");
            	jsonRes += "{\"name\":" + " \"" +tableName.replaceAll("\\s","") +"\", \"attributes\":[";
            	Statement stmt = conn.createStatement();
                ResultSet rs2 = stmt.executeQuery("show columns from " + tableName);
                while(rs2.next()) {
                	jsonRes += "\"" +rs2.getString(1) + "\" ,";
                }
                jsonRes = jsonRes.substring(0, jsonRes.length()-1);
            	
            	jsonRes += "]},";
            }
            jsonRes = jsonRes.substring(0, jsonRes.length() - 1);

		}catch (Exception e) {System.err.println(e);}
		jsonRes += "]}";
		return jsonRes;
	}
	
}
