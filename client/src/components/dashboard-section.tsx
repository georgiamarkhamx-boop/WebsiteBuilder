import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Award, 
  Users, 
  Shield,
  CheckCircle,
  PlayCircle,
  Calendar,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

export default function DashboardSection() {
  const { data: courses = [] } = useQuery({
    queryKey: ['/api/courses'],
    queryFn: () => apiRequest("GET", "/api/courses").then(res => res.json())
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ['/api/enrollments', 'user', 1],
    queryFn: () => apiRequest("GET", "/api/enrollments/user/1").then(res => res.json())
  });

  const { data: assessments = [] } = useQuery({
    queryKey: ['/api/assessments', 'user', 1],
    queryFn: () => apiRequest("GET", "/api/assessments/user/1").then(res => res.json())
  });

  // Calculate dashboard metrics
  const totalCourses = courses.length;
  const completedCourses = enrollments.filter(e => e.completed).length;
  const inProgressCourses = enrollments.filter(e => !e.completed && e.progress > 0).length;
  const overallProgress = enrollments.length > 0 
    ? Math.round((completedCourses / enrollments.length) * 100)
    : 0;

  const recentAssessments = assessments.slice(0, 3);
  const averageScore = assessments.length > 0 
    ? Math.round(assessments.reduce((sum, a) => sum + (a.score || 0), 0) / assessments.length)
    : 0;

  const upcomingDeadlines = [
    { course: "Cyber Basics", deadline: "2024-01-25", type: "completion" },
    { course: "Data Protection", deadline: "2024-01-30", type: "assessment" },
    { course: "Email Security", deadline: "2024-02-05", type: "quiz" }
  ];

  const leaderboard = [
    { name: "Sarah Johnson", score: 95, department: "IT", avatar: "👩‍💻" },
    { name: "Mike Chen", score: 92, department: "Operations", avatar: "👨‍💼" },
    { name: "Emma Davis", score: 88, department: "HR", avatar: "👩‍💼" },
    { name: "Alex Kumar", score: 85, department: "Finance", avatar: "👨‍💻" },
    { name: "Lisa Wang", score: 82, department: "Marketing", avatar: "👩‍🎨" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Security Training Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Track your progress, view analytics, and stay on top of your cybersecurity training goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overview Cards */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Training Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{completedCourses}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{inProgressCourses}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{averageScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{totalCourses}</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Ring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-600"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${overallProgress}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
                      <div className="text-xs text-gray-600">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Current Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.slice(0, 3).map((course) => {
                      const enrollment = enrollments.find(e => e.courseId === course.id);
                      const progress = enrollment?.progress || 0;
                      const isCompleted = enrollment?.completed || false;
                      
                      return (
                        <div key={course.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl">{course.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-600">{course.duration} minutes</div>
                            <Progress value={progress} className="mt-2 h-2" />
                          </div>
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <PlayCircle className="w-5 h-5 text-blue-600" />
                            )}
                            <Badge variant={isCompleted ? "default" : "secondary"}>
                              {isCompleted ? "Complete" : `${progress}%`}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{item.course}</div>
                          <div className="text-sm text-gray-600 capitalize">{item.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-orange-600">{item.deadline}</div>
                          <Badge variant="outline" className="text-xs">
                            Due Soon
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Recent Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{assessment.type}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(assessment.completedAt || '').toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{assessment.score || 0}%</div>
                        <Badge 
                          variant={assessment.score >= 80 ? "default" : "secondary"}
                          className={assessment.score >= 80 ? "bg-green-500" : ""}
                        >
                          {assessment.score >= 80 ? "Passed" : "Review"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Company Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers in security training across all departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((person, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold",
                          index === 0 && "bg-yellow-500 text-white",
                          index === 1 && "bg-gray-400 text-white",
                          index === 2 && "bg-orange-500 text-white",
                          index > 2 && "bg-gray-200 text-gray-600"
                        )}>
                          {index + 1}
                        </div>
                        <div className="text-2xl">{person.avatar}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{person.name}</div>
                        <div className="text-sm text-gray-600">{person.department}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{person.score}%</div>
                        <div className="text-sm text-gray-600">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Learning Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">This Week</span>
                      <span className="font-medium">3 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-medium">12 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Time</span>
                      <span className="font-medium">48 hours</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">+15% from last month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Security Maturity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Level</span>
                      <Badge variant="default">Intermediate</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Score</span>
                      <span className="font-medium text-green-600">Low</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Next Milestone</span>
                      <span className="font-medium">Advanced</span>
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        Take Assessment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}