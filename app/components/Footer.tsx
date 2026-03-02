'use client'

import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { PortfolioData } from './types'

interface FooterProps {
  data: PortfolioData
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <div className="font-bold text-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            &lt;Dipu Dev/&gt;
          </div>
          <p className="text-gray-400 mb-8 text-lg">
            Building amazing web experiences with modern technologies
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {[
              { icon: Github, href: data.personal.social.github },
              { icon: Linkedin, href: data.personal.social.linkedin },
              { icon: Mail, href: data.personal.social.email }
            ].map((social, index) => (
              <a
                key={index}
                target='_blank'
                href={social.href}
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125"
              >
                <social.icon className="w-8 h-8" />
              </a>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2025 My Portfolio. Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
