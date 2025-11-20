"use client";

import { useEffect } from "react";

interface CommentsProps {
  url: string;
  identifier: string;
  title: string;
}

export default function Comments({ url, identifier, title }: CommentsProps) {
  useEffect(() => {
    // Configure Disqus with dark mode
    (window as any).disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    // Add dark mode CSS for Disqus
    const style = document.createElement("style");
    style.innerHTML = `
      #disqus_thread {
        color-scheme: dark;
      }
      #disqus_thread iframe {
        color-scheme: dark !important;
      }
    `;
    document.head.appendChild(style);

    // Load Disqus script
    const script = document.createElement("script");
    script.src = "https://spidertanks-guide.disqus.com/embed.js";
    script.setAttribute("data-timestamp", String(+new Date()));
    (document.head || document.body).appendChild(script);

    // Force dark mode after Disqus loads
    const checkDisqus = setInterval(() => {
      const iframe = document.querySelector('#disqus_thread iframe');
      if (iframe) {
        (iframe as HTMLElement).style.colorScheme = 'dark';
        clearInterval(checkDisqus);
      }
    }, 100);

    // Cleanup
    return () => {
      const disqusThread = document.getElementById("disqus_thread");
      if (disqusThread) {
        disqusThread.innerHTML = "";
      }
      clearInterval(checkDisqus);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [url, identifier, title]);

  return (
    <div className="max-w-4xl mx-auto mt-16 mb-8">
      {/* Header with clear messaging */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">Join the Discussion</h3>
        <p className="text-gray-300 text-sm">
          Share your thoughts, strategies, and feedback with the Spider Tanks community.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          💬 <span className="text-cyan-400">Login is optional</span> - only needed if you want to comment.
          You can use Google, Twitter, Facebook, or just your email.
        </p>
      </div>

      {/* Disqus embed - isolated from modern CSS colors */}
      <div
        id="disqus_thread"
        className="rounded-lg p-6 bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-cyan-900/40"
        style={{
          border: '1px solid rgba(6, 182, 212, 0.3)',
          color: '#ffffff',
          backgroundColor: 'rgba(8, 47, 73, 0.6)'
        }}
      ></div>

      <noscript>
        <p className="text-gray-400 text-sm text-center mt-4">
          Please enable JavaScript to view the comments powered by Disqus.
        </p>
      </noscript>
    </div>
  );
}
