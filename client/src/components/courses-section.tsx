import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourses } from "@/hooks/use-courses";

export default function CoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: courses = [], isLoading } = useCourses(selectedCategory);

  const categories = [
    { id: "all", label: "All Courses" },
    { id: "general", label: "General Employee" },
    { id: "technical", label: "Technical Staff" },
    { id: "leadership", label: "Leadership" },
    { id: "compliance", label: "Compliance" }
  ];

  const handleCourseDemo = (courseId: string) => {
    alert(`${courseId} course demo would be shown here with interactive content, quizzes, and scenarios.`);
  };

  const getBadgeVariant = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "quizzes":
      case "certificate":
        return "bg-green-100 text-green-800";
      case "videos":
      case "tutorials":
        return "bg-blue-100 text-blue-800";
      case "games":
      case "simulations":
      case "scenarios":
        return "bg-pink-100 text-pink-800";
      case "hands-on":
      case "labs":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCourseBadge = (course: any) => {
    if (course.isPopular) return { text: "Popular", class: "badge-popular" };
    if (course.isNew) return { text: "New", class: "badge-new" };
    if (course.difficulty === "Advanced") return { text: "Advanced", class: "badge-advanced" };
    return null;
  };

  if (isLoading) {
    return (
      <section id="courses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Learning Modules</h2>
          <p className="text-lg text-gray-600">Comprehensive training solutions designed for different roles and skill levels within your organization.</p>
        </div>
        
        {/* Course Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any, index: number) => {
            const badge = getCourseBadge(course);
            
            return (
              <div 
                key={course.id} 
                className="bg-white rounded-lg shadow-sm card-hover relative animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {badge && (
                  <div className={`course-badge ${badge.class}`}>
                    {badge.text}
                  </div>
                )}
                
                <div className="p-6">
                  <div className="feature-icon feature-icon-purple mb-4">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{course.duration} minutes</span>
                    <span className="mx-2">•</span>
                    <span>{course.difficulty}</span>
                  </div>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {course.tags?.map((tag: string, tagIndex: number) => (
                      <Badge key={tagIndex} variant="secondary" className={getBadgeVariant(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-purple-800 p-0"
                    onClick={() => handleCourseDemo(course.title)}
                  >
                    Try Sample
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No courses found for the selected category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
