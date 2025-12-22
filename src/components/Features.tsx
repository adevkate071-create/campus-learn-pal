import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Brain, Users, Lightbulb } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "AI-Powered Summaries",
    description: "Upload your notes or textbooks and get clear, exam-focused summaries in seconds. Perfect for last-minute revision.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Brain,
    title: "Instant Doubt Solver",
    description: "Ask any question about formulas, concepts, or problems. Get step-by-step explanations in simple language.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "Based on your reading history, we suggest relevant materials, practice problems, and related topics to master.",
    color: "bg-secondary-foreground/10 text-secondary-foreground",
  },
  {
    icon: Users,
    title: "Campus Study Network",
    description: "Find study partners, join subject groups, and collaborate with peers from your campus for better learning.",
    color: "bg-accent/10 text-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Features = () => {
  return (
    <section className="py-24 px-4" id="features">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Ace Your Exams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered learning tools to peer collaboration, we've got your entire study journey covered.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card variant="interactive" className="h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
