import { useQuery } from "@tanstack/react-query";

export function useCourses(category?: string) {
  return useQuery({
    queryKey: ["/api/courses", category],
    queryFn: async () => {
      const url = category && category !== "all" 
        ? `/api/courses?category=${category}`
        : "/api/courses";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json();
    }
  });
}
