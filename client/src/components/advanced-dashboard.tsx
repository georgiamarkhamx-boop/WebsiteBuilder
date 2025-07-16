import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  Brain,
  Activity,
  Eye,
  Zap
} from "lucide-react";

export default function AdvancedDashboard() {
  const [userLevel, setUserLevel] = useState(7);
  const [xpPoints, setXpPoints] = useState(2450);
  const [threatLevel, setThreatLevel] = useState("Medium");
  const [complianceScore, setComplianceScore] = useState(78);

  const gamificationData = {
    level: userLevel,
    xp: xpPoints,
    nextLevelXp: 3000,
    achievements: [
      { name: "Phishing Expert", icon: "🎣", unlocked: true },
      { name: "Incident Commander", icon: "🚨", unlocked: true },
      { name: "Policy Master", icon: "📋", unlocked: false },
      { name: "Zero Trust Advocate", icon: "🔐", unlocked: false }
    ],
    streakDays: 15,
    totalCourses: 23,
    completedCourses: 18
  };

  const aiInsights = [
    {
      type: "risk",
      title: "Training Opportunity Identified",
      description: "New phishing techniques emerging in your industry. Learn how to recognize and respond to these threats.",
      priority: "high",
      action: "Start Advanced Email Security Module"
    },
    {
      type: "learning",
      title: "Personalized Learning Path",
      description: "Based on your assessment, focus on cloud security fundamentals next.",
      priority: "medium",
      action: "Begin Cloud Security Track"
    },
    {
      type: "compliance",
      title: "Compliance Gap Identified",
      description: "GDPR training completion rate below threshold for your role.",
      priority: "high",
      action: "Complete GDPR Essentials"
    }
  ];

  const ttxSchedule = [
    {
      date: "2024-01-20",
      title: "Ransomware Response TTX",
      type: "Crisis Management",
      participants: 12,
      difficulty: "Advanced",
      status: "scheduled"
    },
    {
      date: "2024-01-15",
      title: "Board-Level Breach Communication",
      type: "Executive Training",
      participants: 8,
      difficulty: "Expert",
      status: "completed"
    },
    {
      date: "2024-01-25",
      title: "Supply Chain Security Incident",
      type: "Cross-Functional",
      participants: 15,
      difficulty: "Intermediate",
      status: "upcoming"
    }
  ];

  const trainingMetrics = {
    threatsIdentified: 47,
    attacksRecognized: 1247,
    skillsLearned: 12,
    complianceStatus: "78% Complete",
    teamTrainingProgress: 85,
    lastAssessment: "2 days ago"
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Gamification Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              Level {gamificationData.level}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <Progress value={(gamificationData.xp / gamificationData.nextLevelXp) * 100} className="bg-white/20" />
              <p className="text-xs sm:text-sm opacity-90">{gamificationData.xp}/{gamificationData.nextLevelXp} XP</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              {gamificationData.streakDays} Day Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm opacity-90">Keep learning daily to maintain your streak!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Threat Level: {threatLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm opacity-90">Current organizational risk assessment</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Compliance: {complianceScore}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={complianceScore} className="bg-white/20" />
            <p className="text-sm opacity-90 mt-2">Regulatory compliance status</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 text-xs sm:text-sm">
          <TabsTrigger value="overview" className="px-2 sm:px-3">Overview</TabsTrigger>
          <TabsTrigger value="learning" className="px-2 sm:px-3">Learning</TabsTrigger>
          <TabsTrigger value="ttx" className="px-2 sm:px-3">TTX Sessions</TabsTrigger>
          <TabsTrigger value="assessment" className="px-2 sm:px-3">Assessment</TabsTrigger>
          <TabsTrigger value="analytics" className="px-2 sm:px-3">Analytics</TabsTrigger>
          <TabsTrigger value="monitoring" className="px-2 sm:px-3">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* AI-Driven Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Driven Insights
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your activity and threat landscape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm sm:text-base">{insight.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{insight.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={insight.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                          {insight.priority}
                        </Badge>
                        <Button size="sm" variant="outline" className="text-xs sm:text-sm px-2 sm:px-3">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Achievement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  Threats Identified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{trainingMetrics.threatsIdentified}</div>
                <p className="text-sm text-gray-600">Successfully spotted in simulations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Attacks Recognized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{trainingMetrics.attacksRecognized}</div>
                <p className="text-sm text-gray-600">Correctly identified in training</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Team Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{trainingMetrics.teamTrainingProgress}%</div>
                <Progress value={trainingMetrics.teamTrainingProgress} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Adaptive Learning Path
              </CardTitle>
              <CardDescription>
                Personalized curriculum based on your skill assessment and role requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Current: Cloud Security Fundamentals</h4>
                    <p className="text-sm text-gray-600">Recommended based on your role as Cloud Engineer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={65} className="w-20" />
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Next: Zero Trust Architecture</h4>
                    <p className="text-sm text-gray-600">Advanced module unlocked at 70% completion</p>
                  </div>
                  <Badge variant="secondary">Locked</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Completed: Incident Response</h4>
                    <p className="text-sm text-gray-600">Achieved 92% score - Excellent!</p>
                  </div>
                  <Badge variant="default" className="bg-green-500">
                    <Award className="w-4 h-4 mr-1" />
                    Certified
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements & Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gamificationData.achievements.map((achievement, index) => (
                  <div key={index} className={`text-center p-4 rounded-lg border-2 ${
                    achievement.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className="font-semibold text-sm">{achievement.name}</div>
                    {achievement.unlocked && (
                      <Badge variant="default" className="bg-green-500 mt-2">Unlocked</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ttx" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Tabletop Exercise Schedule
              </CardTitle>
              <CardDescription>
                AI-driven scenarios with real-time adaptation and cross-functional collaboration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ttxSchedule.map((session, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{session.title}</h4>
                      <Badge variant={
                        session.status === 'completed' ? 'default' : 
                        session.status === 'scheduled' ? 'secondary' : 'outline'
                      }>
                        {session.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Date:</span> {session.date}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {session.type}
                      </div>
                      <div>
                        <span className="font-medium">Participants:</span> {session.participants}
                      </div>
                      <div>
                        <span className="font-medium">Difficulty:</span> {session.difficulty}
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Join Session</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Continuous Assessment Engine
              </CardTitle>
              <CardDescription>
                Real-time monitoring and predictive risk analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Security Maturity Score</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Technical Controls</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} />
                    
                    <div className="flex justify-between">
                      <span>Policy & Procedures</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} />
                    
                    <div className="flex justify-between">
                      <span>Human Factors</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Predicted Risk Factors</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-medium">Phishing Susceptibility</div>
                        <div className="text-sm text-gray-600">High risk detected</div>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <div className="font-medium">Password Hygiene</div>
                        <div className="text-sm text-gray-600">Moderate improvement needed</div>
                      </div>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">Incident Response</div>
                        <div className="text-sm text-gray-600">Well prepared</div>
                      </div>
                      <Badge variant="default" className="bg-green-500">Low</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive insights into individual and team performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-gray-600">Courses Completed</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">47h</div>
                  <div className="text-sm text-gray-600">Total Learning Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Training Progress Monitoring
              </CardTitle>
              <CardDescription>
                Track your learning journey and skill development in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-800">Learning Goals</h4>
                      <Badge variant="secondary">5</Badge>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Complete Phishing Awareness by Jan 25</li>
                      <li>• Achieve 85% on Incident Response quiz</li>
                      <li>• Finish Cloud Security track this month</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-800">Recent Achievements</h4>
                      <Badge variant="default" className="bg-green-500">New</Badge>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Completed Data Protection module (92%)</li>
                      <li>• Earned "Threat Hunter" badge</li>
                      <li>• Reached Level 7 in gamification</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-purple-800">Learning Analytics</h4>
                    <Badge variant="default" className="bg-purple-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Improving
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Study Streak:</span> 15 days
                    </div>
                    <div>
                      <span className="font-medium">Weekly Hours:</span> 4.5h
                    </div>
                    <div>
                      <span className="font-medium">Avg Score:</span> 89%
                    </div>
                    <div>
                      <span className="font-medium">Skills Gained:</span> 12
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}