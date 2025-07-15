import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, 
  Palette, 
  Globe, 
  Shield, 
  Users, 
  CheckCircle2, 
  Settings,
  Flag,
  Award,
  Lock,
  UserCheck,
  FileText,
  Mail
} from "lucide-react";

interface CompanyCustomization {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  supportEmail: string;
  countries: string[];
  industries: string[];
  complianceFrameworks: string[];
  roleBasedAccess: RoleAccess[];
}

interface RoleAccess {
  role: string;
  displayName: string;
  description: string;
  courseCategories: string[];
  complianceModules: string[];
  accessLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
}

interface ComplianceModule {
  id: string;
  name: string;
  country: string;
  industry: string;
  framework: string;
  mandatory: boolean;
  description: string;
}

export default function CompanyCustomization() {
  const [customization, setCustomization] = useState<CompanyCustomization>({
    companyName: "",
    logo: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    contactEmail: "",
    supportEmail: "",
    countries: [],
    industries: [],
    complianceFrameworks: [],
    roleBasedAccess: []
  });

  const [currentStep, setCurrentStep] = useState(1);

  const availableCountries = [
    { code: "US", name: "United States", regulations: ["NIST", "SOX", "HIPAA", "DFARS"] },
    { code: "UK", name: "United Kingdom", regulations: ["GDPR", "NIS Directive", "Cyber Essentials"] },
    { code: "EU", name: "European Union", regulations: ["GDPR", "NIS2", "DORA"] },
    { code: "CA", name: "Canada", regulations: ["PIPEDA", "CCPA"] },
    { code: "AU", name: "Australia", regulations: ["Privacy Act", "ACSC"] },
    { code: "DE", name: "Germany", regulations: ["GDPR", "BSI IT-Grundschutz"] },
    { code: "FR", name: "France", regulations: ["GDPR", "ANSSI"] },
    { code: "JP", name: "Japan", regulations: ["APPI", "NISC"] },
    { code: "SG", name: "Singapore", regulations: ["PDPA", "CSA"] }
  ];

  const industries = [
    { id: "healthcare", name: "Healthcare", specific: ["HIPAA", "FDA 21 CFR Part 11", "HITECH"] },
    { id: "finance", name: "Financial Services", specific: ["PCI DSS", "SOX", "GLBA", "Basel III"] },
    { id: "defense", name: "Defense & Aerospace", specific: ["DFARS", "NIST SP 800-171", "CMMC"] },
    { id: "energy", name: "Energy & Utilities", specific: ["NERC CIP", "TSA Pipeline", "NIS Directive"] },
    { id: "water", name: "Water & Wastewater", specific: ["NIS Directive", "AWWA Security"] },
    { id: "manufacturing", name: "Manufacturing", specific: ["ISO 27001", "IEC 62443", "NIST Framework"] },
    { id: "education", name: "Education", specific: ["FERPA", "COPPA", "GDPR"] },
    { id: "government", name: "Government", specific: ["FedRAMP", "FISMA", "NIST SP 800-53"] },
    { id: "technology", name: "Technology", specific: ["SOC 2", "ISO 27001", "Cloud Security"] },
    { id: "retail", name: "Retail & E-commerce", specific: ["PCI DSS", "GDPR", "CCPA"] }
  ];

  const roleTypes: RoleAccess[] = [
    {
      role: "soc_cyber",
      displayName: "SOC/Cyber Security Team",
      description: "Security operations center staff and cybersecurity professionals",
      courseCategories: ["all"],
      complianceModules: ["all"],
      accessLevel: "expert"
    },
    {
      role: "hr",
      displayName: "Human Resources",
      description: "HR professionals focusing on personnel security",
      courseCategories: ["basic_awareness", "personnel_security", "privacy_protection"],
      complianceModules: ["privacy", "personnel"],
      accessLevel: "intermediate"
    },
    {
      role: "engineers",
      displayName: "Engineers & Technical Staff",
      description: "Engineering teams requiring technical security knowledge",
      courseCategories: ["basic_awareness", "cyber_security", "physical_security", "secure_development"],
      complianceModules: ["technical", "development"],
      accessLevel: "advanced"
    },
    {
      role: "management",
      displayName: "Management & Executives",
      description: "Leadership requiring strategic security understanding",
      courseCategories: ["basic_awareness", "strategic_security", "crisis_management", "board_reporting"],
      complianceModules: ["governance", "strategic"],
      accessLevel: "advanced"
    },
    {
      role: "finance",
      displayName: "Finance & Accounting",
      description: "Financial staff with focus on fraud prevention",
      courseCategories: ["basic_awareness", "financial_security", "fraud_prevention"],
      complianceModules: ["financial", "privacy"],
      accessLevel: "intermediate"
    },
    {
      role: "sales_marketing",
      displayName: "Sales & Marketing",
      description: "Customer-facing teams with data protection focus",
      courseCategories: ["basic_awareness", "customer_data", "privacy_protection"],
      complianceModules: ["privacy", "customer"],
      accessLevel: "basic"
    },
    {
      role: "general_staff",
      displayName: "General Staff",
      description: "All other employees requiring basic security awareness",
      courseCategories: ["basic_awareness"],
      complianceModules: ["basic"],
      accessLevel: "basic"
    }
  ];

  const complianceModules: ComplianceModule[] = [
    // US Defense Industry
    {
      id: "dfars",
      name: "DFARS Cybersecurity Requirements",
      country: "US",
      industry: "defense",
      framework: "DFARS",
      mandatory: true,
      description: "Defense Federal Acquisition Regulation Supplement cybersecurity requirements"
    },
    {
      id: "cmmc",
      name: "Cybersecurity Maturity Model Certification",
      country: "US",
      industry: "defense",
      framework: "CMMC",
      mandatory: true,
      description: "DoD cybersecurity certification requirements"
    },
    // UK Water Companies
    {
      id: "nis_water_uk",
      name: "NIS Directive for Water Companies",
      country: "UK",
      industry: "water",
      framework: "NIS",
      mandatory: true,
      description: "Network and Information Systems directive for water sector"
    },
    {
      id: "water_security_uk",
      name: "UK Water Security Regulations",
      country: "UK",
      industry: "water",
      framework: "AWWA",
      mandatory: true,
      description: "Water industry-specific security requirements"
    },
    // EU GDPR
    {
      id: "gdpr_eu",
      name: "General Data Protection Regulation",
      country: "EU",
      industry: "all",
      framework: "GDPR",
      mandatory: true,
      description: "EU data protection and privacy requirements"
    },
    {
      id: "nis2_eu",
      name: "NIS2 Directive",
      country: "EU",
      industry: "critical",
      framework: "NIS2",
      mandatory: true,
      description: "Enhanced network and information security directive"
    },
    // Healthcare
    {
      id: "hipaa_us",
      name: "HIPAA Security Rule",
      country: "US",
      industry: "healthcare",
      framework: "HIPAA",
      mandatory: true,
      description: "Health Insurance Portability and Accountability Act security requirements"
    },
    // Financial Services
    {
      id: "pci_dss",
      name: "PCI DSS Compliance",
      country: "all",
      industry: "finance",
      framework: "PCI DSS",
      mandatory: true,
      description: "Payment Card Industry Data Security Standard"
    }
  ];

  const additionalModules = [
    {
      id: "dark_web_monitoring",
      name: "Intro to the Dark Web",
      category: "threat_intelligence",
      description: "Continuous tracking of dark web exposure and threat intelligence services",
      advanced: true
    },
    {
      id: "third_party_risk",
      name: "Third Party Risk Management",
      category: "risk_management",
      description: "Tool to help companies manage and assess third-party vendor cybersecurity",
      advanced: true
    },
    {
      id: "secure_development",
      name: "Secure Software Development",
      category: "development",
      description: "Best practices for secure coding and software supply chain security",
      advanced: true
    },
    {
      id: "devsecops",
      name: "DevSecOps Integration",
      category: "development",
      description: "Embedding cybersecurity into software development lifecycle",
      advanced: true
    },
    {
      id: "remote_workforce",
      name: "Cybersecurity for Remote Workforces",
      category: "operational",
      description: "Security for remote work environments and distributed teams",
      standard: true
    },
    {
      id: "behavioral_analytics",
      name: "Human-Centric Cybersecurity",
      category: "behavioral",
      description: "Insider threat detection and behavioral analysis training",
      advanced: true
    },
    {
      id: "ai_security",
      name: "Secure AI Model Development",
      category: "emerging_tech",
      description: "Securing AI models against adversarial attacks and misuse",
      advanced: true
    },
    {
      id: "quantum_readiness",
      name: "Quantum Computing Readiness",
      category: "emerging_tech",
      description: "Quantum-safe cryptography and post-quantum security preparation",
      advanced: true
    },
    {
      id: "privacy_automation",
      name: "Privacy & Compliance Automation",
      category: "compliance",
      description: "Automated privacy compliance workflows and monitoring",
      advanced: true
    },
    {
      id: "cyber_insurance",
      name: "Cybersecurity Insurance Readiness",
      category: "risk_management",
      description: "Preparing for cyber insurance requirements and claims",
      standard: true
    },
    {
      id: "incident_response_service",
      name: "Incident Response as a Service",
      category: "response",
      description: "Expert-led incident response planning and emergency support",
      advanced: true
    },
    {
      id: "iot_ot_security",
      name: "IoT & OT Cybersecurity",
      category: "operational",
      description: "Securing Internet of Things and Operational Technology environments",
      advanced: true
    },
    {
      id: "crisis_communication",
      name: "Cyber Crisis Communication",
      category: "crisis_management",
      description: "Crisis communication management after cybersecurity incidents",
      advanced: true
    },
    {
      id: "automated_vendor_assessment",
      name: "Automated Third-Party Risk Assessment",
      category: "risk_management",
      description: "Automated vendor security posture assessment platform",
      advanced: true
    }
  ];

  const handleCountryChange = (country: string) => {
    const updatedCountries = customization.countries.includes(country)
      ? customization.countries.filter(c => c !== country)
      : [...customization.countries, country];
    
    setCustomization(prev => ({
      ...prev,
      countries: updatedCountries
    }));
  };

  const handleIndustryChange = (industry: string) => {
    const updatedIndustries = customization.industries.includes(industry)
      ? customization.industries.filter(i => i !== industry)
      : [...customization.industries, industry];
    
    setCustomization(prev => ({
      ...prev,
      industries: updatedIndustries
    }));
  };

  const handleRoleToggle = (role: RoleAccess) => {
    const exists = customization.roleBasedAccess.find(r => r.role === role.role);
    if (exists) {
      setCustomization(prev => ({
        ...prev,
        roleBasedAccess: prev.roleBasedAccess.filter(r => r.role !== role.role)
      }));
    } else {
      setCustomization(prev => ({
        ...prev,
        roleBasedAccess: [...prev.roleBasedAccess, role]
      }));
    }
  };

  const getRelevantCompliance = () => {
    return complianceModules.filter(module => {
      const countryMatch = customization.countries.includes(module.country) || module.country === "all";
      const industryMatch = customization.industries.includes(module.industry) || module.industry === "all" || module.industry === "critical";
      return countryMatch && industryMatch;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Company Customization</h1>
        <p className="text-lg text-gray-600">
          Customize your cybersecurity training platform with company branding, country-specific compliance modules, and role-based access control
        </p>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="location">Location & Compliance</TabsTrigger>
          <TabsTrigger value="roles">Role-Based Access</TabsTrigger>
          <TabsTrigger value="modules">Additional Modules</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Customize your platform with company logo, colors, and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={customization.companyName}
                    onChange={(e) => setCustomization(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="logo">Company Logo URL</Label>
                  <Input
                    id="logo"
                    value={customization.logo}
                    onChange={(e) => setCustomization(prev => ({ ...prev, logo: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={customization.primaryColor}
                      onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-20"
                    />
                    <Input
                      value={customization.primaryColor}
                      onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={customization.secondaryColor}
                      onChange={(e) => setCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-20"
                    />
                    <Input
                      value={customization.secondaryColor}
                      onChange={(e) => setCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={customization.contactEmail}
                    onChange={(e) => setCustomization(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="security@company.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={customization.supportEmail}
                    onChange={(e) => setCustomization(prev => ({ ...prev, supportEmail: e.target.value }))}
                    placeholder="support@company.com"
                  />
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Preview</h4>
                <div className="flex items-center gap-3 p-3 bg-white rounded border">
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    {customization.companyName.slice(0, 2).toUpperCase() || "CO"}
                  </div>
                  <div>
                    <div className="font-semibold">{customization.companyName || "Your Company"}</div>
                    <div className="text-sm text-gray-600">Cybersecurity Training Platform</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Countries & Jurisdictions
              </CardTitle>
              <CardDescription>
                Select countries where your company operates to enable relevant compliance modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableCountries.map(country => (
                  <div key={country.code} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Flag className="w-4 h-4" />
                        <span className="font-medium">{country.name}</span>
                      </div>
                      <Checkbox
                        checked={customization.countries.includes(country.code)}
                        onCheckedChange={() => handleCountryChange(country.code)}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Applicable Regulations:</div>
                    <div className="flex flex-wrap gap-1">
                      {country.regulations.map(reg => (
                        <Badge key={reg} variant="outline" className="text-xs">
                          {reg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Industry & Sector
              </CardTitle>
              <CardDescription>
                Select your industry sectors for specialized compliance requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map(industry => (
                  <div key={industry.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{industry.name}</span>
                      <Checkbox
                        checked={customization.industries.includes(industry.id)}
                        onCheckedChange={() => handleIndustryChange(industry.id)}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Specific Requirements:</div>
                    <div className="flex flex-wrap gap-1">
                      {industry.specific.map(spec => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Relevant Compliance Modules
              </CardTitle>
              <CardDescription>
                Based on your selected countries and industries, these compliance modules will be included
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRelevantCompliance().map(module => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{module.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{module.framework}</Badge>
                        {module.mandatory && (
                          <Badge variant="destructive">Mandatory</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{module.country}</Badge>
                      <Badge variant="secondary">{module.industry}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Role-Based Access Control
              </CardTitle>
              <CardDescription>
                Configure which employee roles get access to which course categories and compliance modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roleTypes.map(role => (
                  <div key={role.role} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{role.displayName}</h4>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{role.accessLevel}</Badge>
                        <Checkbox
                          checked={customization.roleBasedAccess.some(r => r.role === role.role)}
                          onCheckedChange={() => handleRoleToggle(role)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Course Categories:</div>
                        <div className="flex flex-wrap gap-1">
                          {role.courseCategories.map(category => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-2">Compliance Modules:</div>
                        <div className="flex flex-wrap gap-1">
                          {role.complianceModules.map(module => (
                            <Badge key={module} variant="outline" className="text-xs">
                              {module}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Additional Training Modules
              </CardTitle>
              <CardDescription>
                Select additional specialized modules based on your organization's needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalModules.map(module => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{module.name}</h4>
                      <div className="flex items-center gap-2">
                        {module.advanced && (
                          <Badge variant="default">Advanced</Badge>
                        )}
                        {module.standard && (
                          <Badge variant="secondary">Standard</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {module.category.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Configuration Preview
              </CardTitle>
              <CardDescription>
                Review your customization settings before applying
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Company Information</h4>
                    <div className="text-sm space-y-2">
                      <div><span className="font-medium">Name:</span> {customization.companyName || "Not set"}</div>
                      <div><span className="font-medium">Contact:</span> {customization.contactEmail || "Not set"}</div>
                      <div><span className="font-medium">Support:</span> {customization.supportEmail || "Not set"}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Jurisdictions</h4>
                    <div className="flex flex-wrap gap-2">
                      {customization.countries.map(country => (
                        <Badge key={country} variant="outline">
                          {availableCountries.find(c => c.code === country)?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Active Roles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customization.roleBasedAccess.map(role => (
                      <div key={role.role} className="border rounded-lg p-3">
                        <div className="font-medium">{role.displayName}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {role.accessLevel}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Compliance Modules</h4>
                  <div className="text-sm text-gray-600 mb-2">
                    {getRelevantCompliance().length} modules enabled based on your selections
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getRelevantCompliance().map(module => (
                      <Badge key={module.id} variant="secondary" className="text-xs">
                        {module.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button size="lg" className="w-full">
                    Apply Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}