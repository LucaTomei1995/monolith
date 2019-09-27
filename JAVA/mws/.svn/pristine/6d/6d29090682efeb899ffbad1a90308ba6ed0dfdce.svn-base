package com.mws.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mws.model.MethodInfo;
import com.mwsx.services.MwsxAvailabilityTools;
import com.mwsx.services.MwsxService;

/**
 * Servlet implementation class Help
 */
@WebServlet(name = "HelpPage", urlPatterns = { "/HelpPage" })
public class Help extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Help() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String schema = request.getScheme();
		String server = request.getServerName();
		String port = "" + request.getServerPort();
		String address = schema + "://" + server + ":" + port + "/" + "mws" + ((WebServlet)HelpType.class.getAnnotation(WebServlet.class)).value()[0] + "?[TYPE]";
		response.setHeader("Content-type", "text/html");
		List<MethodInfo> infos = MwsxAvailabilityTools.getProvidedMethodsList(MwsxService.class);
		int doneCount = 0;
		int toDoCount = 0;
		int donePerc = 0;
		int toDoPerc = 0;
		for (MethodInfo info : infos) {
			if (info.isAvailable())
				doneCount++;
			else
				toDoCount++;
		}
		int total = doneCount + toDoCount;
		donePerc = (doneCount*100 / total);
		toDoPerc = (toDoCount*100 / total);
		response.getWriter().println("<h2>Available methods (green colored methods are implemented)</h2>");
		response.getWriter().println("<h3>Progress:</h3>");
		response.getWriter().println("<table style='background: #DDDDDD' cellpadding='4' cellspacing='8' width='100%'>");
		response.getWriter().println("<tr>");
		response.getWriter().println("<td style='background: #99FF99' width='" + donePerc + "%'><b>" + doneCount + " done</b> (" + donePerc + "&#37;)</td>");
		response.getWriter().println("<td style='background: #FF9999' width='" + toDoPerc + "%'><b>" + toDoCount + " todo</b> (" + toDoPerc + "&#37;)</td>");
		response.getWriter().println("</tr>");
		response.getWriter().println("</table>");
		response.getWriter().println("<h3>Methods detail</h3>");
		response.getWriter().println("<table border='1' cellpadding='1' cellspacing='1'>");
		response.getWriter().println("<thead>");
		response.getWriter().println("<tr><th>Method name</th><th>Path name</th><th>Return type</th><th>Method type</th><th>Body param</th><th>Path params</th><th>Query params</th></tr>");
		response.getWriter().println("</thead>");
		response.getWriter().println("<tbody>");
		for (MethodInfo info : infos) {
			if (info.isAvailable())
				response.getWriter().println("<tr style='background: #99FF99'>");
			else
				response.getWriter().println("<tr>");
			response.getWriter().println("<td>" + (info.getName() != null ? info.getName() : "-") + "</td>");
			response.getWriter().println("<td>" + (info.getPath() != null ? info.getPath() : "-") + "</td>");
			if (info.isReturnTypeList()) {
				String retType = "[TN]&lt;[P]&gt;";
				retType = retType.replace("[TN]", info.getReturnType());
				retType = retType.replace("[P]", l(info.getInnerReturnType()));
				response.getWriter().println("<td>" + retType + "</td>");
			}
			else {
				response.getWriter().println("<td>" + (info.getReturnType() != null ? l(info.getReturnType()) : "-") + "</td>");
			}			
			response.getWriter().println("<td>" + (info.getMethod() != null ? info.getMethod() : "-") + "</td>");
			response.getWriter().println("<td>" + (info.getBodyParams() != null ? l(info.getBodyParamTypes().get(0)) + "&nbsp;" + info.getBodyParams().get(0): "-") + "</td>");
			response.getWriter().println("<td>" + (info.getPathParams() != null ? info.getPathParams() : "-") + "</td>");
			response.getWriter().println("<td>" + (info.getQueryParams() != null ? info.getQueryParams() : "-") + "</td>");
			response.getWriter().println("</tr>");
		}
		response.getWriter().println("</tbody>");
		response.getWriter().println("</table>");
		System.out.println("##################################################");
		System.out.println("##################################################");
	}

	private String l(String innerReturnType) {
		if (!innerReturnType.startsWith("com.mwsx."))
			return innerReturnType;
		String ret = "<a href='[L]'>[V]</a>";
		ret = ret.replace("[L]", "./HelpType?" + innerReturnType);
		ret = ret.replace("[V]", innerReturnType);
		return ret;
	}

}
