import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData?.subject?.trim()?.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData?.message?.trim()?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="CheckCircle" size={40} className="text-success" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
        <p className="text-gray-400 mb-8">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Send a Message</h2>
        <p className="text-gray-400">
          Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Input
              label="Full Name"
              type="text"
              name="name"

              placeholder="Enter your full name"
              value={formData?.name}
              onChange={handleChange}
              error={errors?.name}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              label="Email Address"
              type="email"
              name="email"
             
              placeholder="Enter your email address"
              value={formData?.email}
              onChange={handleChange}
              error={errors?.email}
              required
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="focus-ring-1"
        >
          <Input
            label="Subject"
            type="text"
            name="subject"
           
            placeholder="What's this about?"
            value={formData?.subject}
            onChange={handleChange}
            error={errors?.subject}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="space-y-2 ">
            <label className="block text-sm font-medium text-white">
              Message <span className="text-destructive">*</span>
            </label>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about your project or inquiry..."
              value={formData?.message}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-input border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-none ${
                errors?.message ? 'border-destructive' : 'border-border'
              }`}
            />
            {errors?.message && (
              <p className="text-sm text-destructive mt-1">{errors?.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            fullWidth
            className="mt-4 rounded-xl"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;