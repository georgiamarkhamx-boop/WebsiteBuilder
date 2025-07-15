import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Monitor, 
  Wifi, 
  Lock,
  Unlock,
  Eye,
  EyeOff,
  FileText,
  HardDrive,
  Smartphone,
  Router,
  Camera,
  Printer,
  User,
  Users,
  Building,
  Car,
  Zap,
  X,
  Target,
  Search,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Award,
  Lightbulb
} from "lucide-react";

interface SecurityRisk {
  id: string;
  name: string;
  type: 'physical' | 'digital' | 'social' | 'environmental';
  severity: 'low' | 'medium' | 'high' | 'critical';
  position: { x: number; y: number; z: number };
  description: string;
  mitigation: string;
  found: boolean;
  hint: string;
  category: 'endpoint' | 'network' | 'access' | 'data' | 'behavior';
}

interface LabEnvironment {
  id: string;
  name: string;
  type: 'office' | 'datacenter' | 'home' | 'factory' | 'hospital';
  description: string;
  objectives: string[];
  risks: SecurityRisk[];
  timeLimit: number;
  passingScore: number;
}

interface InteractiveLabProps {
  courseId: number;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function InteractiveLab({ courseId, onComplete, onClose }: InteractiveLabProps) {
  const [currentEnvironment, setCurrentEnvironment] = useState<LabEnvironment | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<SecurityRisk | null>(null);
  const [foundRisks, setFoundRisks] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [labActive, setLabActive] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [cameraAngle, setCameraAngle] = useState({ x: 0, y: 0, z: 0 });

  const getLabEnvironmentForCourse = (courseId: number): LabEnvironment => {
    switch (courseId) {
      case 1: // Cyber Basics
        return {
          id: 'office-basics',
          name: 'Office Security Basics',
          type: 'office',
          description: 'Learn fundamental security concepts in a typical office environment.',
          objectives: [
            'Identify password security issues',
            'Find physical access vulnerabilities',
            'Spot basic social engineering risks',
            'Locate unsecured devices',
            'Assess clean desk violations'
          ],
          timeLimit: 480, // 8 minutes
          passingScore: 70,
          risks: [
        {
          id: 'unlocked-workstation',
          name: 'Unlocked Workstation',
          type: 'physical',
          severity: 'high',
          position: { x: 25, y: 30, z: 5 },
          description: 'Employee workstation left unlocked and unattended',
          mitigation: 'Implement auto-lock policies and user awareness training',
          found: false,
          hint: 'Look for computers with active screens but no users present',
          category: 'access'
        },
        {
          id: 'visible-passwords',
          name: 'Password Sticky Notes',
          type: 'physical',
          severity: 'critical',
          position: { x: 15, y: 25, z: 3 },
          description: 'Passwords written on sticky notes attached to monitors',
          mitigation: 'Password manager deployment and security awareness training',
          found: false,
          hint: 'Check around monitors and keyboards for notes',
          category: 'access'
        },
        {
          id: 'unsecured-documents',
          name: 'Confidential Documents',
          type: 'physical',
          severity: 'medium',
          position: { x: 45, y: 15, z: 2 },
          description: 'Sensitive documents left on printer or desk',
          mitigation: 'Clean desk policy and secure document handling procedures',
          found: false,
          hint: 'Look for papers left unattended in common areas',
          category: 'data'
        },
        {
          id: 'unsecured-wifi',
          name: 'Open WiFi Network',
          type: 'digital',
          severity: 'high',
          position: { x: 60, y: 40, z: 8 },
          description: 'Unsecured wireless access point broadcasting openly',
          mitigation: 'Implement WPA3 encryption and network segmentation',
          found: false,
          hint: 'Check for wireless signals and network equipment',
          category: 'network'
        },
        {
          id: 'usb-device',
          name: 'Unknown USB Device',
          type: 'physical',
          severity: 'high',
          position: { x: 35, y: 50, z: 4 },
          description: 'Suspicious USB device plugged into workstation',
          mitigation: 'USB port controls and endpoint protection',
          found: false,
          hint: 'Look for unexpected devices connected to computers',
          category: 'endpoint'
        },
        {
          id: 'tailgating-risk',
          name: 'Propped Door',
          type: 'physical',
          severity: 'medium',
          position: { x: 5, y: 60, z: 6 },
          description: 'Secure door propped open for convenience',
          mitigation: 'Access control training and physical security enforcement',
          found: false,
          hint: 'Check entry points and security doors',
          category: 'access'
        },
        {
          id: 'camera-blindspot',
          name: 'Security Camera Blind Spot',
          type: 'physical',
          severity: 'medium',
          position: { x: 70, y: 20, z: 7 },
          description: 'Area not covered by security cameras',
          mitigation: 'Camera placement review and coverage analysis',
          found: false,
          hint: 'Look for areas without camera coverage',
          category: 'access'
        },
        {
          id: 'shoulder-surfing',
          name: 'Shoulder Surfing Opportunity',
          type: 'social',
          severity: 'medium',
          position: { x: 40, y: 35, z: 4 },
          description: 'Workstation visible from public walkway',
          mitigation: 'Privacy screens and workstation positioning',
          found: false,
          hint: 'Look for screens visible from common areas',
          category: 'behavior'
        }
      ]
    };
    
    case 2: // Phishing Awareness
      return {
        id: 'phishing-office',
        name: 'Email Security Workspace',
        type: 'office',
        description: 'Identify phishing attempts and email security risks in a modern office.',
        objectives: [
          'Spot suspicious emails on screens',
          'Find QR code phishing attempts',
          'Identify credential harvesting risks',
          'Locate email security violations',
          'Assess communication security'
        ],
        timeLimit: 420, // 7 minutes
        passingScore: 75,
        risks: [
          {
            id: 'phishing-email',
            name: 'Phishing Email on Screen',
            type: 'digital',
            severity: 'high',
            position: { x: 30, y: 25, z: 5 },
            description: 'Suspicious email asking for login credentials visible on workstation',
            mitigation: 'Email security training and phishing simulation programs',
            found: false,
            hint: 'Look for emails requesting personal information or urgent actions',
            category: 'behavior'
          },
          {
            id: 'qr-phishing',
            name: 'Malicious QR Code',
            type: 'physical',
            severity: 'medium',
            position: { x: 50, y: 40, z: 3 },
            description: 'QR code posted on bulletin board leading to credential harvesting site',
            mitigation: 'QR code security awareness and URL verification',
            found: false,
            hint: 'Check posters and notices for suspicious QR codes',
            category: 'behavior'
          },
          {
            id: 'email-forwarding',
            name: 'Auto-forwarding Rule',
            type: 'digital',
            severity: 'critical',
            position: { x: 25, y: 35, z: 6 },
            description: 'Email client configured to forward emails to external address',
            mitigation: 'Email security policies and regular account audits',
            found: false,
            hint: 'Look for email client settings and forwarding rules',
            category: 'data'
          },
          {
            id: 'credential-sharing',
            name: 'Shared Login Credentials',
            type: 'physical',
            severity: 'high',
            position: { x: 45, y: 55, z: 4 },
            description: 'Multiple employees sharing login credentials for efficiency',
            mitigation: 'Individual account policies and access management',
            found: false,
            hint: 'Look for signs of account sharing or group logins',
            category: 'access'
          }
        ]
      };
      
    case 3: // Password Security
      return {
        id: 'password-office',
        name: 'Password Security Environment',
        type: 'office',
        description: 'Discover password vulnerabilities and authentication weaknesses.',
        objectives: [
          'Find weak password practices',
          'Identify credential exposure',
          'Spot authentication bypasses',
          'Locate password storage issues',
          'Assess MFA implementation gaps'
        ],
        timeLimit: 360, // 6 minutes
        passingScore: 80,
        risks: [
          {
            id: 'weak-passwords',
            name: 'Weak Password Policy',
            type: 'digital',
            severity: 'high',
            position: { x: 35, y: 30, z: 5 },
            description: 'System allowing simple passwords like "password123"',
            mitigation: 'Strong password policies and complexity requirements',
            found: false,
            hint: 'Check password requirements and system settings',
            category: 'access'
          },
          {
            id: 'password-reuse',
            name: 'Password Reuse Pattern',
            type: 'digital',
            severity: 'medium',
            position: { x: 55, y: 45, z: 4 },
            description: 'User using same password across multiple systems',
            mitigation: 'Password manager deployment and unique password requirements',
            found: false,
            hint: 'Look for patterns in login screens and saved passwords',
            category: 'access'
          },
          {
            id: 'no-mfa',
            name: 'Missing Multi-Factor Authentication',
            type: 'digital',
            severity: 'critical',
            position: { x: 40, y: 20, z: 6 },
            description: 'Critical systems without MFA protection',
            mitigation: 'MFA implementation and enforcement policies',
            found: false,
            hint: 'Check login screens for MFA prompts',
            category: 'access'
          }
        ]
      };
      
    case 4: // Data Protection
      return {
        id: 'data-office',
        name: 'Data Protection Workspace',
        type: 'office',
        description: 'Identify data handling violations and information security risks.',
        objectives: [
          'Find data classification violations',
          'Spot unsecured sensitive data',
          'Identify data transmission risks',
          'Locate backup vulnerabilities',
          'Assess data retention issues'
        ],
        timeLimit: 540, // 9 minutes
        passingScore: 85,
        risks: [
          {
            id: 'unencrypted-data',
            name: 'Unencrypted Sensitive Files',
            type: 'digital',
            severity: 'critical',
            position: { x: 30, y: 35, z: 5 },
            description: 'Customer data stored in plain text files on desktop',
            mitigation: 'Data encryption policies and DLP solutions',
            found: false,
            hint: 'Look for files with sensitive information on desktops',
            category: 'data'
          },
          {
            id: 'usb-data-leak',
            name: 'USB Data Transfer',
            type: 'physical',
            severity: 'high',
            position: { x: 50, y: 25, z: 4 },
            description: 'Employee copying sensitive data to personal USB device',
            mitigation: 'USB port controls and data loss prevention',
            found: false,
            hint: 'Check for USB devices and data transfer activities',
            category: 'data'
          },
          {
            id: 'cloud-misconfiguration',
            name: 'Misconfigured Cloud Storage',
            type: 'digital',
            severity: 'high',
            position: { x: 45, y: 50, z: 6 },
            description: 'Cloud storage with public access to confidential documents',
            mitigation: 'Cloud security configuration and access reviews',
            found: false,
            hint: 'Look for cloud storage settings and sharing permissions',
            category: 'data'
          }
        ]
      };
      
    case 5: // Network Security
      return {
        id: 'network-datacenter',
        name: 'Network Security Data Center',
        type: 'datacenter',
        description: 'Explore network infrastructure and identify security vulnerabilities.',
        objectives: [
          'Find network segmentation issues',
          'Identify wireless security gaps',
          'Spot firewall misconfigurations',
          'Locate network monitoring blind spots',
          'Assess intrusion detection coverage'
        ],
        timeLimit: 600, // 10 minutes
        passingScore: 85,
        risks: [
        {
          id: 'unlocked-rack',
          name: 'Unlocked Server Rack',
          type: 'physical',
          severity: 'critical',
          position: { x: 30, y: 40, z: 10 },
          description: 'Server rack with critical systems left unlocked',
          mitigation: 'Physical access controls and key management',
          found: false,
          hint: 'Check server racks for physical security',
          category: 'access'
        },
        {
          id: 'cooling-failure',
          name: 'Cooling System Alert',
          type: 'environmental',
          severity: 'high',
          position: { x: 60, y: 20, z: 12 },
          description: 'HVAC system showing temperature warnings',
          mitigation: 'Redundant cooling systems and monitoring',
          found: false,
          hint: 'Look for environmental monitoring displays',
          category: 'endpoint'
        },
        {
          id: 'cable-management',
          name: 'Poor Cable Management',
          type: 'physical',
          severity: 'medium',
          position: { x: 45, y: 55, z: 8 },
          description: 'Network cables creating tripping hazards and access issues',
          mitigation: 'Proper cable management and labeling',
          found: false,
          hint: 'Look for messy or dangerous cable routing',
          category: 'access'
        }
      ]
    };
    
    case 6: // Incident Response
      return {
        id: 'incident-soc',
        name: 'Security Operations Center',
        type: 'datacenter',
        description: 'Respond to active security incidents in a SOC environment.',
        objectives: [
          'Identify active security incidents',
          'Find incident response gaps',
          'Spot communication failures',
          'Locate evidence preservation issues',
          'Assess recovery procedures'
        ],
        timeLimit: 480, // 8 minutes
        passingScore: 90,
        risks: [
          {
            id: 'delayed-response',
            name: 'Delayed Incident Response',
            type: 'digital',
            severity: 'critical',
            position: { x: 40, y: 30, z: 8 },
            description: 'Security alert ignored for over 2 hours',
            mitigation: 'Automated alerting and escalation procedures',
            found: false,
            hint: 'Look for overdue alerts and notification systems',
            category: 'behavior'
          },
          {
            id: 'evidence-tampering',
            name: 'Evidence Contamination',
            type: 'physical',
            severity: 'high',
            position: { x: 25, y: 45, z: 6 },
            description: 'Compromised system being used normally, destroying evidence',
            mitigation: 'Incident isolation and forensic procedures',
            found: false,
            hint: 'Check for systems that should be isolated but are still active',
            category: 'behavior'
          },
          {
            id: 'communication-failure',
            name: 'Communication Breakdown',
            type: 'social',
            severity: 'medium',
            position: { x: 60, y: 35, z: 5 },
            description: 'Incident response team not properly coordinated',
            mitigation: 'Communication protocols and regular drills',
            found: false,
            hint: 'Look for signs of poor coordination and communication',
            category: 'behavior'
          }
        ]
      };
      
    case 7: // Remote Work Security
      return {
        id: 'remote-home',
        name: 'Remote Work Environment',
        type: 'home',
        description: 'Assess security risks in remote work setups.',
        objectives: [
          'Identify home network vulnerabilities',
          'Find physical security risks',
          'Spot privacy concerns',
          'Assess device security',
          'Evaluate backup and recovery'
        ],
        timeLimit: 420, // 7 minutes
        passingScore: 75,
        risks: [
        {
          id: 'family-access',
          name: 'Shared Family Computer',
          type: 'physical',
          severity: 'high',
          position: { x: 40, y: 30, z: 5 },
          description: 'Work computer accessible to family members',
          mitigation: 'Separate work devices and user accounts',
          found: false,
          hint: 'Look for signs of shared device usage',
          category: 'access'
        },
        {
          id: 'video-call-privacy',
          name: 'Video Call Background',
          type: 'social',
          severity: 'medium',
          position: { x: 25, y: 45, z: 4 },
          description: 'Sensitive information visible during video calls',
          mitigation: 'Virtual backgrounds and camera positioning',
          found: false,
          hint: 'Check what is visible behind the work area',
          category: 'behavior'
        },
        {
          id: 'router-default',
          name: 'Default Router Settings',
          type: 'digital',
          severity: 'high',
          position: { x: 70, y: 15, z: 6 },
          description: 'Home router using default passwords and settings',
          mitigation: 'Router security hardening and regular updates',
          found: false,
          hint: 'Check network equipment for security settings',
          category: 'network'
        }
      ]
    };
    
    default: // Fallback for other courses
      return {
        id: 'general-office',
        name: 'General Security Assessment',
        type: 'office',
        description: 'Comprehensive security assessment of a typical workplace.',
        objectives: [
          'Identify common security vulnerabilities',
          'Find physical and digital risks',
          'Spot procedural weaknesses',
          'Locate compliance violations',
          'Assess overall security posture'
        ],
        timeLimit: 480, // 8 minutes
        passingScore: 80,
        risks: [
          {
            id: 'mixed-vulnerabilities',
            name: 'Multiple Security Issues',
            type: 'physical',
            severity: 'high',
            position: { x: 35, y: 35, z: 5 },
            description: 'Various security issues found throughout the environment',
            mitigation: 'Comprehensive security program implementation',
            found: false,
            hint: 'Look for any obvious security problems',
            category: 'access'
          }
        ]
      };
    }
  };

  const getRiskColor = (risk: SecurityRisk) => {
    if (risk.found) return 'rgba(34, 197, 94, 0.8)'; // green
    switch (risk.severity) {
      case 'critical': return 'rgba(239, 68, 68, 0.8)'; // red
      case 'high': return 'rgba(249, 115, 22, 0.8)'; // orange
      case 'medium': return 'rgba(245, 158, 11, 0.8)'; // yellow
      case 'low': return 'rgba(34, 197, 94, 0.8)'; // green
      default: return 'rgba(156, 163, 175, 0.5)'; // gray
    }
  };

  const getRiskIcon = (risk: SecurityRisk) => {
    if (risk.found) return <CheckCircle2 className="w-5 h-5 text-white" />;
    switch (risk.category) {
      case 'access': return <Lock className="w-5 h-5 text-white" />;
      case 'network': return <Wifi className="w-5 h-5 text-white" />;
      case 'endpoint': return <Monitor className="w-5 h-5 text-white" />;
      case 'data': return <FileText className="w-5 h-5 text-white" />;
      case 'behavior': return <Users className="w-5 h-5 text-white" />;
      default: return <AlertTriangle className="w-5 h-5 text-white" />;
    }
  };

  const startLab = () => {
    const environment = getLabEnvironmentForCourse(courseId);
    setCurrentEnvironment(environment);
    setTimeRemaining(environment.timeLimit);
    setLabActive(true);
    setFoundRisks([]);
    setScore(0);
  };

  const handleRiskClick = (risk: SecurityRisk) => {
    if (risk.found) return;
    
    setSelectedRisk(risk);
    setFoundRisks(prev => [...prev, risk.id]);
    
    // Update the risk as found
    if (currentEnvironment) {
      const updatedEnvironment = {
        ...currentEnvironment,
        risks: currentEnvironment.risks.map(r => 
          r.id === risk.id ? { ...r, found: true } : r
        )
      };
      setCurrentEnvironment(updatedEnvironment);
    }
    
    // Calculate score
    const newScore = Math.round((foundRisks.length + 1) / (currentEnvironment?.risks.length || 1) * 100);
    setScore(newScore);
  };

  const completeLab = () => {
    setLabActive(false);
    onComplete(score);
  };

  const resetLab = () => {
    if (currentEnvironment) {
      const resetEnvironment = {
        ...currentEnvironment,
        risks: currentEnvironment.risks.map(r => ({ ...r, found: false }))
      };
      setCurrentEnvironment(resetEnvironment);
      setFoundRisks([]);
      setScore(0);
      setTimeRemaining(currentEnvironment.timeLimit);
      setSelectedRisk(null);
    }
  };

  useEffect(() => {
    if (labActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && labActive) {
      completeLab();
    }
  }, [labActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentEnvironment) {
    const environment = getLabEnvironmentForCourse(courseId);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-4">Interactive Security Lab</CardTitle>
            <p className="text-gray-300 text-lg">
              Explore 3D virtual environments and identify security risks through hands-on practice
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {environment.type === 'office' && <Building className="w-8 h-8 text-blue-400" />}
                  {environment.type === 'datacenter' && <HardDrive className="w-8 h-8 text-green-400" />}
                  {environment.type === 'home' && <User className="w-8 h-8 text-purple-400" />}
                  <h3 className="text-xl font-semibold text-white">{environment.name}</h3>
                </div>
                <p className="text-gray-300 mb-4">{environment.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Time Limit:</span>
                    <span className="text-white">{formatTime(environment.timeLimit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Passing Score:</span>
                    <span className="text-white">{environment.passingScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Risks to Find:</span>
                    <span className="text-white">{environment.risks.length}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Lab Objectives:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {environment.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-4 pt-6">
              <Button 
                onClick={startLab}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Lab
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700 px-8 py-3 text-lg"
              >
                <X className="w-5 h-5 mr-2" />
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Lab Environment Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-move 15s linear infinite'
        }} />
      </div>

      {/* Lab Controls */}
      <div className="absolute top-2 left-2 right-2 z-20 flex flex-col sm:flex-row justify-between items-start gap-2">
        <Card className="bg-black/60 backdrop-blur-sm border-gray-700 w-full sm:w-auto">
          <CardContent className="p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-white font-semibold text-sm sm:text-base truncate">{currentEnvironment.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-300">Time:</span>
                  <span className={`font-mono ${timeRemaining < 60 ? 'text-red-400' : 'text-white'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-300">Score:</span>
                  <span className="text-white font-semibold">{score}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-300">Found:</span>
                  <span className="text-white">{foundRisks.length}/{currentEnvironment.risks.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
          <Button 
            onClick={() => setShowHints(!showHints)}
            variant={showHints ? "default" : "outline"}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm flex-1 sm:flex-none"
          >
            <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">{showHints ? 'Hide Hints' : 'Show Hints'}</span>
          </Button>
          <Button onClick={resetLab} variant="outline" className="border-gray-500 text-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm flex-1 sm:flex-none">
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button onClick={onClose} variant="outline" className="border-gray-500 text-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm flex-1 sm:flex-none">
            <X className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
        </div>
      </div>

      {/* 3D Environment */}
      <div className="absolute inset-0 perspective-1000 pt-24 sm:pt-20">
        <div className="relative w-full h-full">
          
          {/* Security Risks */}
          {currentEnvironment.risks.map((risk) => (
            <div
              key={risk.id}
              className={`absolute cursor-pointer transition-all duration-500 ${
                risk.found ? 'opacity-60' : 'opacity-100'
              } ${hoveredElement === risk.id ? 'scale-125' : 'scale-100'}`}
              style={{
                left: `${risk.position.x}%`,
                top: `${risk.position.y}%`,
                transform: `translateZ(${risk.position.z}px)`,
                filter: `drop-shadow(0 0 20px ${getRiskColor(risk)})`
              }}
              onClick={() => handleRiskClick(risk)}
              onMouseEnter={() => setHoveredElement(risk.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div 
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  risk.found ? 'animate-none' : 'animate-pulse'
                }`}
                style={{
                  backgroundColor: getRiskColor(risk),
                  borderColor: getRiskColor(risk),
                  boxShadow: `0 0 30px ${getRiskColor(risk)}`
                }}
              >
                {getRiskIcon(risk)}
              </div>
              
              {hoveredElement === risk.id && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  {risk.name}
                </div>
              )}
              
              {showHints && !risk.found && (
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-yellow-600/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs max-w-32 text-center">
                  {risk.hint}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Details Panel */}
      {selectedRisk && (
        <Card className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm border-gray-700 max-w-2xl mx-auto z-30">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getRiskColor(selectedRisk) }}
                >
                  {getRiskIcon(selectedRisk)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedRisk.name}</h3>
                  <Badge 
                    variant="outline" 
                    className={`${
                      selectedRisk.severity === 'critical' ? 'border-red-500 text-red-400' :
                      selectedRisk.severity === 'high' ? 'border-orange-500 text-orange-400' :
                      selectedRisk.severity === 'medium' ? 'border-yellow-500 text-yellow-400' :
                      'border-green-500 text-green-400'
                    }`}
                  >
                    {selectedRisk.severity.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={() => setSelectedRisk(null)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Risk Description</h4>
                <p className="text-gray-300">{selectedRisk.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Mitigation Strategy</h4>
                <p className="text-gray-300">{selectedRisk.mitigation}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <span className="text-sm text-gray-400">Risk identified successfully!</span>
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Modal */}
      {!labActive && foundRisks.length > 0 && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40">
          <Card className="max-w-md mx-4 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Lab Complete!</h2>
                <p className="text-gray-300">
                  You found {foundRisks.length} out of {currentEnvironment.risks.length} security risks
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300">Final Score:</span>
                  <span className="text-white font-bold">{score}%</span>
                </div>
                <Progress value={score} className="h-3" />
                <div className="text-sm text-gray-400">
                  {score >= currentEnvironment.passingScore ? 
                    `Passed! (Required: ${currentEnvironment.passingScore}%)` : 
                    `Failed. Required: ${currentEnvironment.passingScore}%`
                  }
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={resetLab}
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:bg-gray-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={() => onComplete(score)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}