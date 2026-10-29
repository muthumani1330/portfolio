import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muthumani P | Web Developer & AI/Data Science",
  description:
    "Professional portfolio of Muthumani P - Web Developer and AI & Data Science Engineer. Specializing in full-stack web architectures, the Academic Target Tracking System (ATTS), relational database modeling, and IT systems.",
  keywords: [
    "Muthumani P",
    "Web Developer",
    "AI & Data Science",
    "Full-Stack Developer",
    "PHP",
    "MySQL",
    "JavaScript ES6",
    "Academic Target Tracking System",
    "ATTS",
    "Mohamed Sathak Engineering College",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Muthumani P" }],
  openGraph: {
    title: "Muthumani P | Web Developer & AI/Data Science",
    description:
      "Final-year B.Tech student in Artificial Intelligence & Data Science with hands-on experience in full-stack web development, academic management systems, and database-driven applications.",
    type: "website",
    locale: "en_US",
    siteName: "Muthumani P Portfolio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                localStorage.removeItem('portfolio-theme');
                document.documentElement.classList.add('dark');
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
