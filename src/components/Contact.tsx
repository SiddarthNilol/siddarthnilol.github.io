import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Linkedin, Github } from "lucide-react";
import { useForm } from "react-hook-form";
import { LINKEDIN_URL, GITHUB_URL } from "@/lib/socials";

const Contact = () => {
  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ defaultValues: { firstName: "", lastName: "", email: "", subject: "", message: "" } });

  const onSubmit = async (data: FormData) => {
    const name = `${data.firstName} ${data.lastName}`.trim();
    const subject = data.subject || `Website message from ${name || data.email}`;
    const body = `${data.message}\n\nFrom: ${name || "Anonymous"}\nEmail: ${data.email}`;

    // Open user's mail client pre-filled (fallback to ensure email composition)
    const mailto = `mailto:sk12590@nyu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try {
      // Try sending a background POST to formsubmit.co (optional, may require verification).
      // This is a best-effort attempt; it won't block the mailto behavior.
      fetch("https://formsubmit.co/ajax/sk12590@nyu.edu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: data.email, subject, message: data.message }),
      }).catch(() => {
        /* ignore network errors */
      });
    } catch (e) {
      // ignore
    }

    // Open mail client in a new tab/window to prompt the user to send
    try {
      window.location.href = mailto;
    } catch (e) {
      window.open(mailto, "_blank");
    }

    reset();
  };
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Open to opportunities in AI/ML research, product development, and innovative data science projects
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                Currently pursuing MS in Data Science at NYU and always excited to discuss 
                cutting-edge AI research, automotive technology, and innovative data solutions.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Card className="project-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a 
                      href="mailto:sk12590@nyu.edu" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      sk12590@nyu.edu
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="project-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a 
                      href="tel:+15513581332" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      +1 (551) 358-1332
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="project-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">New York, NY</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Connect Online</h4>
              <div className="flex space-x-4">
                <a
                  href={LINKEDIN_URL}
                  className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn profile"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                </a>
                <a
                  href={GITHUB_URL}
                  className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub profile"
                >
                  <Github className="h-6 w-6 text-accent" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="project-card p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="bg-background/50 border-border focus:border-primary"
                    {...register("firstName", { required: false })}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="bg-background/50 border-border focus:border-primary"
                    {...register("lastName", { required: false })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="bg-background/50 border-border focus:border-primary"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">Please enter a valid email.</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Collaboration Opportunity"
                  className="bg-background/50 border-border focus:border-primary"
                  {...register("subject", { required: false })}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="I'd love to discuss..."
                  rows={6}
                  className="bg-background/50 border-border focus:border-primary resize-none"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">Please enter a message.</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-xl transition-all duration-300"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-5 w-5" />
              </Button>
              {isSubmitSuccessful && (
                <div className="mt-2 text-sm text-success">Message prepared — your mail client should open. If it didn't, please check your browser's popup blocker.</div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;