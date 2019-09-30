package com.mws.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mws.model.FieldInfo;
import com.mws.model.ObjectInfo;
import com.mws.services.StubFactory;

/**
 * Servlet implementation class HelpType
 */
@WebServlet("/HelpTypeKG")
public class HelpType2 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
     * @see HttpServlet#HttpServlet()
     */
    public HelpType2() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = request.getRequestURL().toString();
		response.setHeader("Content-type", "text/html");
//		String schema = request.getScheme();
//		String server = request.getServerName();
//		String port = "" + request.getServerPort();
//		String address = schema + "://" + server + ":" + port + "/" + "mws" + ((WebServlet)HelpType.class.getAnnotation(WebServlet.class)).value()[0];
//		System.out.println(address);
		int idx = url.indexOf("?");
		if (idx != -1)
			url = url.substring(0, idx);
		String param = request.getQueryString();
		if (param.startsWith("?"))
			param = param.substring(0, param.length());
		try {
			Class<?> clazz = Class.forName(param);
			ObjectInfo oi = StubFactory.getObjectInfo(clazz);
			response.getWriter().println("<h2>" + oi.getName() + "</h2>");
			response.getWriter().println("<table border='1' cellpadding='2' cellspacing='2'>");
			response.getWriter().println("<thead>");
			response.getWriter().println("<tr><th>Field type</th><th>Field name</th></tr>");
			response.getWriter().println("</thead>");
			response.getWriter().println("<tbody>");
			for (FieldInfo fi : oi.getFields()) {
				String type = fi.getType();
				if (type != null && type.trim().startsWith("com.mwsx.model"))
					type = "<a href='" + url + "?" + type + "'>" + type + "</a>";
				response.getWriter().println("<tr><td>" + type + "</td><td>" + fi.getName() + "</td></tr>");
			}
			response.getWriter().println("</tbody>");
			response.getWriter().println("</table>");
			response.getWriter().println("<a href='./HelpPageKG'>Home</a>");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
