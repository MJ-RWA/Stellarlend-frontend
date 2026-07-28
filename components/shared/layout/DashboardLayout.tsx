import React, { Component, ErrorInfo, ReactNode } from "react";
import TopNav from "@/components/shared/layout/TopNav";
import { SideNav } from "./SideNav";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SafeLayoutRegion extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DashboardLayout region error caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/*
       * Skip-to-content link
       *
       * Rendered as the very first DOM node so it is the first Tab stop.
       * Visually hidden at rest; becomes visible on focus via the
       * `sr-only focus:not-sr-only` Tailwind pattern.
       */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#15A350] focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* SideNav contains the <nav> / <aside> landmark */}
      <SideNav />

      <div className="w-full min-h-screen bg-[#15A350] flex flex-col">
        {/* TopNav wrapped in <header> landmark */}
        <header>
          <TopNav />
        </header>

        {/*
         * Main content slot.
         *
         * `id="main-content"` is the skip-link target.
         * `flex-1` ensures the slot expands to fill the remaining viewport
         * height below the header.
         */}
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

