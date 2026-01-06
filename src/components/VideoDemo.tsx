import { motion } from "framer-motion";

const VideoDemo = () => {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch our quick demo to see how StudyBuddy can transform your learning experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card"
        >
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/sKaRPkJbR_g"
              title="StudyBuddy Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemo;
