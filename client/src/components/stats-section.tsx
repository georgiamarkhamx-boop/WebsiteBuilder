export default function StatsSection() {
  const stats = [
    {
      value: "95%",
      label: "of cybersecurity breaches are caused by human error",
      color: "text-red-600"
    },
    {
      value: "70%",
      label: "reduction in security incidents after interactive training",
      color: "text-green-600"
    },
    {
      value: "43%",
      label: "of employees can't identify phishing attempts",
      color: "text-yellow-600"
    },
    {
      value: "82%",
      label: "better knowledge retention with interactive learning",
      color: "text-blue-600"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">The Human Factor in Cybersecurity</h2>
          <p className="text-gray-600 mt-2">Real statistics that highlight why human-focused security training matters</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="dashboard-metric animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
