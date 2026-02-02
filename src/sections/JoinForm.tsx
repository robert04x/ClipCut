import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const JoinForm = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    numeComplet: "",
    email: "",
    numarTelefon: "",
    locatiaFrizeriei: "",
    oras: "",
    judet: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Aplicația a fost trimisă cu succes!');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("YOUR_WEB_APP_URL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numeComplet: "",
      email: "",
      numarTelefon: "",
      locatiaFrizeriei: "",
      oras: "",
      judet: "",
    }),
  });

  const result = await response.json();

  if (result.success) {
    alert("Datele au fost trimise!");
  } else {
    alert("Eroare la trimitere");
  }
};

  const counties = [
    'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brașov',
    'Brăila', 'București', 'Buzău', 'Caraș-Severin', 'Călărași', 'Cluj', 'Constanța',
    'Covasna', 'Dâmbovița', 'Dolj', 'Galați', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara',
    'Ialomița', 'Iași', 'Ilfov', 'Maramureș', 'Mehedinți', 'Mureș', 'Neamț', 'Olt',
    'Prahova', 'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava', 'Teleorman', 'Timiș', 'Tulcea',
    'Vaslui', 'Vâlcea', 'Vrancea'
  ];

  const cities = [
    'București', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Brașov', 'Galați',
    'Craiova', 'Ploiești', 'Oradea', 'Brăila', 'Arad', 'Sibiu', 'Bacău', 'Târgu Mureș',
    'Baia Mare', 'Buzău', 'Botoșani', 'Satu Mare', 'Râmnicu Vâlcea', 'Drobeta-Turnu Severin',
    'Suceava', 'Piatra Neamț', 'Târgu Jiu', 'Slatina', 'Focșani', 'Bistrița', 'Tulcea',
    'Reșița', 'Călărași', 'Alba Iulia', 'Giurgiu', 'Deva', 'Hunedoara', 'Zalău',
    'Sfântu Gheorghe', 'Miercurea Ciuc', 'Alexandria', 'Gheorgheni', 'Roman'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { rotateX: -60, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form 3D entrance
      gsap.fromTo(
        formRef.current,
        { rotateY: -45, opacity: 0, x: -50 },
        {
          rotateY: 0,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
      duration: 0.3,
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      scale: 1,
      boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
      duration: 0.3,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="join"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-8 sm:mb-12 px-4" style={{ transformStyle: 'preserve-3d' }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 shiny-text">
            Alătură-te ClipCut
          </h2>
          <p className="text-white/60 text-sm sm:text-base md:text-lg">
            Devino partenerul nostru.
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card-3d rounded-xl sm:rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="fullName" className="text-white/80 text-sm sm:text-base">
                Nume Complet
              </Label>
              <Input
                id="fullName"
                placeholder="Popescu Ion"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/50 text-sm sm:text-base h-10 sm:h-12"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-white/80 text-sm sm:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ion.popescu@exemplu.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/50 text-sm sm:text-base h-10 sm:h-12"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="phone" className="text-white/80 text-sm sm:text-base">
                Număr de Telefon
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="07xxxxxxxx"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/50 text-sm sm:text-base h-10 sm:h-12"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="location" className="text-white/80 text-sm sm:text-base">
                Locația Frizeriei
              </Label>
              <Input
                id="location"
                placeholder="Str. Exemplu nr. 10"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/50 text-sm sm:text-base h-10 sm:h-12"
              />
            </div>

            {/* City */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="city" className="text-white/80 text-sm sm:text-base">
                Oraș
              </Label>
              <Select
                value={formData.city}
                onValueChange={(value) =>
                  setFormData({ ...formData, city: value })
                }
              >
                <SelectTrigger className="bg-black/50 border-white/20 text-white hover:border-white/40 transition-colors text-sm sm:text-base h-10 sm:h-12">
                  <SelectValue placeholder="Selectează orașul" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/20 max-h-60">
                  {cities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                      className="text-white hover:bg-white/10 text-sm"
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* County */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="county" className="text-white/80 text-sm sm:text-base">
                Județ
              </Label>
              <Select
                value={formData.county}
                onValueChange={(value) =>
                  setFormData({ ...formData, county: value })
                }
              >
                <SelectTrigger className="bg-black/50 border-white/20 text-white hover:border-white/40 transition-colors text-sm sm:text-base h-10 sm:h-12">
                  <SelectValue placeholder="Selectează județul" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/20 max-h-60">
                  {counties.map((county) => (
                    <SelectItem
                      key={county}
                      value={county}
                      className="text-white hover:bg-white/10 text-sm"
                    >
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="btn-3d w-full bg-white text-black hover:bg-white/90 font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg mt-4 sm:mt-6"
          >
            Trimite Aplicația
          </Button>
        </form>
      </div>
    </section>
  );
};

export default JoinForm;
