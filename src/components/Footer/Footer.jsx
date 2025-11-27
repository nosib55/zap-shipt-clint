import { motion } from "framer-motion";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 py-14 mt-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 text-center"
        >
         <img src="/logo.svg" alt=""  className="w-40"/>
          <p className="max-w-md text-gray-400 text-sm">
            Crafted with precision and passion. Delivering beautiful and responsive user interfaces.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              "Home",
              "Features",
              "Pricing",
              "Projects",
              "Careers",
              "Contact",
            ].map((item) => (
              <span
                key={item}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-6 pt-4">
            <Github className="w-6 h-6 hover:text-white cursor-pointer transition" />
            <Linkedin className="w-6 h-6 hover:text-blue-400 cursor-pointer transition" />
            <Globe className="w-6 h-6 hover:text-green-400 cursor-pointer transition" />
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Your Company — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
