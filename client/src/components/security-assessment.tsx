import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  Target,
  Brain,
  Eye,
  Zap,
  Users,
  FileText,
  Activity,
  Settings
} from "lucide-react";

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
  recommendations: string[];
  nextActions: string[];
}

interface RiskPrediction {
  risk: string;
  probability: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  timeframe: string;
  mitigation: string[];
}

interface ComplianceFramework {
  name: string;
  industry: string;
  completion: number;
  requirements: number;
  completedRequirements: number;
  lastAssessed: string;
  nextDeadline: string;
}

export default function SecurityAssessment() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('healthcare');
  const [assessmentInProgress, setAssessmentInProgress] = useState(false);
  const [maturityLevel, setMaturityLevel] = useState(3);

  const assessmentResults: AssessmentResult[] = [
    {
      category: "Technical Controls",
      score: 78,
      maxScore: 100,
      status: 'good',
      recommendations: [
        "Implement zero-trust architecture",
        "Enhance endpoint detection and response",
        "Upgrade firewall configurations"
      ],
      nextActions: [
        "Deploy advanced threat detection",
        "Conduct penetration testing",
        "Update security policies"
      ]
    },
    {
      category: "Policy & Procedures",
      score: 65,
      maxScore: 100,
      status: 'needs_improvement',
      recommendations: [
        "Develop comprehensive incident response plan",
        "Create employee security handbook",
        "Establish vendor risk management process"
      ],
      nextActions: [
        "Schedule policy review meeting",
        "Assign policy owners",
        "Create policy templates"
      ]
    },
    {
      category: "Human Factors",
      score: 82,
      maxScore: 100,
      status: 'good',
      recommendations: [
        "Expand phishing simulation program",
        "Implement role-based security training",
        "Create security awareness campaigns"
      ],
      nextActions: [
        "Launch monthly security newsletter",
        "Conduct security culture survey",
        "Implement security champion program"
      ]
    },
    {
      category: "Compliance & Governance",
      score: 58,
      maxScore: 100,
      status: 'needs_improvement',
      recommendations: [
        "Establish security governance committee",
        "Implement continuous compliance monitoring",
        "Develop risk management framework"
      ],
      nextActions: [
        "Schedule board security briefing",
        "Implement GRC platform",
        "Conduct compliance gap analysis"
      ]
    }
  ];

  const riskPredictions: RiskPrediction[] = [
    {
      risk: "Ransomware Attack",
      probability: 78,
      impact: 'high',
      timeframe: "Next 6 months",
      mitigation: [
        "Implement advanced backup strategy",
        "Deploy behavioral analytics",
        "Conduct ransomware simulation"
      ]
    },
    {
      risk: "Data Breach via Phishing",
      probability: 65,
      impact: 'medium',
      timeframe: "Next 3 months",
      mitigation: [
        "Enhance email security",
        "Increase phishing awareness training",
        "Implement data loss prevention"
      ]
    },
    {
      risk: "Supply Chain Compromise",
      probability: 45,
      impact: 'high',
      timeframe: "Next 12 months",
      mitigation: [
        "Implement vendor risk assessment",
        "Monitor third-party security",
        "Develop supply chain incident response"
      ]
    },
    {
      risk: "Insider Threat",
      probability: 35,
      impact: 'medium',
      timeframe: "Ongoing",
      mitigation: [
        "Implement user behavior analytics",
        "Enhance access controls",
        "Conduct background checks"
      ]
    }
  ];

  const complianceFrameworks: ComplianceFramework[] = [
    {
      name: "HIPAA",
      industry: "Healthcare",
      completion: 78,
      requirements: 164,
      completedRequirements: 128,
      lastAssessed: "2024-01-10",
      nextDeadline: "2024-03-15"
    },
    {
      name: "SOC 2 Type II",
      industry: "Technology",
      completion: 65,
      requirements: 89,
      completedRequirements: 58,
      lastAssessed: "2024-01-05",
      nextDeadline: "2024-02-28"
    },
    {
      name: "ISO 27001",
      industry: "General",
      completion: 72,
      requirements: 114,
      completedRequirements: 82,
      lastAssessed: "2024-01-08",
      nextDeadline: "2024-04-30"
    }
  ];

  const industrySpecificMetrics = {
    healthcare: {
      criticalAssets: ["Patient Records", "Medical Devices", "Prescription Systems"],
      regulatoryRequirements: ["HIPAA", "FDA 21 CFR Part 11", "HITECH Act"],
      commonThreats: ["Medical Device Vulnerabilities", "Ransomware", "PHI Breaches"],
      maturityBenchmark: 3.2
    },
    finance: {
      criticalAssets: ["Customer Data", "Transaction Systems", "Trading Platforms"],
      regulatoryRequirements: ["PCI DSS", "SOX", "GLBA"],
      commonThreats: ["Financial Fraud", "DDoS Attacks", "Insider Trading"],
      maturityBenchmark: 3.8
    },
    manufacturing: {
      criticalAssets: ["Industrial Systems", "Supply Chain", "IP/Patents"],
      regulatoryRequirements: ["NIST Framework", "ISO 27001", "IEC 62443"],
      commonThreats: ["Industrial Espionage", "OT/IT Attacks", "Supply Chain Attacks"],
      maturityBenchmark: 2.9
    }
  };

  const aiRoadmap = [
    {
      priority: "High",
      area: "Email Security",
      action: "Implement advanced email filtering",
      roi: "85%",
      effort: "Medium",
      timeline: "2 weeks"
    },
    {
      priority: "High",
      area: "Access Management",
      action: "Deploy multi-factor authentication",
      roi: "78%",
      effort: "Low",
      timeline: "1 week"
    },
    {
      priority: "Medium",
      area: "Endpoint Protection",
      action: "Upgrade to EDR solution",
      roi: "72%",
      effort: "High",
      timeline: "4 weeks"
    },
    {
      priority: "Medium",
      area: "Network Security",
      action: "Implement network segmentation",
      roi: "68%",
      effort: "High",
      timeline: "6 weeks"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'needs_improvement': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Assessment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Maturity Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {maturityLevel}</div>
            <p className="text-sm opacity-90">of 5 (Intermediate)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71%</div>
            <p className="text-sm opacity-90">Above industry average</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Critical Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm opacity-90">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Next Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-sm opacity-90">days remaining</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="continuous" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="continuous">Continuous</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="industry">Industry</TabsTrigger>
          <TabsTrigger value="roadmap">AI Roadmap</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="vciso">vCISO</TabsTrigger>
        </TabsList>

        <TabsContent value="continuous" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Continuous Assessment Results
              </CardTitle>
              <CardDescription>
                Real-time security posture monitoring with automated compliance checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assessmentResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{result.category}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(result.status)}>
                          {result.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-2xl font-bold">{result.score}%</span>
                      </div>
                    </div>
                    
                    <Progress value={result.score} className="mb-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="text-sm space-y-1">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Next Actions</h4>
                        <ul className="text-sm space-y-1">
                          {result.nextActions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Predictive Risk Analytics
              </CardTitle>
              <CardDescription>
                AI-powered threat prediction to identify vulnerabilities before they manifest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskPredictions.map((prediction, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{prediction.risk}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{prediction.timeframe}</Badge>
                        <Badge className={getImpactColor(prediction.impact)}>
                          {prediction.impact} impact
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Probability</span>
                        <span className="text-sm font-bold">{prediction.probability}%</span>
                      </div>
                      <Progress value={prediction.probability} />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Mitigation Strategies</h4>
                      <ul className="text-sm space-y-1">
                        {prediction.mitigation.map((strategy, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Shield className="w-4 h-4 text-blue-500 mt-0.5" />
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Industry-Specific Assessment
              </CardTitle>
              <CardDescription>
                Tailored security assessments for healthcare, finance, manufacturing, and government
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button 
                    variant={selectedIndustry === 'healthcare' ? 'default' : 'outline'}
                    onClick={() => setSelectedIndustry('healthcare')}
                  >
                    Healthcare
                  </Button>
                  <Button 
                    variant={selectedIndustry === 'finance' ? 'default' : 'outline'}
                    onClick={() => setSelectedIndustry('finance')}
                  >
                    Finance
                  </Button>
                  <Button 
                    variant={selectedIndustry === 'manufacturing' ? 'default' : 'outline'}
                    onClick={() => setSelectedIndustry('manufacturing')}
                  >
                    Manufacturing
                  </Button>
                </div>
                
                {industrySpecificMetrics[selectedIndustry as keyof typeof industrySpecificMetrics] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Critical Assets</h4>
                        <ul className="text-sm space-y-1">
                          {industrySpecificMetrics[selectedIndustry as keyof typeof industrySpecificMetrics].criticalAssets.map((asset, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              {asset}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Regulatory Requirements</h4>
                        <ul className="text-sm space-y-1">
                          {industrySpecificMetrics[selectedIndustry as keyof typeof industrySpecificMetrics].regulatoryRequirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Common Threats</h4>
                        <ul className="text-sm space-y-1">
                          {industrySpecificMetrics[selectedIndustry as keyof typeof industrySpecificMetrics].commonThreats.map((threat, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                              {threat}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Industry Benchmark</h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {industrySpecificMetrics[selectedIndustry as keyof typeof industrySpecificMetrics].maturityBenchmark}
                          </div>
                          <div className="text-sm text-gray-600">Average Maturity Level</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI-Generated Security Roadmap
              </CardTitle>
              <CardDescription>
                Personalized recommendations prioritized by ROI and risk reduction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRoadmap.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{item.area}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline">{item.timeline}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.action}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{item.roi}</div>
                        <div className="text-sm text-gray-600">ROI</div>
                      </div>
                      
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{item.effort}</div>
                        <div className="text-sm text-gray-600">Effort</div>
                      </div>
                      
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{item.timeline}</div>
                        <div className="text-sm text-gray-600">Timeline</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Compliance Framework Status
              </CardTitle>
              <CardDescription>
                Track progress across multiple regulatory frameworks and standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceFrameworks.map((framework, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{framework.name}</h3>
                        <p className="text-sm text-gray-600">{framework.industry}</p>
                      </div>
                      <Badge variant="outline">{framework.completion}% Complete</Badge>
                    </div>
                    
                    <Progress value={framework.completion} className="mb-3" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Requirements</div>
                        <div className="font-semibold">
                          {framework.completedRequirements}/{framework.requirements}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600">Last Assessed</div>
                        <div className="font-semibold">{framework.lastAssessed}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600">Next Deadline</div>
                        <div className="font-semibold text-red-600">{framework.nextDeadline}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vciso" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Virtual CISO Services
              </CardTitle>
              <CardDescription>
                Expert cybersecurity guidance and strategic support for small to medium businesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="font-semibold text-lg mb-2">Essential vCISO</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$2,500</div>
                    <div className="text-sm text-gray-600 mb-4">per month</div>
                    <ul className="text-sm space-y-2">
                      <li>Monthly security assessment</li>
                      <li>Policy development</li>
                      <li>Incident response planning</li>
                      <li>Compliance guidance</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center border-blue-500">
                    <h3 className="font-semibold text-lg mb-2">Professional vCISO</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$5,000</div>
                    <div className="text-sm text-gray-600 mb-4">per month</div>
                    <ul className="text-sm space-y-2">
                      <li>All Essential features</li>
                      <li>Weekly strategic calls</li>
                      <li>Board reporting</li>
                      <li>Vendor assessments</li>
                      <li>24/7 incident support</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="font-semibold text-lg mb-2">Enterprise vCISO</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$10,000</div>
                    <div className="text-sm text-gray-600 mb-4">per month</div>
                    <ul className="text-sm space-y-2">
                      <li>All Professional features</li>
                      <li>Dedicated CISO resource</li>
                      <li>Custom security programs</li>
                      <li>M&A security support</li>
                      <li>Regulatory preparation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Strategic security planning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Risk assessment and management
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Compliance management
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Incident response support
                      </li>
                    </ul>
                    
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Security awareness training
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Vendor risk management
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Board and executive reporting
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Technology security reviews
                      </li>
                    </ul>
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