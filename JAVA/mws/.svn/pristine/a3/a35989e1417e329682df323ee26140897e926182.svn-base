package com.mws.model;

import java.lang.reflect.Field;

public class Descriptor {
	
	public static String getObjectDescription(Object o) throws IllegalArgumentException, IllegalAccessException {
		String description = o.getClass().getName();
		for (Field field : o.getClass().getDeclaredFields()) {
			Object ov = field.get(o);
			description += "\n\t" + field.getName() + ": " + String.valueOf(ov);
		}
		return description;
	}
}
