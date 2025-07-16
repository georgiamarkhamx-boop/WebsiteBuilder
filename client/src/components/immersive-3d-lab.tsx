import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Monitor, 
  Server, 
  Shield, 
  Zap, 
  Settings, 
  Eye, 
  Play, 
  Pause, 
  RotateCcw,
  Maximize2,
  Volume2,
  VolumeX,
  Camera,
  Layers,
  Cpu,
  Database,
  Network,
  Code,
  Terminal,
  Lock,
  AlertTriangle,
  CheckCircle2,
  X,
  Target
} from "lucide-react";

interface Immersive3DLabProps {
  courseId: number;
  courseTitle: string;
  labType: 'cyber_command' | 'tech_stack' | 'ai_workspace' | 'security_ops';
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface LabEnvironment {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: number;
  objectives: string[];
  tools: string[];
  scenarios: LabScenario[];
}

interface LabScenario {
  id: string;
  title: string;
  description: string;
  type: 'investigation' | 'prevention' | 'response' | 'analysis';
  points: number;
  completed: boolean;
  tasks: LabTask[];
}

interface LabTask {
  id: string;
  instruction: string;
  type: 'click' | 'configure' | 'analyze' | 'deploy';
  target: string;
  completed: boolean;
  points: number;
}

export default function Immersive3DLab({
  courseId,
  courseTitle,
  labType,
  onComplete,
  onClose
}: Immersive3DLabProps) {
  const [currentView, setCurrentView] = useState<'overview' | 'environment' | 'scenario'>('overview');
  const [selectedScenario, setSelectedScenario] = useState<LabScenario | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [environmentData, setEnvironmentData] = useState<LabEnvironment | null>(null);

  useEffect(() => {
    // Initialize lab environment based on course type
    const initializeEnvironment = () => {
      const environments: Record<string, LabEnvironment> = {
        cyber_command: {
          id: 'cyber_command_center',
          name: 'Cybersecurity Command Center',
          description: 'Immersive 3D security operations center with real-time threat monitoring and incident response capabilities.',
          difficulty: 'Advanced',
          duration: 120,
          objectives: [
            'Monitor security dashboards for threats',
            'Investigate suspicious network activity',
            'Coordinate incident response procedures',
            'Implement security countermeasures'
          ],
          tools: ['SIEM Dashboard', 'Network Monitor', 'Threat Intelligence', 'Incident Response', 'Forensics Toolkit'],
          scenarios: [
            {
              id: 'scenario_1',
              title: 'Advanced Persistent Threat Detection',
              description: 'Detect and respond to a sophisticated APT attack targeting your organization.',
              type: 'investigation',
              points: 250,
              completed: false,
              tasks: [
                {
                  id: 'task_1',
                  instruction: 'Review SIEM alerts for unusual network patterns',
                  type: 'analyze',
                  target: 'siem_dashboard',
                  completed: false,
                  points: 50
                },
                {
                  id: 'task_2',
                  instruction: 'Isolate affected systems using network segmentation',
                  type: 'configure',
                  target: 'network_controls',
                  completed: false,
                  points: 75
                },
                {
                  id: 'task_3',
                  instruction: 'Deploy threat hunting tools to find persistence mechanisms',
                  type: 'deploy',
                  target: 'threat_hunting',
                  completed: false,
                  points: 100
                }
              ]
            }
          ]
        },
        tech_stack: {
          id: 'tech_stack_builder',
          name: 'Interactive Tech Stack Laboratory',
          description: 'Build and configure modern technology stacks with cloud infrastructure and microservices.',
          difficulty: 'Intermediate',
          duration: 90,
          objectives: [
            'Design scalable cloud architecture',
            'Configure CI/CD pipelines',
            'Implement monitoring and logging',
            'Optimize performance and security'
          ],
          tools: ['Cloud Console', 'Container Registry', 'Pipeline Builder', 'Monitoring Suite', 'Security Scanner'],
          scenarios: [
            {
              id: 'scenario_1',
              title: 'Full-Stack Application Deployment',
              description: 'Deploy a complete web application with database, API, and frontend components.',
              type: 'deployment',
              points: 300,
              completed: false,
              tasks: [
                {
                  id: 'task_1',
                  instruction: 'Configure cloud infrastructure using Infrastructure as Code',
                  type: 'configure',
                  target: 'cloud_console',
                  completed: false,
                  points: 100
                },
                {
                  id: 'task_2',
                  instruction: 'Set up automated deployment pipeline',
                  type: 'deploy',
                  target: 'pipeline_builder',
                  completed: false,
                  points: 100
                }
              ]
            }
          ]
        },
        ai_workspace: {
          id: 'ai_business_lab',
          name: 'AI Business Innovation Lab',
          description: 'Explore AI tools and automation solutions for business growth and productivity enhancement.',
          difficulty: 'Beginner',
          duration: 60,
          objectives: [
            'Implement AI-powered automation',
            'Analyze business data with ML models',
            'Create intelligent chatbots and assistants',
            'Optimize marketing with AI insights'
          ],
          tools: ['AI Assistant Builder', 'Data Analytics', 'Automation Studio', 'ML Model Trainer', 'Business Intelligence'],
          scenarios: [
            {
              id: 'scenario_1',
              title: 'Customer Service Automation',
              description: 'Build an AI-powered customer service solution with natural language processing.',
              type: 'automation',
              points: 200,
              completed: false,
              tasks: [
                {
                  id: 'task_1',
                  instruction: 'Train AI model on customer service conversations',
                  type: 'configure',
                  target: 'ml_trainer',
                  completed: false,
                  points: 75
                }
              ]
            }
          ]
        }
      };

      setEnvironmentData(environments[labType] || environments.cyber_command);
    };

    initializeEnvironment();
  }, [labType]);

  const handleTaskComplete = (taskId: string, scenarioId: string) => {
    if (!environmentData) return;

    const updatedEnvironment = { ...environmentData };
    const scenario = updatedEnvironment.scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      const task = scenario.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = true;
        setProgress(prev => prev + (task.points / 1000) * 100);
      }
    }
    setEnvironmentData(updatedEnvironment);
  };

  const renderEnvironmentView = () => {
    if (!environmentData) return null;

    return (
      <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-lg overflow-hidden relative">
        {/* 3D Environment Simulation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20">
          <div className="grid grid-cols-3 grid-rows-3 h-full gap-2 p-4">
            {/* Main Command Center */}
            <div className="col-span-2 row-span-2 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-400/30 p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Monitor className="w-5 h-5 mr-2 text-blue-400" />
                  Primary Command Console
                </h3>
                <div className="grid grid-cols-2 gap-4 h-32">
                  <div className="bg-green-500/20 rounded p-3">
                    <div className="text-green-400 text-xs mb-2">SYSTEM STATUS</div>
                    <div className="text-green-300 text-lg font-mono">SECURE</div>
                  </div>
                  <div className="bg-yellow-500/20 rounded p-3">
                    <div className="text-yellow-400 text-xs mb-2">ALERTS</div>
                    <div className="text-yellow-300 text-lg font-mono">3 PENDING</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Panels */}
            <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg border border-purple-400/30 p-3">
              <Server className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-white text-sm">Server Farm</div>
              <div className="text-purple-300 text-xs">24 Active</div>
            </div>

            <div className="bg-red-900/30 backdrop-blur-sm rounded-lg border border-red-400/30 p-3">
              <Shield className="w-8 h-8 text-red-400 mb-2" />
              <div className="text-white text-sm">Firewall</div>
              <div className="text-red-300 text-xs">Protected</div>
            </div>

            <div className="col-span-2 bg-cyan-900/30 backdrop-blur-sm rounded-lg border border-cyan-400/30 p-3">
              <Network className="w-6 h-6 text-cyan-400 mb-2" />
              <div className="text-white text-sm mb-2">Network Traffic</div>
              <div className="flex space-x-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`h-8 w-3 bg-cyan-400 rounded-sm opacity-${Math.random() > 0.5 ? '70' : '30'}`}></div>
                ))}
              </div>
            </div>

            <div className="bg-orange-900/30 backdrop-blur-sm rounded-lg border border-orange-400/30 p-3">
              <Database className="w-8 h-8 text-orange-400 mb-2" />
              <div className="text-white text-sm">Database</div>
              <div className="text-orange-300 text-xs">Synced</div>
            </div>
          </div>
        </div>

        {/* Floating Action Tools */}
        <div className="absolute bottom-6 left-6 flex space-x-3">
          {environmentData.tools.map((tool, index) => (
            <Button
              key={tool}
              variant={activeTools.includes(tool) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (activeTools.includes(tool)) {
                  setActiveTools(prev => prev.filter(t => t !== tool));
                } else {
                  setActiveTools(prev => [...prev, tool]);
                }
              }}
              className="text-xs bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              {index === 0 && <Monitor className="w-3 h-3 mr-1" />}
              {index === 1 && <Shield className="w-3 h-3 mr-1" />}
              {index === 2 && <Zap className="w-3 h-3 mr-1" />}
              {index === 3 && <Settings className="w-3 h-3 mr-1" />}
              {index === 4 && <Eye className="w-3 h-3 mr-1" />}
              {tool}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderScenarioView = () => {
    if (!selectedScenario) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h3>
            <p className="text-gray-600">{selectedScenario.description}</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {selectedScenario.points} Points
          </Badge>
        </div>

        <div className="grid gap-4">
          {selectedScenario.tasks.map((task) => (
            <Card key={task.id} className={`transition-all ${task.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      task.completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{task.instruction}</p>
                      <p className="text-sm text-gray-500">Target: {task.target}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">{task.points} pts</Badge>
                    {!task.completed && (
                      <Button
                        size="sm"
                        onClick={() => handleTaskComplete(task.id, selectedScenario.id)}
                      >
                        Complete Task
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  if (!environmentData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-slate-100 to-blue-50`}>
      <div className="h-full flex flex-col">
        {/* Header Controls */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4 mr-2" />
                Exit Lab
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">
                {environmentData.name}
              </h1>
              <Badge variant="outline">{environmentData.difficulty}</Badge>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Progress:</span>
                <div className="w-32">
                  <Progress value={progress} className="h-2" />
                </div>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-4">
            {(['overview', 'environment', 'scenario'] as const).map((view) => (
              <Button
                key={view}
                variant={currentView === view ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView(view)}
                className="capitalize"
              >
                {view === 'overview' && <Layers className="w-4 h-4 mr-2" />}
                {view === 'environment' && <Monitor className="w-4 h-4 mr-2" />}
                {view === 'scenario' && <Target className="w-4 h-4 mr-2" />}
                {view}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {currentView === 'overview' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lab Overview</CardTitle>
                  <CardDescription>{environmentData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Learning Objectives</h4>
                      <ul className="space-y-2">
                        {environmentData.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Available Scenarios</h4>
                      <div className="space-y-3">
                        {environmentData.scenarios.map((scenario) => (
                          <Card key={scenario.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">{scenario.title}</h5>
                                  <p className="text-sm text-gray-600">{scenario.description}</p>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedScenario(scenario);
                                    setCurrentView('scenario');
                                  }}
                                >
                                  Start
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentView === 'environment' && (
            <div className="h-full">
              {renderEnvironmentView()}
            </div>
          )}

          {currentView === 'scenario' && renderScenarioView()}
        </div>
      </div>
    </div>
  );
}