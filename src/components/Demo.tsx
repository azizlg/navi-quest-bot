import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Navigation, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw,
  Apple,
  Tv,
  Armchair,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";

const objects = [
  { id: "apple", label: "Apple", icon: Apple },
  { id: "mug", label: "Mug", icon: Coffee },
  { id: "chair", label: "Chair", icon: Armchair },
  { id: "tv", label: "Television", icon: Tv },
];

const navigationSteps = [
  { action: "Scanning environment...", status: "complete" },
  { action: "Target identified via CLIP", status: "complete" },
  { action: "Planning optimal path", status: "complete" },
  { action: "Navigating to target", status: "complete" },
  { action: "Object found!", status: "success" },
];

const Demo = () => {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const startDemo = (objectId: string) => {
    setSelectedObject(objectId);
    setIsNavigating(true);
    setCurrentStep(0);

    // Simulate navigation steps
    navigationSteps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, (index + 1) * 800);
    });

    setTimeout(() => {
      setIsNavigating(false);
    }, navigationSteps.length * 800 + 500);
  };

  const resetDemo = () => {
    setSelectedObject(null);
    setIsNavigating(false);
    setCurrentStep(-1);
  };

  return (
    <section id="demo" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It <span className="text-gradient">In Action</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select an object to simulate the agent's navigation process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Interactive Demo */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-secondary/50 border-b border-border flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-sm font-mono text-muted-foreground ml-2">
                snapnav-agent
              </span>
            </div>

            <div className="p-6 md:p-8">
              {/* Object Selection */}
              <AnimatePresence mode="wait">
                {!selectedObject ? (
                  <motion.div
                    key="selection"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="text-muted-foreground mb-4 font-mono text-sm">
                      <span className="text-primary">$</span> Select target object:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {objects.map((obj) => (
                        <motion.button
                          key={obj.id}
                          onClick={() => startDemo(obj.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-300 group"
                        >
                          <obj.icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium text-foreground">
                            {obj.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="navigation"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* Command Display */}
                    <div className="mb-6 p-4 rounded-xl bg-background/50 border border-border">
                      <p className="font-mono text-sm">
                        <span className="text-primary">$</span>{" "}
                        <span className="text-muted-foreground">python run_agent.py --target</span>{" "}
                        <span className="text-foreground">"{objects.find(o => o.id === selectedObject)?.label.toLowerCase()}"</span>
                      </p>
                    </div>

                    {/* Navigation Visualization */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Agent View */}
                      <div className="relative aspect-square rounded-xl bg-secondary/30 border border-border overflow-hidden">
                        <div className="absolute inset-0 grid-pattern opacity-30" />
                        
                        {/* Simulated environment */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={isNavigating ? {
                              x: [0, 30, -20, 40, 0],
                              y: [0, -20, 30, -10, 0],
                            } : {}}
                            transition={{ duration: 3, ease: "easeInOut" }}
                            className="relative"
                          >
                            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
                              <Navigation className="w-8 h-8 text-primary-foreground" />
                            </div>
                            
                            {/* Scanning effect */}
                            {isNavigating && currentStep < 3 && (
                              <motion.div
                                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 rounded-full border-2 border-primary"
                              />
                            )}
                          </motion.div>
                        </div>

                        {/* Target indicator */}
                        <AnimatePresence>
                          {currentStep >= 1 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-4 right-4 p-2 rounded-lg bg-primary/20 border border-primary/50"
                            >
                              <Eye className="w-5 h-5 text-primary" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Object found */}
                        <AnimatePresence>
                          {currentStep === 4 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                            >
                              <div className="text-center">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", damping: 10 }}
                                >
                                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-2" />
                                </motion.div>
                                <p className="text-lg font-semibold text-foreground">
                                  {objects.find(o => o.id === selectedObject)?.label} Found!
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Steps Log */}
                      <div className="space-y-3">
                        {navigationSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ 
                              opacity: index <= currentStep ? 1 : 0.3,
                              x: 0 
                            }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                              index <= currentStep 
                                ? index === currentStep && step.status === "success"
                                  ? "bg-green-500/10 border-green-500/50"
                                  : "bg-secondary/50 border-primary/30"
                                : "bg-secondary/20 border-border"
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              index < currentStep
                                ? "bg-primary text-primary-foreground"
                                : index === currentStep
                                  ? step.status === "success"
                                    ? "bg-green-500 text-white"
                                    : "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                            }`}>
                              {index < currentStep || (index === currentStep && step.status === "success") ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : index === currentStep ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <RotateCcw className="w-3 h-3" />
                                </motion.div>
                              ) : (
                                <ArrowRight className="w-3 h-3" />
                              )}
                            </div>
                            <span className={`text-sm font-medium ${
                              index <= currentStep ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {step.action}
                            </span>
                          </motion.div>
                        ))}

                        {/* Reset button */}
                        {!isNavigating && currentStep === 4 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Button
                              onClick={resetDemo}
                              variant="outline"
                              className="w-full mt-4 border-border bg-secondary/50 hover:bg-secondary"
                            >
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Try Another Object
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-card/50 border border-border"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-gradient">Quick Start</span>
            </h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="p-3 rounded-lg bg-background/50 border border-border">
                <span className="text-muted-foreground"># Clone the repository</span>
                <br />
                <span className="text-foreground">git clone https://github.com/azizlg/SnapNav.git</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border">
                <span className="text-muted-foreground"># Install dependencies</span>
                <br />
                <span className="text-foreground">pip install -r requirements.txt</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border">
                <span className="text-muted-foreground"># Run the agent</span>
                <br />
                <span className="text-foreground">python run_agent.py --target "apple"</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-6 border-border bg-secondary/50 hover:bg-secondary"
              asChild
            >
              <a href="https://github.com/azizlg/SnapNav" target="_blank" rel="noopener noreferrer">
                View Full Documentation
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
