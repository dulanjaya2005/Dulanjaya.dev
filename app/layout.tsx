import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Dulanjaya Thathsara | Software Engineer",
    template: "%s | Dulanjaya Thathsara",
  },
  description:
    "Software Engineer with 3+ years experience building modern web applications using React, Node.js and MySQL. Based in Sri Lanka.",
  keywords: [
    "software engineer",
    "web developer",
    "react",
    "next.js",
    "node.js",
    "fullstack",
    "Sri Lanka",
  ],
  authors: [{ name: "Dulanjaya Thathsara" }],
  creator: "Dulanjaya Thathsara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Dulanjaya Thathsara | Software Engineer",
    description: "Software Engineer with 3+ years experience building modern web applications.",
    siteName: "Dulanjaya Thathsara Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dulanjaya Thathsara | Software Engineer",
    description: "Software Engineer with 3+ years experience building modern web applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="noise-overlay">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
