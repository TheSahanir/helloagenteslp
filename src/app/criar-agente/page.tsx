"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, User, Building, Mail, Phone, Bot, Smile, Briefcase, Heart, Star, Instagram, Facebook, MessageCircle, Calendar, ShoppingCart, CreditCard, Package } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Suas informações
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  
  // Criando sua agente
  agentName: string;
  personality: string;
  model: string;
  productsServices: string;
  plan: string;
  paymentMethod: string;
}

const personalityOptions = [
  {
    id: "fun-informal",
    title: "Divertida e informal",
    description: "Descontraída e amigável",
    icon: <Smile className="w-6 h-6" />
  },
  {
    id: "serious-professional",
    title: "Séria e profissional",
    description: "Formal e especializada",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    id: "friendly-direct",
    title: "Simpática e direta",
    description: "Acolhedora e objetiva",
    icon: <Heart className="w-6 h-6" />
  }
];

const modelOptions = [
  {
    id: "general",
    title: "Atendimento Geral",
    description: "Nossa agente mais versátil. Tira todas as dúvidas, faz pré-atendimento e filtra leads.",
    icon: <Bot className="w-8 h-8 text-blue-500" />
  },
  {
    id: "tourism",
    title: "Agente de Turismo",
    description: "Fala em mais de 50 idiomas. Perfeita para tirar dúvidas de turistas e sugerir passeios.",
    icon: <MessageCircle className="w-8 h-8 text-green-500" />
  },
  {
    id: "clinic",
    title: "Atendente de Clínicas",
    description: "Faz pré-atendimento e agendamentos automaticamente.",
    icon: <Calendar className="w-8 h-8 text-purple-500" />
  },
  {
    id: "personal",
    title: "Assistente Pessoal",
    description: "Agenda compromissos, acessa documentos e escreve emails direto do seu whatsapp.",
    icon: <Star className="w-8 h-8 text-yellow-500" />
  },
  {
    id: "sales",
    title: "Vendedor",
    description: "Tira dúvidas, sugere produtos e envia links de pagamento.",
    icon: <ShoppingCart className="w-8 h-8 text-orange-500" />
  },
  {
    id: "custom",
    title: "Personalizado",
    description: "Descreva suas necessidades e criamos um feito especialmente pra você!",
    icon: <CreditCard className="w-8 h-8 text-red-500" />
  }
];

const planOptions = [
  {
    id: "instagram-facebook",
    title: "Instagram ou Facebook",
    price: "R$ 297",
    description: "Apenas para Instagram ou Facebook",
    icon: <Instagram className="w-6 h-6" />
  },
  {
    id: "all-networks",
    title: "Todas as Redes Sociais",
    price: "R$ 447",
    description: "Todas as redes sociais",
    icon: <Facebook className="w-6 h-6" />
  }
];

const paymentOptions = [
  {
    id: "pix",
    title: "Pix",
    description: "Pagamento instantâneo"
  },
  {
    id: "credit-card",
    title: "Cartão de Crédito",
    description: "Pagamento com cartão"
  }
];

const formSteps = [
  {
    id: "personal-info",
    title: "Suas informações",
    description: "Informe seus dados para criarmos sua conta",
    icon: <User className="w-6 h-6 text-blue-500" />,
    fields: ["fullName", "companyName", "email", "phone"]
  },
  {
    id: "agent-name",
    title: "Nome da sua agente",
    description: "Como você quer que sua atendente seja chamada?",
    icon: <Bot className="w-6 h-6 text-purple-500" />,
    fields: ["agentName"]
  },
  {
    id: "personality",
    title: "Personalidade",
    description: "Escolha o estilo da sua atendente",
    icon: <Smile className="w-6 h-6 text-green-500" />,
    fields: ["personality"]
  },
  {
    id: "model",
    title: "Modelo de Atendimento",
    description: "Escolha o tipo de atendimento que sua agente irá realizar",
    icon: <Bot className="w-6 h-6 text-yellow-500" />,
    fields: ["model"]
  },
  {
    id: "products-services",
    title: "Produtos e Serviços",
    description: "Descreva o que sua agente irá atender",
    icon: <Package className="w-6 h-6 text-orange-500" />,
    fields: ["productsServices"]
  },
  {
    id: "plan",
    title: "Escolha seu plano",
    description: "Selecione o plano ideal para seu negócio",
    icon: <Star className="w-6 h-6 text-red-500" />,
    fields: ["plan"]
  },
  {
    id: "payment",
    title: "Forma de Pagamento",
    description: "Como você prefere pagar?",
    icon: <CreditCard className="w-6 h-6 text-indigo-500" />,
    fields: ["paymentMethod"]
  }
];

export default function CriarAgente() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    agentName: "",
    personality: "",
    model: "",
    productsServices: "",
    plan: "",
    paymentMethod: ""
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 300 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      x: -300,
      transition: {
        duration: 0.3
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatVariants = {
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${((currentStep + 1) / formSteps.length) * 100}%`,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isCurrentStepValid = () => {
    const currentFields = formSteps[currentStep].fields;
    return currentFields.every(field => {
      const value = formData[field as keyof FormData];
      if (field === "productsServices") return true; // Campo opcional
      return value && value.trim() !== "";
    });
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1 && isCurrentStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://eoj6pbiz0745k33.m.pipedream.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Agente criado com sucesso!",
          description: "Seu agente de IA será configurado em breve.",
        });
        // Reset form
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          agentName: "",
          personality: "",
          model: "",
          productsServices: "",
          plan: "",
          paymentMethod: ""
        });
        setCurrentStep(0);
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      toast({
        title: "Erro ao criar agente",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const step = formSteps[currentStep];

    switch (step.id) {
      case "personal-info":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Seu Nome Completo</Label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="João Silva"
                    required
                    className="transition-all duration-300"
                  />
                </motion.div>
              </div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="companyName">Nome da sua empresa</Label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Sua Empresa Ltda"
                    required
                    className="transition-all duration-300"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="joao@empresa.com"
                    required
                    className="transition-all duration-300"
                  />
                </motion.div>
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                    className="transition-all duration-300"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "agent-name":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Label htmlFor="agentName">Nome da sua nova atendente de IA</Label>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Input
                  id="agentName"
                  value={formData.agentName}
                  onChange={(e) => handleInputChange('agentName', e.target.value)}
                  placeholder="Maria Virtual"
                  required
                  className="transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case "personality":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Label>Personalidade</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {personalityOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    variants={itemVariants}
                    whileHover={cardHoverVariants.hover}
                    whileTap={cardHoverVariants.tap}
                  >
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.personality === option.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleInputChange('personality', option.id)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <motion.div 
                          className="text-blue-500"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {option.icon}
                        </motion.div>
                        <h3 className="font-semibold">{option.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case "model":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Label>Escolha seu modelo</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {modelOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    variants={itemVariants}
                    whileHover={cardHoverVariants.hover}
                    whileTap={cardHoverVariants.tap}
                  >
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.model === option.id
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleInputChange('model', option.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <motion.div 
                          className="mt-1"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {option.icon}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold mb-1">{option.title}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case "products-services":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Label htmlFor="productsServices">Produtos e Serviços</Label>
              <p className="text-sm text-gray-600 mb-2">Digite aqui todos os produtos e serviços que seu agente de atendimento vai responder aos seus clientes.</p>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Textarea
                  id="productsServices"
                  value={formData.productsServices}
                  onChange={(e) => handleInputChange('productsServices', e.target.value)}
                  placeholder="Descreva seus produtos, serviços, preços, horários de funcionamento, políticas de troca, etc..."
                  maxLength={20000}
                  className="min-h-[150px] transition-all duration-300"
                />
              </motion.div>
              <motion.div 
                className="text-sm text-gray-500 mt-1"
                variants={itemVariants}
              >
                {formData.productsServices.length}/20.000 caracteres
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case "plan":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Label>Escolha seu plano</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {planOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    variants={itemVariants}
                    whileHover={cardHoverVariants.hover}
                    whileTap={cardHoverVariants.tap}
                  >
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.plan === option.id
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleInputChange('plan', option.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{option.title}</h3>
                        <motion.div 
                          className="text-green-500"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {option.icon}
                        </motion.div>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">{option.price}</div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case "payment":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Label>Forma de Pagamento</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {paymentOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    variants={itemVariants}
                    whileHover={cardHoverVariants.hover}
                    whileTap={cardHoverVariants.tap}
                  >
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.paymentMethod === option.id
                          ? 'border-orange-500 bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleInputChange('paymentMethod', option.id)}
                    >
                      <h3 className="font-semibold mb-1">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "400% 400%",
          opacity: 0.02
        }}
      />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-blue-300 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        variants={floatVariants}
        animate="float"
      />
      <motion.div
        className="absolute top-40 right-20 w-20 h-20 bg-purple-300 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        variants={floatVariants}
        animate="float"
        style={{ transitionDelay: "1s" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-32 h-32 bg-pink-300 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        variants={floatVariants}
        animate="float"
        style={{ transitionDelay: "2s" }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <motion.div 
                  className="relative w-10 h-10"
                  variants={pulseVariants}
                  animate="pulse"
                >
                  <img 
                    src="/logo_hello_branco_1x1.png" 
                    alt="Hello Agentes Inteligentes" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <span className="font-semibold text-gray-800">hello.</span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">
                <Button variant="outline" size="sm">
                  Voltar
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.span 
                className="text-sm text-gray-600"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                Passo {currentStep + 1} de {formSteps.length}
              </motion.span>
            </div>
            <div className="flex-1 mx-8">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Badge variant="secondary">
                {Math.round(((currentStep + 1) / formSteps.length) * 100)}%
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Step Card */}
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={currentStep}
            >
              <Card className="relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-pink-50/20"
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center space-x-3">
                    <motion.div
                      variants={floatVariants}
                      animate="float"
                    >
                      {formSteps[currentStep].icon}
                    </motion.div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {formSteps[currentStep].title}
                    </motion.span>
                  </CardTitle>
                  <CardDescription>
                    {formSteps[currentStep].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  {renderStepContent()}
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <motion.div
                whileHover={buttonHoverVariants.hover}
                whileTap={buttonHoverVariants.tap}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Anterior
                </Button>
              </motion.div>

              {currentStep === formSteps.length - 1 ? (
                <motion.div
                  whileHover={buttonHoverVariants.hover}
                  whileTap={buttonHoverVariants.tap}
                >
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
                    disabled={isSubmitting || !isCurrentStepValid()}
                  >
                    {isSubmitting ? 'Criando Agente...' : 'CRIAR AGENTE'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={buttonHoverVariants.hover}
                  whileTap={buttonHoverVariants.tap}
                >
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
                  >
                    Próximo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}