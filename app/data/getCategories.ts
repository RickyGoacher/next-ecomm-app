"use client"

import { getCategories } from "../server/actions/getCategories";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    return useQuery({
        queryFn: () => getCategories(),
        queryKey: []
    });
}