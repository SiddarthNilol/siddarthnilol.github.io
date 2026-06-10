import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, Linkedin, Github, CheckCircle } from "@/lib/icons";
import { useToast } from "@/hooks/use-toast";

const inputClasses =
  "flex h-11 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // FormSubmit AJAX endpoint — emails sk12590@nyu.edu (recipient must be verified once)
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
        _subject: formData.subject || `Website message from ${formData.email}`,
      };

      const resp = await fetch("https://formsubmit.co/ajax/sk12590@nyu.edu", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="aurora w-96 h-96 bg-primary/10 bottom-0 -right-32" aria-hidden="true"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-6xl mx-auto mb-16">
          <p className="eyebrow">// 04 — say hello</p>
          <h2 className="section-title">
            Let&rsquo;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Open to opportunities in AI/ML research, product development, and innovative data science projects
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10">
          {/* Contact info */}
          <div className="space-y-8">
            <p className="text-muted-foreground">
              Currently pursuing MS in Data Science at NYU and always excited to discuss
              cutting-edge AI research, automotive technology, and innovative data solutions.
            </p>

            <div className="space-y-3">
              <Card className="signal-card p-5">
                <a href="mailto:sk12590@nyu.edu" className="flex items-center gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">email</div>
                    <div className="text-sm group-hover:text-primary transition-colors">sk12590@nyu.edu</div>
                  </div>
                </a>
              </Card>

              <Card className="signal-card p-5">
                <a href="tel:+15513581332" className="flex items-center gap-4 group">
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">phone</div>
                    <div className="text-sm group-hover:text-accent transition-colors">+1 (551) 358-1332</div>
                  </div>
                </a>
              </Card>

              <Card className="signal-card p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">location</div>
                    <div className="text-sm">New York, NY</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/siddarth-nilol-k-s"
                className="p-3 rounded-full border border-border hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://github.com/SiddarthNilol"
                className="p-3 rounded-full border border-border hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-accent" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <Card className="signal-card p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-14 w-14 text-work mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I&rsquo;ll get back to you soon!</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block font-mono text-xs text-muted-foreground mb-2">
                        first name
                      </label>
                      <input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        className={inputClasses}
                      />
                      {errors.firstName && <p className="text-destructive text-xs mt-1.5">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block font-mono text-xs text-muted-foreground mb-2">
                        last name
                      </label>
                      <input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        className={inputClasses}
                      />
                      {errors.lastName && <p className="text-destructive text-xs mt-1.5">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-muted-foreground mb-2">
                      email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john.doe@example.com"
                      className={inputClasses}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-mono text-xs text-muted-foreground mb-2">
                      subject
                    </label>
                    <input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Collaboration Opportunity"
                      className={inputClasses}
                    />
                    {errors.subject && <p className="text-destructive text-xs mt-1.5">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-mono text-xs text-muted-foreground mb-2">
                      message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="I'd love to discuss..."
                      rows={6}
                      className={`${inputClasses} h-auto min-h-[120px] resize-none`}
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1.5">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow font-display"
                    size="lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
