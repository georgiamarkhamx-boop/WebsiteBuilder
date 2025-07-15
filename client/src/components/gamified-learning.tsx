import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Gamepad2, 
  Award, 
  Crown, 
  Shield,
  Flame,
  Coins,
  Users,
  TrendingUp,
  BookOpen,
  CheckCircle2
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'engagement' | 'mastery' | 'social';
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedTime: number;
  modules: Module[];
  prerequisites: string[];
  adaptiveContent: boolean;
  personalizedRecommendations: string[];
}

interface Module {
  id: string;
  name: string;
  type: 'video' | 'simulation' | 'game' | 'assessment' | 'scenario';
  duration: number;
  points: number;
  completed: boolean;
  score?: number;
  emergingTech?: boolean;
}

interface GameElement {
  type: 'points' | 'streak' | 'challenge' | 'leaderboard' | 'badge';
  value: number | string;
  description: string;
  active: boolean;
}

export default function GamifiedLearning() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [userStats, setUserStats] = useState({
    totalPoints: 3240,
    level: 12,
    streak: 18,
    rank: 47,
    totalUsers: 1284
  });

  const emergingTechModules: Module[] = [
    {
      id: "blockchain-security",
      name: "Blockchain Security Fundamentals",
      type: "simulation",
      duration: 45,
      points: 300,
      completed: false,
      emergingTech: true
    },
    {
      id: "iot-threat-landscape",
      name: "IoT Threat Landscape & Mitigation",
      type: "game",
      duration: 60,
      points: 400,
      completed: true,
      score: 88,
      emergingTech: true
    },
    {
      id: "quantum-cryptography",
      name: "Quantum-Safe Encryption Implementation",
      type: "scenario",
      duration: 90,
      points: 600,
      completed: false,
      emergingTech: true
    },
    {
      id: "ai-security-risks",
      name: "AI/ML Security Risks & Defenses",
      type: "simulation",
      duration: 75,
      points: 500,
      completed: true,
      score: 92,
      emergingTech: true
    }
  ];

  const learningPaths: LearningPath[] = [
    {
      id: "adaptive-security-fundamentals",
      name: "Adaptive Security Fundamentals",
      description: "Personalized learning path that adapts to your skill level and role requirements",
      difficulty: "Beginner",
      estimatedTime: 240,
      modules: [
        {
          id: "cyber-basics-game",
          name: "Cybersecurity Basics Gaming Challenge",
          type: "game",
          duration: 30,
          points: 200,
          completed: true,
          score: 85
        },
        {
          id: "phishing-simulation",
          name: "Advanced Phishing Simulation",
          type: "simulation",
          duration: 45,
          points: 300,
          completed: true,
          score: 92
        },
        {
          id: "incident-response-scenario",
          name: "Incident Response War Game",
          type: "scenario",
          duration: 60,
          points: 400,
          completed: false
        }
      ],
      prerequisites: [],
      adaptiveContent: true,
      personalizedRecommendations: [
        "Focus on hands-on simulations based on your learning style",
        "Increase difficulty in network security modules",
        "Add more collaborative exercises for team skills"
      ]
    },
    {
      id: "emerging-tech-mastery",
      name: "Emerging Technology Security Mastery",
      description: "Cut-edge security training for blockchain, IoT, quantum computing, and AI",
      difficulty: "Advanced",
      estimatedTime: 360,
      modules: emergingTechModules,
      prerequisites: ["Security Fundamentals", "Risk Assessment"],
      adaptiveContent: true,
      personalizedRecommendations: [
        "Blockchain security aligns with your blockchain development background",
        "IoT security recommended for your current project involvement",
        "Quantum cryptography preparing for future threat landscape"
      ]
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "phishing-master",
      name: "Phishing Master",
      description: "Identify 100 phishing attempts correctly",
      icon: "🎣",
      category: "mastery",
      points: 500,
      unlocked: true,
      progress: 100,
      maxProgress: 100
    },
    {
      id: "streak-warrior",
      name: "Streak Warrior",
      description: "Maintain a 30-day learning streak",
      icon: "🔥",
      category: "engagement",
      points: 750,
      unlocked: false,
      progress: 18,
      maxProgress: 30
    },
    {
      id: "simulation-champion",
      name: "Simulation Champion",
      description: "Complete 10 advanced simulations with 90%+ scores",
      icon: "🏆",
      category: "mastery",
      points: 1000,
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: "team-leader",
      name: "Team Leader",
      description: "Lead 5 collaborative TTX sessions",
      icon: "👑",
      category: "social",
      points: 800,
      unlocked: false,
      progress: 2,
      maxProgress: 5
    }
  ];

  const gameElements: GameElement[] = [
    {
      type: "points",
      value: userStats.totalPoints,
      description: "Total Experience Points",
      active: true
    },
    {
      type: "streak",
      value: userStats.streak,
      description: "Day Learning Streak",
      active: true
    },
    {
      type: "challenge",
      value: "Weekly Cybersecurity Challenge",
      description: "Complete 3 advanced modules this week",
      active: true
    },
    {
      type: "leaderboard",
      value: `#${userStats.rank} of ${userStats.totalUsers}`,
      description: "Global Ranking",
      active: true
    }
  ];

  const certifications = [
    {
      name: "Certified Cybersecurity Professional",
      provider: "Security Enhance Institute",
      level: "Professional",
      progress: 78,
      modules: 12,
      completedModules: 9,
      recognized: true,
      accredited: true
    },
    {
      name: "Advanced Incident Response Specialist",
      provider: "International Cybersecurity Board",
      level: "Expert",
      progress: 45,
      modules: 8,
      completedModules: 4,
      recognized: true,
      accredited: true
    },
    {
      name: "Emerging Technology Security Expert",
      provider: "Future Tech Security Alliance",
      level: "Specialist",
      progress: 23,
      modules: 6,
      completedModules: 1,
      recognized: true,
      accredited: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Gamification Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Level {userStats.level}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalPoints}</div>
            <p className="text-sm opacity-90">Experience Points</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5" />
              {userStats.streak} Day Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm opacity-90">Keep learning to maintain your streak!</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Rank #{userStats.rank}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm opacity-90">of {userStats.totalUsers} learners</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              {achievements.filter(a => a.unlocked).length} Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm opacity-90">Unlocked achievements</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="learning-paths" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="emerging-tech">Emerging Tech</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="learning-paths" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Adaptive Learning Paths
              </CardTitle>
              <CardDescription>
                Customizable learning journeys that adapt to your skill level and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPaths.map((path) => (
                  <div key={path.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{path.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{path.difficulty}</Badge>
                        {path.adaptiveContent && (
                          <Badge variant="default" className="bg-purple-500">
                            <Zap className="w-3 h-3 mr-1" />
                            Adaptive
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{path.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Learning Modules</h4>
                        <div className="space-y-2">
                          {path.modules.map((module) => (
                            <div key={module.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <div className="text-sm">
                                  {module.type === 'game' && <Gamepad2 className="w-4 h-4 text-blue-500" />}
                                  {module.type === 'simulation' && <Shield className="w-4 h-4 text-green-500" />}
                                  {module.type === 'scenario' && <Target className="w-4 h-4 text-purple-500" />}
                                  {module.type === 'video' && <BookOpen className="w-4 h-4 text-orange-500" />}
                                </div>
                                <span className="text-sm font-medium">{module.name}</span>
                                {module.emergingTech && (
                                  <Badge variant="secondary" className="text-xs">New Tech</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{module.points} pts</span>
                                {module.completed && (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">AI Recommendations</h4>
                        <div className="space-y-2">
                          {path.personalizedRecommendations.map((rec, index) => (
                            <div key={index} className="text-sm p-2 bg-blue-50 rounded">
                              <span className="text-blue-600">•</span> {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Duration:</span> {path.estimatedTime} minutes
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Modules:</span> {path.modules.length}
                        </div>
                      </div>
                      <Button onClick={() => setSelectedPath(path)}>
                        Start Learning Path
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emerging-tech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Emerging Technology Security
              </CardTitle>
              <CardDescription>
                Stay ahead with cutting-edge security training for blockchain, IoT, quantum computing, and AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergingTechModules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{module.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-purple-500">
                          <Zap className="w-3 h-3 mr-1" />
                          Emerging
                        </Badge>
                        {module.completed && (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Type</div>
                        <div className="font-medium capitalize">{module.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">{module.duration} min</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Points</div>
                        <div className="font-medium">{module.points} XP</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Score</div>
                        <div className="font-medium">{module.score ? `${module.score}%` : 'Not started'}</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      variant={module.completed ? "outline" : "default"}
                    >
                      {module.completed ? "Review Module" : "Start Module"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements & Badges
              </CardTitle>
              <CardDescription>
                Unlock achievements as you progress through your cybersecurity journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`border rounded-lg p-4 ${
                    achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{achievement.points}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                        {achievement.unlocked ? "Unlocked" : "Locked"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Professional Certifications
              </CardTitle>
              <CardDescription>
                Earn recognized certifications and accreditations upon completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{cert.name}</h3>
                        <p className="text-sm text-gray-600">{cert.provider}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{cert.level}</Badge>
                        {cert.recognized && (
                          <Badge variant="default" className="bg-blue-500">
                            <Star className="w-3 h-3 mr-1" />
                            Recognized
                          </Badge>
                        )}
                        {cert.accredited && (
                          <Badge variant="default" className="bg-green-500">
                            <Shield className="w-3 h-3 mr-1" />
                            Accredited
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Progress</div>
                        <Progress value={cert.progress} className="mb-2" />
                        <div className="text-sm font-medium">{cert.progress}% Complete</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Modules</div>
                        <div className="text-sm font-medium">
                          {cert.completedModules}/{cert.modules} completed
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Industry-recognized professional certification
                      </div>
                      <Button variant="outline">
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Global Leaderboard
              </CardTitle>
              <CardDescription>
                See how you rank among cybersecurity learners worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">#{userStats.rank}</div>
                    <div className="text-sm text-gray-600">Your Rank</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userStats.totalUsers}</div>
                    <div className="text-sm text-gray-600">Total Learners</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-semibold">Sarah Chen</div>
                        <div className="text-sm text-gray-600">Security Analyst</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">5,240 pts</div>
                      <div className="text-sm text-gray-600">Level 18</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-semibold">Mike Johnson</div>
                        <div className="text-sm text-gray-600">CISO</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">4,890 pts</div>
                      <div className="text-sm text-gray-600">Level 17</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-semibold">Emma Rodriguez</div>
                        <div className="text-sm text-gray-600">Penetration Tester</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">4,560 pts</div>
                      <div className="text-sm text-gray-600">Level 16</div>
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