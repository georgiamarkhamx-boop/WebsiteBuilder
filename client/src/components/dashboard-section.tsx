import { Button } from "@/components/ui/button";

export default function DashboardSection() {
  const handleDashboardDemo = () => {
    alert('Dashboard demo would be shown here. This would include a full interactive tour of the analytics and reporting features.');
  };

  const dashboardData = {
    overallCompletion: 78,
    averageScore: 82,
    maturityScore: 3.7,
    departments: [
      { name: "IT Department", completion: 92 },
      { name: "Marketing", completion: 68 },
      { name: "Finance", completion: 85 },
      { name: "HR", completion: 74 }
    ],
    recentCertifications: [
      { name: "Sarah Johnson", course: "Cyber Basics", date: "Today" },
      { name: "Michael Chen", course: "Phishing Defense", date: "Yesterday" },
      { name: "Emma Wilson", course: "Data Protection", date: "Yesterday" },
      { name: "James Taylor", course: "Remote Work Security", date: "2 days ago" }
    ]
  };

  return (
    <section id="dashboard" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Business Dashboard</h2>
          <p className="text-lg text-gray-600">Track employee progress, identify knowledge gaps, and measure your organization's security maturity with our intuitive dashboard.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Employee Progress Tracking</h4>
              <p className="text-gray-600 mb-4">Monitor completion rates, quiz scores, and engagement metrics across your organization.</p>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
                alt="Employee dashboard showing progress tracking" 
                className="w-full h-32 object-cover rounded-md" 
              />
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Security Maturity Assessment</h4>
              <p className="text-gray-600 mb-4">Visualize your organization's security posture and track improvements over time.</p>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
                alt="Security maturity assessment dashboard" 
                className="w-full h-32 object-cover rounded-md" 
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Department Heatmaps</h4>
              <p className="text-gray-600 mb-4">Identify vulnerable departments and target additional training where it's needed most.</p>
              <img 
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
                alt="Department security heatmap" 
                className="w-full h-32 object-cover rounded-md" 
              />
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Compliance Reporting</h4>
              <p className="text-gray-600 mb-4">Generate reports for regulatory compliance and cyber insurance requirements.</p>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
                alt="Compliance reporting dashboard" 
                className="w-full h-32 object-cover rounded-md" 
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <Button size="lg" onClick={handleDashboardDemo}>
            Request Dashboard Demo
          </Button>
        </div>
        
        {/* Dashboard Preview */}
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="gradient-bg text-white p-4">
              <h3 className="text-xl font-bold">Security Enhance Dashboard</h3>
              <p className="text-sm opacity-90">Organization Security Overview</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold">Last updated: Today, 9:41 AM</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{dashboardData.overallCompletion}%</div>
                  <div className="text-sm text-gray-600">Overall Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{dashboardData.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{dashboardData.maturityScore}/5</div>
                  <div className="text-sm text-gray-600">Maturity Score</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold mb-4">Department Completion</h5>
                  <div className="space-y-3">
                    {dashboardData.departments.map((dept, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{dept.name}</span>
                          <span className="font-medium">{dept.completion}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${dept.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-4">Recent Certifications</h5>
                  <div className="space-y-3">
                    {dashboardData.recentCertifications.map((cert, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <div className="font-medium text-sm">{cert.name}</div>
                          <div className="text-xs text-gray-500">{cert.course}</div>
                        </div>
                        <div className="text-xs text-gray-500">{cert.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
