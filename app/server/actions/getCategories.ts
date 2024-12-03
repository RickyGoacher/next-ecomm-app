"use server";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getCategories() {
    const Response = await fetch(`${API_BASE_URL}products/categories`);
    const Data:Array<string> = await Response.json();
    return Data;
}