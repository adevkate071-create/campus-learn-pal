import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 sm:p-12 md:p-16 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-primary-foreground text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Transform
            <br />
            Your Study Game?
          </h2>

          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of engineering students who are studying smarter, 
            not harder. Start your journey today—it's free!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60 mt-6">
            No credit card required • Free forever for basic features
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
