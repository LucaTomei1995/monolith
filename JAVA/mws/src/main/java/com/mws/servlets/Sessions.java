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
import com.mwsx.model.User;
import com.ruzzi.mastro.stream.queries.monitor.IOBDAQueryMonitor;
import com.ruzzi.mastro.stream.queries.monitor.QueryRecord;
import com.ruzzi.mastro.stream.queries.monitor.QueryRecordDetail;

import it.uniroma1.dis.mastro.api.impl.MastroAPI;

/**
 * Servlet implementation class Help
 */
@WebServlet(name = "Sessions", urlPatterns = { "/Sessions" })
public class Sessions extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Sessions() {
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
			doGetSession(param, out);
			return;
		}
		Date start = new Date(MwsxSessionManager.getSessionManager().getManagerStartTime());
		Date update = new Date(MwsxSessionManager.getSessionManager().getManagerUpdateTime());
		out.println("<html><p>Start date:  " + start + "</p>");
		out.println("<p>last update: " + update + "</p>");
		out.println("<table border='1' cellpadding='2'>");
		for (User user : MwsxSessionManager.getSessionManager().getSessions().keySet()) {
			out.println("<tr>");
			MwsxSession s = MwsxSessionManager.getSessionManager().getSessions().get(user);
			out.println("<td>" + linkSession(s.getSessionId().toString()) + "</td>");
			out.println("<td>" + user.getName() + "</td>");
			out.println("<td>" + new Date(s.getSessionStart()) + "</td>");
			out.println("<td>" + new Date(s.getSessionLastUpdate()) + "</td>");
			out.println("<td>" + s.getOperationsCount() + "</td>");
			out.println("<td>" + s.getTTL() + "</td>");
			out.println("</tr>");
		}
		out.println("</table></html>");
	}

	private void doGetSession(String param, PrintWriter out) {
		MwsxSession session = MwsxSessionManager.getSessionManager().getSessionByID(param);
		if (session == null) {
			out.println("<b>NO SESSION FOUND WITH ID " + param + "</b>");
			out.println("<a href='./Sessions'>Go to session main page</a>");
			return;
		}
		out.println("<html><h2>Session " + session.getSessionId() + "</h2>");
		out.println("<p>User: " + linkUser(session.getUser().getName()));
		out.println("<p>Start: " + new Date(session.getSessionStart()).toString() + "</p>");
		out.println("<p>Last update: " + new Date(session.getSessionLastUpdate()).toString() + "</p>");
		out.println("<p>Number of operations: " + session.getOperationsCount() + "</p>");
		if (session.getMastroIDs().size() > 0) {
			out.println("<p>Mastro instances: " + session.getMastroIDs().size() + "</p>");
			out.println("<ul>");
			int count = 0;
			for (MastroID mid : session.getMastroIDs()) {
				out.println("<li>Instance " + (++count));
				out.println("<br/>Ontology name: " + mid.getOntologyID().getOntologyName());
				out.println("<br/>Ontology version: " + mid.getOntologyID().getOntologyVersion());
				out.println("<br/>MappingID: " + mid.getMappingID());
				MastroAPI mastro = session.getMastroInstance(mid);
				IOBDAQueryMonitor monitor = mastro.getOBDAQueryMonitor();
				List<String> quids = monitor.getQueryIds();
				out.println("<br/><b>QUERY CATALOG:</b> <ol>");
				for (String qid : quids) {
					int id = monitor.getQueryQidById(qid);
					out.println("<li><i>" + qid + "</i> (" + linkQueryLog(session.getSessionId().toString(), "" + id) + ")");
					QueryRecord qr = monitor.getQueryRecord(id);
					out.println("<br/>Cat-Id: " + qr.getCatalogId());
					out.println("<br/>State: " + qr.getQueryState());
					List<QueryRecordDetail> qrds = qr.getDetails();
					if (qrds != null)
					for (QueryRecordDetail qrd : qrds) {
						out.println("<br/>" + qrd.getName() + " : " + qrd.getValue());
					}
					out.println("</li>");
				}
				out.println("</ol>");
				out.println("</li>");
			}
			out.println("</ul>");
		}
		out.println("<p>Time to live: " + new Date(session.getTTL()).toString() + "</p></html>");
	}

	private String linkSession(String name) {
		return "<a href='?" + name + "'>" + name + "</a>";
	}
	
	private String linkQueryLog(String name, String qid) {
		return "<a href='./QueryMonitorLog?" + name + "&" + qid + "'>" + name + "</a>";
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
