import React from 'react';
import { ComponentType } from 'react';
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/motion";

// Define the props interface for the SectionWrapper function
interface SectionWrapperProps {
  Component: React.ComponentType;
  idName: string;
}

/**
 * SectionWrapper is a Higher-Order Component (HOC) that wraps a given component
 * with animation and styling features.
 *
 * @param {React.ComponentType} Component - The component to be wrapped
 * @param {string} idName - The ID to be assigned to the section for navigation
 * @returns {React.FC} A new functional component that wraps the provided component
 */
const SectionWrapper = <P extends object>(
  Component: ComponentType<P>,
  idName: string
) => {
  return function HOC(props: P) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className='px-0 2xl:px-60 py-10 2xl:py-16 max-w-full mx-auto relative z-0'
      >
        {/* Create an empty span with the provided ID for navigation purposes */}
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        
        {/* Render the wrapped component */}
        <Component {...props} />
      </motion.section>
    );
  };
};

export default SectionWrapper;