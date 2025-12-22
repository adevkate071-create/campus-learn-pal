import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sampleMessages = [
  {
    role: "user",
    content: "How do I calculate the moment of inertia for a hollow cylinder?",
  },
  {
    role: "assistant",
    content: "Great question! The moment of inertia for a hollow cylinder about its central axis is:\n\n**I = ½M(R₁² + R₂²)**\n\nWhere:\n• M = mass of the cylinder\n• R₁ = inner radius\n• R₂ = outer radius\n\nFor a thin-walled hollow cylinder where R₁ ≈ R₂ = R, it simplifies to I = MR²",
  },
];

const DoubtSolver = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <section className="py-24 px-4 bg-muted/30" id="doubt-solver">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI Doubt Solver</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Stuck on a Problem?
            <br />
            <span className="text-gradient">Ask Away!</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant, step-by-step explanations for any engineering concept, formula, or problem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="overflow-hidden border-2 border-border/50 shadow-xl">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-border bg-card flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-soft" />
              <span className="font-medium text-sm">StudyBuddy AI</span>
              <span className="text-xs text-muted-foreground">• Always ready to help</span>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 bg-muted/20 min-h-[300px]">
              {sampleMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-accent-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ask your doubt here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
                <Button variant="accent" size="lg" className="rounded-xl">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DoubtSolver;
