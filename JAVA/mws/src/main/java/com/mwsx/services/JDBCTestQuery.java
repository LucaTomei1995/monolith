package com.mwsx.services;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;



public class JDBCTestQuery {	// PROVA CON MYSQL
	private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";// "org.postgresql.Driver"; 
	private static final String DB_URL = "jdbc:mysql://localhost/";
	private static final String username = "root";
	private static final String password = "Fgil1995!";
	
	public String getResults(String dbName,String query) {
		String resultString = "", columns_name = "";
		try {
			Class.forName(JDBC_DRIVER);
			Connection conn = DriverManager.getConnection(DB_URL + dbName, "root", "Fgil1995!");
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
	public String getTables(String dbName) {
		String jsonRes = "{\"tables\":[";
		try {
			Class.forName(JDBC_DRIVER);
			Connection conn = DriverManager.getConnection(DB_URL + dbName, "root", "Fgil1995!");
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
