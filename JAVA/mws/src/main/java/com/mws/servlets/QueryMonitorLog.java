package com.mws.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mwsx.engine.MwsxSession;
import com.mwsx.engine.MwsxSessionManager;
import com.mwsx.model.MastroID;
import com.ruzzi.mastro.stream.queries.monitor.IOBDAQueryMonitor;
import com.ruzzi.mastro.stream.queries.monitor.QueryInfoElement;
import com.ruzzi.mastro.stream.queries.monitor.QueryLogMessage;
import it.uniroma1.dis.mastro.api.impl.MastroAPI;

/**
 * Servlet implementation class Help
 */
@WebServlet(name = "QueryMonitorLog", urlPatterns = { "/QueryMonitorLog" })
public class QueryMonitorLog extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public QueryMonitorLog() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String param = request.getQueryString();
		response.setHeader("Content-type", "text/html");
		PrintWriter out = response.getWriter();
		if (param != null && param.trim().length() > 0) {
			String[] params = param.split("&");
			doGetSession(params, out);
			return;
		}
		else {
			out.println("<p>Missing mastro instance ID in query string</p>");
			return;
		}
	}

	private void doGetSession(String params[], PrintWriter out) {
		MwsxSession session = MwsxSessionManager.getSessionManager().getSessionByID(params[0]);
		if (session == null) {
			out.println("<b>NO SESSION FOUND WITH ID " + params[0] + "</b>");
			out.println("<a href='./Sessions'>Go to session main page</a>");
			return;
		}
		if (session.getMastroIDs().size() > 0) {
			for (MastroID mid : session.getMastroIDs()) {
				out.println("<h1>" + mid.toString() + "</h1>");
				out.println("<h2>Query Answers</h2>");
				out.println("<table border='1' cellpadding='2'>");
				MastroAPI mastro = session.getMastroInstance(mid);
				IOBDAQueryMonitor monitor = mastro.getOBDAQueryMonitor();
				int size = monitor.getQueryLogCount(Integer.parseInt(params[1]));
				int count = 0;
				for (QueryInfoElement qti : monitor.getQueryThreadInfo(Integer.parseInt(params[1]), 4)) {
					out.println("<tr><td>" +  ++count + "</td><td colspan='2'>" + qti.getMessage() + "</td><7tr>");
				}
				out.println("</table>");
				out.println("<h2>Query log</h2>");
				out.println("<table border='1' cellpadding='2'>");
				for (int i=0; i < size; i++) {
					List<QueryLogMessage> m = monitor.getQueryLog(Integer.parseInt(params[1]), i, 1);
					if (m.size() == 0)
						continue;
					out.println("<tr>");
					out.println("<td>" + m.get(0).getTs().getTime() + "</td>");
					out.println("<td>" + m.get(0).getMessage() + "</td>");
					out.println("<td>" + m.get(0).getMoreText() + "</td>");
					out.println("</tr>");
				}
				out.println("</table>");
			}
		}
		out.println("<p>Time to live: " + new Date(session.getTTL()).toString() + "</p></html>");
	}

	private String linkSession(String name) {
		return "<a href='?" + name + "'>" + name + "</a>";
	}
	
	private String linkUser(String name) {
		return name;
	}
	
	private String linkMastro(String name, String version, String id) {
		return name;
	}

	private String l(String innerReturnType) {
		if (!innerReturnType.startsWith("com.mws."))
			return innerReturnType;
		String ret = "<a href='[L]'>[V]</a>";
		ret = ret.replace("[L]", "./HelpType?" + innerReturnType);
		ret = ret.replace("[V]", innerReturnType);
		return ret;
	}

}
