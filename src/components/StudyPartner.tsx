import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, BookMarked, Star } from "lucide-react";

const studyPartners = [
  {
    name: "Priya Sharma",
    subject: "Thermodynamics",
    rating: 4.8,
    avatar: "PS",
    online: true,
  },
  {
    name: "Rahul Verma",
    subject: "Digital Electronics",
    rating: 4.6,
    avatar: "RV",
    online: true,
  },
  {
    name: "Anita Patel",
    subject: "Data Structures",
    rating: 4.9,
    avatar: "AP",
    online: false,
  },
];

const StudyPartner = () => {
  return (
    <section className="py-24 px-4" id="community">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>Campus Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect
              <br />
              <span className="text-gradient">Study Partner</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with peers who share your subjects and goals. Study together, 
              share notes, and learn from each other's strengths.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Users, text: "Match with students in your branch" },
                { icon: MessageSquare, text: "Real-time chat and video calls" },
                { icon: BookMarked, text: "Share and collaborate on notes" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg">
              Find Study Partners
            </Button>
          </motion.div>

          {/* Right side - Partner cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {studyPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card variant="interactive" className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-accent-foreground font-bold text-lg">
                        {partner.avatar}
                      </div>
                      {partner.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">{partner.subject}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{partner.rating}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                +2,450 students active on your campus
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudyPartner;
