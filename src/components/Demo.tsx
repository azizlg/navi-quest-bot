import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Demo = () => {
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
            Watch the agent navigate 3D environments to find target objects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Video placeholder */}
          <div className="aspect-video rounded-2xl bg-card border border-border overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center cursor-pointer glow-primary mb-4"
              >
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </motion.div>
              <p className="text-muted-foreground font-medium">Demo Coming Soon</p>
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
