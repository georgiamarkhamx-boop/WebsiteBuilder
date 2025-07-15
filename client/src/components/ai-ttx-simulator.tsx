import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Target,
  Zap,
  FileText,
  Video,
  BarChart3
} from "lucide-react";

interface TTXScenario {
  id: string;
  title: string;
  type: 'crisis' | 'compliance' | 'technical' | 'strategic';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  participants: number;
  duration: number;
  aiAdaptation: boolean;
  crossFunctional: boolean;
  roles: string[];
  description: string;
  objectives: string[];
  status: 'active' | 'completed' | 'scheduled';
}

export default function AITTXSimulator() {
  const [currentScenario, setCurrentScenario] = useState<TTXScenario | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [participantResponses, setParticipantResponses] = useState<string[]>([]);
  const [aiAdaptationActive, setAiAdaptationActive] = useState(false);

  const scenarios: TTXScenario[] = [
    {
      id: "ttx-001",
      title: "Multi-Vector Ransomware Attack",
      type: "crisis",
      difficulty: "Expert",
      participants: 12,
      duration: 180,
      aiAdaptation: true,
      crossFunctional: true,
      roles: ["CISO", "CEO", "Legal", "HR", "IT", "Communications", "Operations"],
      description: "Sophisticated ransomware attack targeting multiple systems simultaneously with data exfiltration threat.",
      objectives: [
        "Coordinate immediate response across departments",
        "Make critical decisions under time pressure",
        "Manage stakeholder communication",
        "Implement business continuity measures"
      ],
      status: "active"
    },
    {
      id: "ttx-002",
      title: "Board-Level Data Breach Response",
      type: "strategic",
      difficulty: "Advanced",
      participants: 8,
      duration: 120,
      aiAdaptation: true,
      crossFunctional: true,
      roles: ["Board Members", "C-Suite", "Legal", "Communications", "External Counsel"],
      description: "High-profile data breach requiring board-level strategic decisions and public disclosure.",
      objectives: [
        "Navigate regulatory requirements",
        "Assess reputational risk",
        "Coordinate legal response",
        "Manage investor relations"
      ],
      status: "scheduled"
    },
    {
      id: "ttx-003",
      title: "Supply Chain Compromise",
      type: "technical",
      difficulty: "Advanced",
      participants: 15,
      duration: 150,
      aiAdaptation: true,
      crossFunctional: true,
      roles: ["IT Security", "Procurement", "Operations", "Legal", "Vendor Management"],
      description: "Third-party vendor compromise affecting multiple organizational systems and data flows.",
      objectives: [
        "Identify compromise scope",
        "Coordinate vendor response",
        "Implement containment measures",
        "Assess business impact"
      ],
      status: "completed"
    }
  ];

  const liveMetrics = {
    decisionAccuracy: 78,
    responseTime: 147,
    collaborationScore: 85,
    stressLevel: "Medium",
    adaptationTriggers: 3,
    expertInterventions: 2
  };

  const aiInsights = [
    {
      type: "adaptation",
      message: "AI detected slower response times from IT team. Adjusting scenario complexity.",
      timestamp: "09:15 AM"
    },
    {
      type: "performance",
      message: "Strong collaboration observed between Legal and Communications teams.",
      timestamp: "09:22 AM"
    },
    {
      type: "learning",
      message: "Identified knowledge gap in incident escalation procedures.",
      timestamp: "09:28 AM"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Adaptation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-sm opacity-90">Real-time scenario adjustment</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentScenario?.participants || 0}</div>
            <p className="text-sm opacity-90">Cross-functional teams</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Crisis Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <p className="text-sm opacity-90">Current scenario intensity</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentScenario?.objectives.length || 0}/4</div>
            <p className="text-sm opacity-90">Learning objectives met</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="live">Live Session</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Driven Tabletop Exercise Scenarios</CardTitle>
              <CardDescription>
                Dynamically adaptive scenarios with real-time complexity adjustment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{scenario.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={scenario.status === 'active' ? 'default' : 
                                      scenario.status === 'completed' ? 'secondary' : 'outline'}>
                          {scenario.status}
                        </Badge>
                        <Badge variant="outline">{scenario.difficulty}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{scenario.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{scenario.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{scenario.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">AI Adaptation: {scenario.aiAdaptation ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Participating Roles:</h4>
                      <div className="flex flex-wrap gap-2">
                        {scenario.roles.map((role, index) => (
                          <Badge key={index} variant="secondary">{role}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Learning Objectives:</h4>
                      <ul className="text-sm space-y-1">
                        {scenario.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setCurrentScenario(scenario)}
                        disabled={scenario.status === 'completed'}
                      >
                        {scenario.status === 'active' ? 'Join Session' : 'Start Scenario'}
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {scenario.status === 'completed' && (
                        <Button variant="outline">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          {currentScenario ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Live Session: {currentScenario.title}
                </CardTitle>
                <CardDescription>
                  AI-adaptive scenario with real-time complexity adjustment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Session Progress</h4>
                      <Progress value={sessionProgress} className="mb-2" />
                      <p className="text-sm text-gray-600">{sessionProgress}% complete</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Team Performance</h4>
                      <div className="text-2xl font-bold text-green-600">
                        {liveMetrics.collaborationScore}%
                      </div>
                      <p className="text-sm text-gray-600">Collaboration score</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">AI Adaptations</h4>
                      <div className="text-2xl font-bold text-orange-600">
                        {liveMetrics.adaptationTriggers}
                      </div>
                      <p className="text-sm text-gray-600">Scenario adjustments</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <h4 className="font-bold text-red-800 mb-2">Current Crisis Situation</h4>
                    <p className="text-red-700">
                      ALERT: Multiple systems have been compromised. Ransomware detected across 
                      production environments. Customer data integrity unknown. Media inquiries 
                      beginning. Board meeting scheduled in 2 hours.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3">Active Participants</h4>
                      <div className="space-y-2">
                        {currentScenario.roles.map((role, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{role}</span>
                            <Badge variant="outline">Online</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Recent Decisions</h4>
                      <div className="space-y-2">
                        <div className="p-2 bg-blue-50 rounded">
                          <div className="text-sm font-medium">Isolate affected systems</div>
                          <div className="text-xs text-gray-600">Approved by IT Team</div>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded">
                          <div className="text-sm font-medium">Notify legal counsel</div>
                          <div className="text-xs text-gray-600">Pending CEO approval</div>
                        </div>
                        <div className="p-2 bg-green-50 rounded">
                          <div className="text-sm font-medium">Activate backup systems</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No Active Session</h3>
                <p className="text-gray-600 mb-4">Select a scenario to begin a tabletop exercise</p>
                <Button onClick={() => setCurrentScenario(scenarios[0])}>
                  Start Sample Scenario
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post-Exercise Analytics</CardTitle>
              <CardDescription>
                Comprehensive performance analysis and improvement recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Decision Accuracy</span>
                      <div className="flex items-center gap-2">
                        <Progress value={liveMetrics.decisionAccuracy} className="w-20" />
                        <span className="text-sm font-medium">{liveMetrics.decisionAccuracy}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm font-medium">{liveMetrics.responseTime}s avg</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Team Collaboration</span>
                      <div className="flex items-center gap-2">
                        <Progress value={liveMetrics.collaborationScore} className="w-20" />
                        <span className="text-sm font-medium">{liveMetrics.collaborationScore}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Stress Management</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{liveMetrics.stressLevel}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Improvement Areas</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800">Communication Gaps</div>
                      <div className="text-sm text-red-700">
                        Delays observed in cross-team information sharing
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800">Decision Making</div>
                      <div className="text-sm text-yellow-700">
                        Consider implementing clearer escalation procedures
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">Technical Response</div>
                      <div className="text-sm text-green-700">
                        Excellent technical containment procedures
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Cross-Functional Collaboration
              </CardTitle>
              <CardDescription>
                Real-time collaboration tools and expert facilitation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Communication Channels</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Emergency Chat: 12 messages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Video Conference: Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Shared Documents: 3 active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Expert Facilitation</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Incident Response Expert</span>
                        <Badge variant="default">Available</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Legal Counsel</span>
                        <Badge variant="default">In Session</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Communications Specialist</span>
                        <Badge variant="secondary">On Call</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Role-Based Perspectives</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="font-medium text-blue-800">Technical Team</div>
                      <div className="text-sm text-blue-700">
                        Focus: System isolation and forensics
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800">Legal Team</div>
                      <div className="text-sm text-green-700">
                        Focus: Regulatory compliance and liability
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="font-medium text-purple-800">Executive Team</div>
                      <div className="text-sm text-purple-700">
                        Focus: Strategic decisions and communications
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>
                Real-time analysis and adaptive recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{insight.type}</Badge>
                          <span className="text-sm text-gray-500">{insight.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">AI Recommendations</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Increase scenario complexity for experienced participants</li>
                  <li>• Introduce additional communication challenges</li>
                  <li>• Focus on legal compliance decision-making</li>
                  <li>• Schedule follow-up training on incident escalation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}