import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Clock, Users, BookOpen, Award, Search, Filter, Star, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { courseCategories, getCourseBadge, getTagColors, getDifficultyColor } from "@/lib/course-data";
import CoursePlayer from "./course-player";

interface CoursesSectionProps {
  onShowSignup: () => void;
}

export default function CoursesSection({ onShowSignup }: CoursesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    queryFn: () => apiRequest("GET", "/api/courses").then(res => res.json())
  });

  const enrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      return apiRequest("POST", "/api/enrollments", { courseId }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments'] });
    }
  });

  const completeMutation = useMutation({
    mutationFn: async ({ courseId, score }: { courseId: number; score: number }) => {
      return apiRequest("POST", "/api/assessments", {
        type: "course_completion",
        courseId,
        score,
        answers: {},
        results: { score, completed: true }
      }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/assessments'] });
      queryClient.invalidateQueries({ queryKey: ['/api/certificates'] });
    }
  });

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category.includes(selectedCategory);
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    enrollMutation.mutate(course.id);
  };

  const handleCompleteCourse = (courseId: number, score: number) => {
    completeMutation.mutate({ courseId, score });
    setSelectedCourse(null);
  };

  const getCourseStats = () => {
    const stats = {
      total: courses.length,
      beginner: courses.filter(c => c.difficulty === 'Beginner').length,
      intermediate: courses.filter(c => c.difficulty === 'Intermediate').length,
      advanced: courses.filter(c => c.difficulty === 'Advanced').length,
      popular: courses.filter(c => c.isPopular).length,
      new: courses.filter(c => c.isNew).length
    };
    return stats;
  };

  const stats = getCourseStats();

  if (selectedCourse) {
    return (
      <CoursePlayer
        course={selectedCourse}
        onComplete={handleCompleteCourse}
        onClose={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Interactive Training Courses
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive cybersecurity training designed to reduce human error and strengthen your organization's security posture.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="text-center">
            <CardContent className="pt-4 md:pt-6">
              <div className="text-xl md:text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-xs md:text-sm text-gray-600">Total Courses</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 md:pt-6">
              <div className="text-xl md:text-2xl font-bold text-green-600">{stats.beginner}</div>
              <div className="text-xs md:text-sm text-gray-600">Beginner</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 md:pt-6">
              <div className="text-xl md:text-2xl font-bold text-yellow-600">{stats.intermediate}</div>
              <div className="text-xs md:text-sm text-gray-600">Intermediate</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 md:pt-6">
              <div className="text-xl md:text-2xl font-bold text-red-600">{stats.advanced}</div>
              <div className="text-xs md:text-sm text-gray-600">Advanced</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 md:pt-6">
              <div className="text-xl md:text-2xl font-bold text-purple-600">{stats.popular}</div>
              <div className="text-xs md:text-sm text-gray-600">Popular</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 md:pt-6">
              <div className="text-xl md:text-2xl font-bold text-pink-600">{stats.new}</div>
              <div className="text-xs md:text-sm text-gray-600">New</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 btn-touch">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6 md:mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 md:gap-0">
            {courseCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="btn-touch text-xs md:text-sm">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {courseCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{category.label}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <CardHeader>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map(course => {
                    const badge = getCourseBadge(course);
                    const tags = course.tags || [];
                    
                    return (
                      <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-xl overflow-hidden">
                        <div className="relative">
                          {/* Colored top bar */}
                          <div className={cn(
                            "h-2 w-full",
                            course.difficulty === 'Beginner' && "bg-gradient-to-r from-pink-400 to-pink-500",
                            course.difficulty === 'Intermediate' && "bg-gradient-to-r from-purple-400 to-purple-500",
                            course.difficulty === 'Advanced' && "bg-gradient-to-r from-blue-400 to-blue-500"
                          )} />
                          
                          {badge && (
                            <Badge 
                              className={cn(
                                "absolute top-4 right-4",
                                badge.type === 'popular' && "bg-purple-500 hover:bg-purple-600",
                                badge.type === 'new' && "bg-green-500 hover:bg-green-600",
                                badge.type === 'advanced' && "bg-red-500 hover:bg-red-600"
                              )}
                            >
                              {badge.text}
                            </Badge>
                          )}
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Course Title */}
                            <div>
                              <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                                {course.title}
                              </CardTitle>
                              <CardDescription className="text-gray-600 leading-relaxed">
                                {course.description}
                              </CardDescription>
                            </div>
                            
                            {/* Course Meta Info */}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration} minutes
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                Interactive
                              </div>
                              <Badge variant="outline" className={cn(
                                "text-xs",
                                course.difficulty === 'Beginner' && "border-green-300 text-green-700",
                                course.difficulty === 'Intermediate' && "border-yellow-300 text-yellow-700",
                                course.difficulty === 'Advanced' && "border-red-300 text-red-700"
                              )}>
                                {course.difficulty}
                              </Badge>
                            </div>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {tags.slice(0, 3).map((tag, index) => (
                                <Badge 
                                  key={index} 
                                  variant="secondary" 
                                  className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                  +{tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                            
                            {/* Action Button */}
                            <Button 
                              onClick={() => handleStartCourse(course)}
                              className={cn(
                                "w-full font-medium btn-touch transition-all duration-200",
                                course.difficulty === 'Beginner' && "bg-pink-500 hover:bg-pink-600",
                                course.difficulty === 'Intermediate' && "bg-purple-500 hover:bg-purple-600",
                                course.difficulty === 'Advanced' && "bg-blue-500 hover:bg-blue-600"
                              )}
                              disabled={enrollMutation.isPending}
                            >
                              Try Sample
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-8 md:mt-12">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="pt-6 pb-6 md:pt-8 md:pb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-base md:text-lg mb-6 opacity-90">
                Join thousands of organizations improving their security posture with our comprehensive training platform.
              </p>
              <Button 
                onClick={onShowSignup}
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 btn-touch"
              >
                Start Your Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}