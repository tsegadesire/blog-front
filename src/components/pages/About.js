
import './About.css'; // Optional: for custom styling

const About = () => {
  return (
    <div className="about-container w-full ">
      <section className="intro">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center space-x-2">
         About
          <img 
                src="/techethio-logo.png" 
                alt="TechEthio Logo" 
                className="h-8 md:h-9 object-contain" // Adjust height as needed
              /> 
          </h1>
        <p><strong>One Click to the Future of Your Business</strong></p>
        <p>
          Techethio is a tech powerhouse rooted in Ethiopia, with global reach through our sister company Tech1 Factory LLC in the USA.
          We specialize in scalable, secure, and elegant digital solutions that empower businesses across Africa and beyond.
        </p>
      </section>

      <section className="mission">
        <h2>🚀 Our Mission</h2>
        <p>
          To revolutionize how African businesses grow by delivering tailored, tech-driven solutions that are just a click away —
          blending innovation, integrity, and impact.
        </p>
      </section>

      <section className="services">
        <h2>💼 What We Do</h2>
        <ul>
          <li><strong>ERP Development:</strong> Streamline operations, automate workflows, and make smarter decisions.</li>
          <li><strong>Website & Mobile App Development:</strong> Build responsive platforms that reflect your brand and drive results.</li>
          <li><strong>Server Renting & Hosting:</strong> Secure, scalable infrastructure for seamless business operations.</li>
          <li><strong>Digital Marketing:</strong> Data-driven campaigns that grow your brand and convert leads.</li>
        </ul>
      </section>

      <section className="offers">
        <h2>🌟 Special Offers</h2>
        <div>
          <h3>🔹 ProSync</h3>
          <p>
            Empowering Ethiopian SMEs with advanced tools to optimize processes, boost productivity, and stay competitive.
          </p>
          <h3>🔹 El ERP</h3>
          <p>
            A transformative ERP solution designed to centralize operations, enhance decision-making, and drive sustainable growth.
          </p>
        </div>
      </section>

      <section className="clients">
        <h2>🤝 Our Clients</h2>
        <ul>
          <li>Kleand Panda</li>
          <li>Kenema Pharmacy</li>
          <li>Share Gebeya</li>
          <li>Yop Coffee</li>
          <li>Smart Transporting</li>
        </ul>
      </section>

      <section className="team">
        <h2>👥 Meet the Team</h2>
        <ul>
          <li><strong>Michael B</strong> – Founder</li>
          <li><strong>Abiy F</strong> – Deputy CEO</li>
          <li><strong>Filimon F</strong> – Operational Manager</li>
          <li><strong>Mekuriya W</strong> – CTO</li>
          <li>…and more passionate professionals driving innovation forward.</li>
        </ul>
      </section>

      <section className="tech-stack">
        <h2>🔐 Built with Security and Elegance</h2>
        <p>
          This blog platform reflects our commitment to transparency, knowledge sharing, and digital excellence. Built with React, Node.js,
          and JWT-based authentication, it features:
        </p>
        <ul>
          <li>Secure backend architecture</li>
          <li>Elegant, branded UI/UX</li>
          <li>Admin-level content management</li>
          <li>Scalable, maintainable codebase</li>
        </ul>
      </section>

      <section className="cta">
        <h2>📍 Let’s Build the Future Together</h2>
        <p>
          Whether you're a startup or an established enterprise, Techethio is ready to help you scale, secure, and succeed — one click at a time.
        </p>
      </section>
    </div>
  );
};

export default About;
