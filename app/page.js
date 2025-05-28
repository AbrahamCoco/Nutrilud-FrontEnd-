import Image from "next/image";
import { FaAppleAlt, FaHeartbeat, FaLeaf, FaWeight } from "react-icons/fa";

export default function Home() {
  const services = [
    {
      icon: <FaLeaf className="text-3xl text-green-500" />,
      title: "Plan Nutricional Personalizado",
      description: "Diseñamos dietas adaptadas a tus necesidades metabólicas y objetivos de salud.",
    },
    {
      icon: <FaAppleAlt className="text-3xl text-green-500" />,
      title: "Nutrición Clínica",
      description: "Tratamiento nutricional para condiciones como diabetes, hipertensión y obesidad.",
    },
    {
      icon: <FaHeartbeat className="text-3xl text-green-500" />,
      title: "Nutrición Deportiva",
      description: "Optimiza tu rendimiento físico con planes alimenticios especializados.",
    },
    {
      icon: <FaWeight className="text-3xl text-green-500" />,
      title: "Control de Peso",
      description: "Programas integrales para alcanzar y mantener tu peso ideal de forma saludable.",
    },
  ];

  const experts = [
    {
      name: "Dra. Ana Martínez",
      specialty: "Nutrición Clínica",
      img: "/nutriologo1.jpg",
    },
    {
      name: "Dr. Carlos Sánchez",
      specialty: "Nutrición Deportiva",
      img: "/nutriologo2.jpg",
    },
    {
      name: "Lic. Laura García",
      specialty: "Nutrición Infantil",
      img: "/nutriologo3.jpg",
    },
    {
      name: "Dra. Sofía Ramírez",
      specialty: "Trastornos Alimenticios",
      img: "/nutriologo4.jpg",
    },
  ];

  const testimonials = [
    {
      name: "María González",
      text: "Perdí 15 kg de forma saludable y recuperé mi energía. ¡La mejor inversión en mi salud!",
    },
    {
      name: "Juan Pérez",
      text: "Gracias al plan deportivo mejoré mi rendimiento físico un 40% en solo 3 meses.",
    },
    {
      name: "Lucía Fernández",
      text: "Aprendí a comer bien y controlé mi diabetes sin medicamentos agresivos.",
    },
  ];

  return (
    <div className="bg-green-50">
      <header className="py-16 bg-gradient-to-r from-green-700 to-green-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transforma tu salud con <span className="text-yellow-300">nutrición inteligente</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">Programas personalizados basados en evidencia científica para alcanzar tus metas de salud</p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-green-800 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">Agenda tu consulta</button>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Nuestros Servicios Nutricionales</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Soluciones integrales adaptadas a cada etapa de tu vida y condición de salud</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-green-100 rounded-xl shadow-lg hover:shadow-xl p-6 text-center transition duration-300 hover:-translate-y-2">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-green-700 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Nuestro Equipo de Nutriólogos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Profesionales certificados con amplia experiencia en nutrición clínica</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {experts.map((expert, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-2 rounded-full inline-block mb-4">
                  <Image src={expert.img} alt={expert.name} className="rounded-full w-32 h-32 object-cover border-4 border-green-300" />
                </div>
                <h3 className="text-lg font-bold text-green-700">{expert.name}</h3>
                <p className="text-green-600">{expert.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Historias de Éxito</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Lo que dicen nuestros pacientes sobre su transformación</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-start mb-4">
                  <Image src="/client.png" alt={testimonial.name} className="rounded-full w-12 h-12 mr-4" />
                  <div>
                    <p className="font-bold text-green-700">{testimonial.name}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">{`"${testimonial.text}"`}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-700 to-green-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-6">¿Listo para transformar tu salud?</h2>
          <p className="text-xl mb-8">Agenda tu primera consulta y recibe un plan nutricional personalizado</p>
          <button className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">Comienza ahora</button>
        </div>
      </section>
    </div>
  );
}
