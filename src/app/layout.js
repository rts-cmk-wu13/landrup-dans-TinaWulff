import { Ubuntu } from "next/font/google";
import "./globals.css";
import FooterOrMenu from "./components/FooterOrMenu";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Landrup Dans App",
  description: "Landrup danseskole app, her kan du se hvilke hold der udbydes og tilmelde dig.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="da">
      <body
        className={`${ubuntu.variable} antialiased`}
      >
        <main>
       {children}
        </main>
      <FooterOrMenu />
      </body>
    </html>
  );
}


// lav så footer kun findes på homepage og menu på alle andre sider end homepage.
