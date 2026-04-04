"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, User, Mail, Phone, MessageSquare, Send, Loader2, CheckCircle } from "lucide-react";
import { useApplications } from "@/hooks/use-applications";

interface ApplicationFormProps {
  jobTitle: string;
  jobId: string;
}

const ApplicationForm = ({ jobTitle, jobId }: ApplicationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { submitApplication, isSubmitting, submitError, submitSuccess } = useApplications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("jobTitle", jobTitle);
    formData.append("name", name);
    formData.append("email", email);
    if (phone) formData.append("phone", phone);
    if (linkedin) formData.append("linkedin", linkedin);
    if (message) formData.append("message", message);
    if (resumeFile) formData.append("resume", resumeFile);

    await submitApplication(formData);

    // Reset form on success
    if (!submitError) {
      setName("");
      setEmail("");
      setPhone("");
      setLinkedin("");
      setMessage("");
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  return (
    <motion.div
      className="flex flex-col pt-30 pb-20 items-center font-satoshi bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <div className="max-w-3xl mx-auto px-4 w-full">
        <motion.div
          className="text-center mb-12"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Apply for this position
          </h2>
          <p className="text-lg text-gray-600">
            Take the next step and join our team. We review every application carefully.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
            },
          }}
        >
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
            {(submitSuccess && !isSubmitting) ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 max-w-md">
                  Thank you for your interest in {jobTitle}. We&apos;ll review your application and get back to you soon.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    // Reset to allow another application
                    const event = new Event('reset', { bubbles: true });
                    window.dispatchEvent(event);
                  }}
                >
                  Submit Another Application
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success/Error Messages */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                  >
                    {submitError instanceof Error ? submitError.message : "Failed to submit application. Please try again."}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                        placeholder="John Doe"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                        placeholder="john@example.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                        placeholder="+1 (555) 000-0000"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2">
                    <label htmlFor="linkedin" className="text-sm font-semibold text-gray-700">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                        placeholder="linkedin.com/in/yourprofile"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Resume/CV *
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl hover:border-primary transition-colors cursor-pointer bg-gray-50/50">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <div className="flex flex-col items-center justify-center py-8 px-4">
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      {resumeFile ? (
                        <p className="text-gray-700 font-medium">
                          {resumeFile.name}
                        </p>
                      ) : (
                        <>
                          <p className="text-gray-700 font-medium mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Cover Letter / Additional Information
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white resize-none"
                      placeholder="Tell us why you're the perfect fit for this role..."
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-apple hover:shadow-apple-hover transition-all duration-200 text-lg font-bold tracking-tight disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </motion.div>

                <p className="text-center text-sm text-gray-500">
                  By applying, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ApplicationForm;
