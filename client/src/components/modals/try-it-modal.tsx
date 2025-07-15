import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TryItModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShowMaturity: () => void;
}

export default function TryItModal({ open, onOpenChange, onShowMaturity }: TryItModalProps) {
  const handleBasicsDemo = () => {
    alert('Cyber Basics demo module would start here with interactive content covering password security, phishing awareness, and social engineering defense.');
  };

  const handleTTXDemo = () => {
    alert('TTX Phishing simulation would start here with a realistic scenario requiring decision-making under pressure.');
  };

  const demos = [
    {
      title: "✅ Cyber Basics (UK/US toggle)",
      description: "3 screens + quiz decision",
      buttonText: "Start Demo",
      buttonClass: "bg-green-600 hover:bg-green-700",
      onClick: handleBasicsDemo
    },
    {
      title: "✅ 1 TTX Scenario (Phishing)",
      description: "One decision point path",
      buttonText: "Start Simulation",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
      onClick: handleTTXDemo
    },
    {
      title: "✅ Maturity Score Lite",
      description: "5-question form → result",
      buttonText: "Take Assessment",
      buttonClass: "bg-purple-600 hover:bg-purple-700",
      onClick: onShowMaturity
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Try It First - No Email Required</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {demos.map((demo, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{demo.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{demo.description}</p>
              <Button 
                className={`text-white ${demo.buttonClass}`}
                onClick={demo.onClick}
              >
                {demo.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
