import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import ApperIcon from "@/components/ApperIcon";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import Button from "@/components/atoms/Button";

const Layout = ({ children, filters, onFiltersChange, categories, taskCounts }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleManageCategories = () => {
    // For now, just show a toast - in a full app this would open a category management modal
    toast.info("Category management coming soon!");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <FilterSidebar
                filters={filters}
                onFiltersChange={onFiltersChange}
                categories={categories}
                taskCounts={taskCounts}
                onManageCategories={handleManageCategories}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <FilterSidebar
          filters={filters}
          onFiltersChange={onFiltersChange}
          categories={categories}
          taskCounts={taskCounts}
          onManageCategories={handleManageCategories}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-surface border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <ApperIcon name="Menu" size={20} />
              </Button>
              
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  FlowTask
                </h1>
                <p className="text-sm text-gray-600">
                  Efficient task management for busy professionals
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex items-center gap-2"
                onClick={() => document.querySelector(".quick-add-input")?.focus()}
              >
                <ApperIcon name="Plus" size={16} />
                Quick Add
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;