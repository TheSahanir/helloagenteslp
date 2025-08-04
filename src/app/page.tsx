"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Clock, Globe, MessageSquare, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Atendimento 24h",
      description: "Nunca perca uma venda novamente. Seu agente de IA está sempre disponível para atender seus clientes."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "Múltiplos Idiomas",
      description: "Atenda clientes em qualquer idioma. Expanda seu negócio globalmente sem barreiras linguísticas."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Resposta Imediata",
      description: "Respostas instantâneas que aumentam a satisfação do cliente e melhoram a conversão."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-500" />,
      title: "Qualidade Consistente",
      description: "Mantenha o padrão de atendimento em todas as interações, 100% do tempo."
    },
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "Experiência Personalizada",
      description: "Crie uma atendente única com a personalidade que representa sua marca."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-red-500" />,
      title: "Qualificação de Leads",
      description: "Filtre e qualifique leads automaticamente, economizando tempo e recursos."
    }
  ];

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
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={gradientVariants}
        animate="animate"
        style={{
          background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "400% 400%",
          opacity: 0.03
        }}
      />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-blue-300 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        variants={floatVariants}
        animate="float"
      />
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-purple-300 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        variants={floatVariants}
        animate="float"
        style={{ transitionDelay: "1s" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-300 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        variants={floatVariants}
        animate="float"
        style={{ transitionDelay: "2s" }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.div
                className="relative w-32 h-32 mx-auto mb-6"
                variants={pulseVariants}
                animate="pulse"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                  <motion.img 
                    src="/logo_hello_branco_1x1.png" 
                    alt="Hello Agentes Inteligentes" 
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
              >
                <Badge 
                  variant="secondary" 
                  className="mb-4 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  agentes inteligentes
                </Badge>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Crie seu agente de IA para atendimento agora!
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Transforme seu negócio com atendimento inteligente 24 horas por dia, 7 dias por semana.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
            >
              <Link href="/criar-agente">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Criar Agente
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-pink-50/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Por que ter um agente de IA no seu negócio?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Descubra como a inteligência artificial pode revolucionar seu atendimento ao cliente
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md group">
                  <CardHeader>
                    <motion.div 
                      className="mb-4"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <CardTitle className="text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Pronto para transformar seu atendimento?
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Junte-se a milhares de empresas que já estão revolucionando seu atendimento com IA
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/criar-agente">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="px-8 py-4 text-lg rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}