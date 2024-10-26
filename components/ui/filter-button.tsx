'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: React.ReactNode
}

export function FilterButton({ 
  children, 
  active, 
  icon, 
  className,
  ...props 
}: FilterButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative group px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300",
        active
          ? "bg-white/10 text-white"
          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white",
        className
      )}
      {...props}
    >
      {/* Gradient Border */}
      <div className={cn(
        "absolute inset-0 rounded-full transition-opacity duration-300",
        active
          ? "bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-100"
          : "opacity-0 group-hover:opacity-50"
      )} />

      {/* Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-full blur-md transition-opacity duration-300",
        active
          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-100"
          : "opacity-0"
      )} />

      {/* Content */}
      <div className="relative flex items-center gap-2">
        {icon && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "transition-colors duration-300",
              active ? "text-white" : "text-gray-400 group-hover:text-white"
            )}
          >
            {icon}
          </motion.span>
        )}
        <span className="text-sm font-medium">{children}</span>
      </div>

      {/* Active Indicator */}
      {active && (
        <motion.div
          layoutId="activeFilter"
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  )
}