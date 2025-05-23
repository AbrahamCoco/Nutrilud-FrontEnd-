import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contactInfo = [
    {
      label: 'Teléfono',
      value: '246 265 3921',
      link: 'https://wa.me/2462653921',
      icon: <BsWhatsapp className="inline ml-1" />,
    },
    {
      label: 'Email',
      value: 'karinetza09@gmail.com',
      link: 'mailto:karinetza09@gmail.com',
    },
    { label: 'Horario', value: 'Lunes a Viernes 9:00 AM - 5:00 PM' },
  ];

  const socialLinks = [
    { href: '#', icon: <FaFacebook className="text-xl" />, label: 'Facebook' },
    {
      href: '#',
      icon: <FaInstagram className="text-xl" />,
      label: 'Instagram',
    },
    { href: '#', icon: <FaTwitter className="text-xl" />, label: 'Twitter' },
  ];

  const resourcesLinks = [
    { href: '/articulo', label: 'Artículos de nutrición' },
    { href: '/servicios', label: 'Nuestros servicios' },
    { href: '/nutriologos', label: 'Equipo de nutriólogos' },
  ];

  return (
    <footer className="bg-green-700 text-white mt-auto">
      <div className="mx-auto px-3 sm:px-3 lg:px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="space-y-4">
            <h5 className="text-lg font-bold text-green-100">Contacto</h5>
            <ul className="space-y-2">
              {contactInfo.map((info, index) => (
                <li key={index} className="text-green-50">
                  <span className="font-medium">{info.label}:</span>{' '}
                  {info.link ? (
                    <Link
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-200"
                    >
                      {info.value} {info.icon}
                    </Link>
                  ) : (
                    <span>{info.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4">
            <h5 className="text-lg font-bold text-green-100 text-center">
              Síguenos
            </h5>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white hover:text-green-200 transition-colors duration-200 flex items-center justify-center w-8 h-8"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <p className="text-green-50 text-center">
              Mantente al día con nuestras últimas noticias y consejos de
              nutrición.
            </p>
          </div>

          {/* Recursos útiles */}
          <div className="space-y-4 text-end">
            <h5 className="text-lg font-bold text-green-100">Recursos</h5>
            <ul className="space-y-2">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-green-50 hover:text-green-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="mt-8 pt-6 border-t border-green-700 text-center text-green-100">
          <p>
            &copy; {currentYear} NutriLud - Todos los derechos reservados |
            Desarrollado por{' '}
            <Link
              href="https://github.com/DevCraftersMx"
              target="_blank"
              className="text-white hover:text-green-200 transition-colors duration-200"
            >
              DevCraftersMx
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
