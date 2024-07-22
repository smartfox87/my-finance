import { LoginData, RegisterData } from "@/types/auth";
import { FieldIds } from "@/types/field";

export const isLoginData = (data: Record<string, any>): data is LoginData => FieldIds.EMAIL in data && FieldIds.PASSWORD in data;

export const isRegisterData = (data: Record<string, any>): data is RegisterData => FieldIds.EMAIL in data && FieldIds.PASSWORD in data && FieldIds.PASSWORD in data;
