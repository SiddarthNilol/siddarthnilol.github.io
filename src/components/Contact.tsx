import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Linkedin, Github, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required").max(100, "Subject must be less than 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", data);
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
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
                  href="https://linkedin.com/in/siddarth-nilol-kundur-satish" 
                  className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                </a>
                <a 
                  href="https://github.com/siddarthsatish" 
                  className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-6 w-6 text-accent" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="project-card p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-green-600">Message Sent Successfully!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <>
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
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <Input 
                        id="lastName"
                        placeholder="Doe"
                        className="bg-background/50 border-border focus:border-primary"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
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
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
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
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    size="lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
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