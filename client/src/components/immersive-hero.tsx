import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Users, 
  Target,
  Globe,
  Lock,
  Eye,
  MousePointer,
  Cpu,
  Network,
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
  Settings,
  Maximize2,
  Activity
} from "lucide-react";

interface HeroSectionProps {
  onShowDemo: () => void;
}

interface CyberThreat {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  type: 'malware' | 'phishing' | 'ransomware' | 'insider';
  severity: 'low' | 'medium' | 'high' | 'critical';
  active: boolean;
  description: string;
}

interface SecurityNode {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  type: 'firewall' | 'endpoint' | 'server' | 'user';
  status: 'secure' | 'warning' | 'compromised';
  connections: string[];
}

export default function ImmersiveHero({ onShowDemo }: HeroSectionProps) {
  const [isActive, setIsActive] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<CyberThreat | null>(null);
  const [selectedNode, setSelectedNode] = useState<SecurityNode | null>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [detectedThreats, setDetectedThreats] = useState<string[]>([]);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const scenarios = [
    {
      name: "Phishing Attack Chain",
      description: "Watch how a phishing email can compromise an entire network",
      duration: "2 min",
      complexity: "Advanced"
    },
    {
      name: "Ransomware Propagation",
      description: "See how ransomware spreads through lateral movement",
      duration: "3 min",
      complexity: "Expert"
    },
    {
      name: "Insider Threat Detection",
      description: "Identify suspicious behavior patterns in real-time",
      duration: "2.5 min",
      complexity: "Intermediate"
    },
    {
      name: "Zero-Day Exploit",
      description: "Advanced persistent threat (APT) simulation",
      duration: "4 min",
      complexity: "Expert"
    }
  ];

  const threats: CyberThreat[] = [
    {
      id: 'phishing-1',
      name: 'Spear Phishing',
      position: { x: 10, y: 15, z: 5 },
      type: 'phishing',
      severity: 'high',
      active: true,
      description: 'Targeted phishing attempt from CEO impersonator'
    },
    {
      id: 'malware-1',
      name: 'Trojan',
      position: { x: 25, y: 30, z: 8 },
      type: 'malware',
      severity: 'critical',
      active: simulationRunning,
      description: 'Banking trojan with keylogger capabilities'
    },
    {
      id: 'ransomware-1',
      name: 'Crypto Locker',
      position: { x: 40, y: 20, z: 12 },
      type: 'ransomware',
      severity: 'critical',
      active: false,
      description: 'File encryption ransomware spreading laterally'
    },
    {
      id: 'insider-1',
      name: 'Privilege Escalation',
      position: { x: 55, y: 35, z: 6 },
      type: 'insider',
      severity: 'medium',
      active: false,
      description: 'Unauthorized access to sensitive systems'
    }
  ];

  const securityNodes: SecurityNode[] = [
    {
      id: 'firewall-1',
      name: 'Perimeter Firewall',
      position: { x: 15, y: 50, z: 10 },
      type: 'firewall',
      status: 'secure',
      connections: ['endpoint-1', 'server-1']
    },
    {
      id: 'endpoint-1',
      name: 'Employee Workstation',
      position: { x: 30, y: 25, z: 7 },
      type: 'endpoint',
      status: selectedThreat?.type === 'phishing' ? 'compromised' : 'secure',
      connections: ['server-1', 'user-1']
    },
    {
      id: 'server-1',
      name: 'Application Server',
      position: { x: 45, y: 40, z: 15 },
      type: 'server',
      status: simulationRunning ? 'warning' : 'secure',
      connections: ['firewall-1', 'endpoint-1']
    },
    {
      id: 'user-1',
      name: 'User Account',
      position: { x: 20, y: 35, z: 5 },
      type: 'user',
      status: 'secure',
      connections: ['endpoint-1']
    }
  ];

  const getThreatColor = (threat: CyberThreat) => {
    if (!threat.active) return 'rgba(156, 163, 175, 0.5)';
    switch (threat.severity) {
      case 'critical': return 'rgba(239, 68, 68, 0.8)';
      case 'high': return 'rgba(249, 115, 22, 0.8)';
      case 'medium': return 'rgba(245, 158, 11, 0.8)';
      case 'low': return 'rgba(34, 197, 94, 0.8)';
      default: return 'rgba(156, 163, 175, 0.5)';
    }
  };

  const getNodeColor = (node: SecurityNode) => {
    switch (node.status) {
      case 'secure': return 'rgba(34, 197, 94, 0.8)';
      case 'warning': return 'rgba(245, 158, 11, 0.8)';
      case 'compromised': return 'rgba(239, 68, 68, 0.8)';
      default: return 'rgba(156, 163, 175, 0.5)';
    }
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setDetectedThreats([]);
    
    // Simulate threat detection over time
    const detectionSequence = [
      { delay: 1000, threat: 'phishing-1' },
      { delay: 2500, threat: 'malware-1' },
      { delay: 4000, threat: 'ransomware-1' },
      { delay: 5500, threat: 'insider-1' }
    ];

    detectionSequence.forEach(({ delay, threat }) => {
      setTimeout(() => {
        setDetectedThreats(prev => [...prev, threat]);
      }, delay);
    });

    // Auto-stop simulation after 8 seconds
    setTimeout(() => {
      setSimulationRunning(false);
    }, 8000);
  };

  const handleThreatClick = (threat: CyberThreat) => {
    setSelectedThreat(threat);
    setSelectedNode(null);
  };

  const handleNodeClick = (node: SecurityNode) => {
    setSelectedNode(node);
    setSelectedThreat(null);
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Digital Matrix Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 128, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 128, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
          animation: 'matrix-scan 12s linear infinite'
        }} />
      </div>
      
      {/* Digital Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Binary Rain */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`binary-${i}`}
            className="absolute text-green-400 opacity-20 font-mono text-sm"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animation: `digital-rain ${6 + Math.random() * 8}s linear infinite`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
        
        {/* Circuit Lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`circuit-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-25"
            style={{
              height: '1px',
              width: `${30 + Math.random() * 40}%`,
              left: `${Math.random() * 60}%`,
              top: `${20 + (i * 15)}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `circuit-pulse ${2 + Math.random() * 3}s ease-in-out infinite`
            }}
          />
        ))}
        
        {/* Hexagonal Tech Pattern */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`hex-${i}`}
            className="absolute border border-blue-400 opacity-10"
            style={{
              width: '20px',
              height: '20px',
              left: `${10 + (i * 12)}%`,
              top: `${10 + Math.random() * 80}%`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              animationDelay: `${Math.random() * 5}s`,
              animation: `hex-glow ${3 + Math.random() * 4}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* 3D Cyber Environment */}
      <div className="absolute inset-0 perspective-1000">
        <div className={`relative w-full h-full transition-transform duration-1000 ${isActive ? 'transform-gpu' : ''}`}>
          
          {/* Security Nodes */}
          {securityNodes.map((node) => (
            <div
              key={node.id}
              className={`absolute cursor-pointer transition-all duration-500 ${
                hoveredElement === node.id ? 'scale-125' : 'scale-100'
              }`}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                transform: `translateZ(${node.position.z}px)`,
                filter: `drop-shadow(0 0 20px ${getNodeColor(node)})`
              }}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredElement(node.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div 
                className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
                style={{
                  backgroundColor: getNodeColor(node),
                  borderColor: getNodeColor(node),
                  boxShadow: `0 0 30px ${getNodeColor(node)}`
                }}
              >
                {node.type === 'firewall' && <Shield className="w-8 h-8 text-white" />}
                {node.type === 'endpoint' && <Cpu className="w-8 h-8 text-white" />}
                {node.type === 'server' && <Network className="w-8 h-8 text-white" />}
                {node.type === 'user' && <Users className="w-8 h-8 text-white" />}
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white text-center whitespace-nowrap">
                {node.name}
              </div>
            </div>
          ))}

          {/* Cyber Threats */}
          {threats.map((threat) => (
            <div
              key={threat.id}
              className={`absolute cursor-pointer transition-all duration-500 ${
                threat.active ? 'animate-pulse' : 'opacity-50'
              } ${hoveredElement === threat.id ? 'scale-125' : 'scale-100'} hidden md:block`}
              style={{
                left: `${threat.position.x}%`,
                top: `${threat.position.y}%`,
                transform: `translateZ(${threat.position.z}px)`,
                filter: `drop-shadow(0 0 15px ${getThreatColor(threat)})`
              }}
              onClick={() => handleThreatClick(threat)}
              onMouseEnter={() => setHoveredElement(threat.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div 
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                style={{
                  backgroundColor: getThreatColor(threat),
                  borderColor: getThreatColor(threat),
                  boxShadow: `0 0 20px ${getThreatColor(threat)}`
                }}
              >
                {threat.type === 'phishing' && <Target className="w-6 h-6 text-white" />}
                {threat.type === 'malware' && <AlertTriangle className="w-6 h-6 text-white" />}
                {threat.type === 'ransomware' && <Lock className="w-6 h-6 text-white" />}
                {threat.type === 'insider' && <Eye className="w-6 h-6 text-white" />}
              </div>
              {detectedThreats.includes(threat.id) && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-60" />
              )}
            </div>
          ))}

          {/* Connection Lines */}
          {securityNodes.map((node) => 
            node.connections.map((connectionId) => {
              const connectedNode = securityNodes.find(n => n.id === connectionId);
              if (!connectedNode) return null;
              
              const isCompromised = node.status === 'compromised' || connectedNode.status === 'compromised';
              
              return (
                <svg
                  key={`${node.id}-${connectionId}`}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: -1 }}
                >
                  <line
                    x1={`${node.position.x}%`}
                    y1={`${node.position.y}%`}
                    x2={`${connectedNode.position.x}%`}
                    y2={`${connectedNode.position.y}%`}
                    stroke={isCompromised ? 'rgba(239, 68, 68, 0.6)' : 'rgba(59, 130, 246, 0.4)'}
                    strokeWidth="2"
                    strokeDasharray={isCompromised ? '5,5' : '0'}
                    className={isCompromised ? 'animate-pulse' : ''}
                  />
                </svg>
              );
            })
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Badge variant="outline" className="mb-6 bg-green-500/20 border-green-400 text-green-200 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Next-Generation Cybersecurity Training
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Immersive Cyber Defense
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto px-4 text-shadow-strong">
              Experience cybersecurity like never before. Step into a 3D virtual environment where you'll face real-world threats, 
              make critical decisions, and learn through interactive simulations that adapt to your responses.
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-col gap-4 items-center justify-center mb-8 px-4 relative z-20">
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Button 
                onClick={startSimulation}
                disabled={simulationRunning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex-1 relative z-30 backdrop-blur-sm border border-blue-500/30"
              >
                {simulationRunning ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    <span className="hidden sm:inline">Simulation Running</span>
                    <span className="sm:hidden">Running</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Start Threat Simulation</span>
                    <span className="sm:hidden">Start Simulation</span>
                  </>
                )}
              </Button>
              <Button 
                onClick={onShowDemo}
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex-1 relative z-30 backdrop-blur-sm bg-black/20"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Enter Virtual World</span>
                <span className="sm:hidden">Virtual World</span>
              </Button>
            </div>
          </div>

          {/* Scenario Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4 relative z-20">
            {scenarios.map((scenario, index) => (
              <Card 
                key={index} 
                className={`bg-black/60 backdrop-blur-md border-white/30 hover:bg-black/70 transition-all duration-300 cursor-pointer ${
                  currentScenario === index ? 'ring-2 ring-green-400' : ''
                }`}
                onClick={() => setCurrentScenario(index)}
              >
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{scenario.name}</h3>
                  <p className="text-gray-200 text-xs sm:text-sm mb-4 leading-relaxed">{scenario.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs border-gray-400 text-gray-200 bg-black/30">
                      {scenario.duration}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs bg-black/30 ${
                        scenario.complexity === 'Expert' ? 'border-red-400 text-red-300' :
                        scenario.complexity === 'Advanced' ? 'border-orange-400 text-orange-300' :
                        'border-green-400 text-green-300'
                      }`}
                    >
                      {scenario.complexity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Real-time Threat Panel */}
          {(selectedThreat || selectedNode) && (
            <Card className="bg-black/70 backdrop-blur-md border-gray-500 max-w-2xl mx-auto relative z-20">
              <CardContent className="p-4 sm:p-6">
                {selectedThreat && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getThreatColor(selectedThreat) }}
                      >
                        {selectedThreat.type === 'phishing' && <Target className="w-4 h-4 text-white" />}
                        {selectedThreat.type === 'malware' && <AlertTriangle className="w-4 h-4 text-white" />}
                        {selectedThreat.type === 'ransomware' && <Lock className="w-4 h-4 text-white" />}
                        {selectedThreat.type === 'insider' && <Eye className="w-4 h-4 text-white" />}
                      </div>
                      <h3 className="text-xl font-bold text-white">{selectedThreat.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${
                          selectedThreat.severity === 'critical' ? 'border-red-500 text-red-400' :
                          selectedThreat.severity === 'high' ? 'border-orange-500 text-orange-400' :
                          selectedThreat.severity === 'medium' ? 'border-yellow-500 text-yellow-400' :
                          'border-green-500 text-green-400'
                        }`}
                      >
                        {selectedThreat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4">{selectedThreat.description}</p>
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        Contain
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                        Eliminate
                      </Button>
                    </div>
                  </div>
                )}
                
                {selectedNode && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getNodeColor(selectedNode) }}
                      >
                        {selectedNode.type === 'firewall' && <Shield className="w-4 h-4 text-white" />}
                        {selectedNode.type === 'endpoint' && <Cpu className="w-4 h-4 text-white" />}
                        {selectedNode.type === 'server' && <Network className="w-4 h-4 text-white" />}
                        {selectedNode.type === 'user' && <Users className="w-4 h-4 text-white" />}
                      </div>
                      <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${
                          selectedNode.status === 'compromised' ? 'border-red-500 text-red-400' :
                          selectedNode.status === 'warning' ? 'border-yellow-500 text-yellow-400' :
                          'border-green-500 text-green-400'
                        }`}
                      >
                        {selectedNode.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Connected to: {selectedNode.connections.join(', ')}
                    </p>
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-500 text-green-400">
                        Secure
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 px-4 sm:px-6">
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">
                {detectedThreats.length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Threats Detected</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                {securityNodes.filter(n => n.status === 'secure').length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Secure Nodes</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-2">
                {securityNodes.filter(n => n.status === 'warning').length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Warnings</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">
                {securityNodes.filter(n => n.status === 'compromised').length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm px-2">Compromised</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform: rotateX(10deg) rotateY(5deg);
        }
      `}</style>
    </div>
  );
}