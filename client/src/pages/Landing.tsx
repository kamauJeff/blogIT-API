import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center opacity-60"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg">
            BLOGIT
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700 font-medium">
            Capture the thrill, craft the story, inspire the world.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
             asChild
              className="bg-primary text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-accent hover:text-accent-foreground"
                  >
              <Link to="/dashboard">Get Started</Link>
            </Button>


            <Button
              asChild
              variant="outline"
              className="px-6 py-3 rounded-xl text-lg shadow-md"
            >
              <Link to="/register">Register</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="px-6 py-3 rounded-xl text-lg shadow-md"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* <section className="w-full py-16 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Featured Adventures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="rounded-xl shadow-lg overflow-hidden bg-white hover:scale-[1.02] transition">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Beach"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Tropical Escapes</h3>
              <p className="text-gray-600 mt-2">
                Find serenity in the world’s most beautiful beaches.
              </p>
            </div>
          </div>
          
        </div>
      </section> */}

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-white text-center">
        <p className="text-sm">
          © 2025 Lifestyle & Vacations Blog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
