"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, MapPin, Phone, Globe, ExternalLink, 
  ShieldCheck, HeartHandshake, Building, Map as MapIcon,
  Navigation, Loader2
} from "lucide-react";

const CATEGORIES = [
  "All", "Legal Aid Centers", "NGOs", "Women Support Services", 
  "Consumer Forums", "Cyber Crime Centers"
];

const STATES_CITIES = {
  "All India": ["All Cities"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Delhi": ["New Delhi", "Gurugram", "Noida"],
  "Karnataka": ["Bangalore", "Mysore"],
  "West Bengal": ["Kolkata", "Howrah"],
  "Tamil Nadu": ["Chennai", "Coimbatore"]
};

const CENTERS = [
  // Maharashtra
  { id: 1, name: "State Legal Services Authority", type: "Legal Aid Centers", dist: "1.2 km", address: "High Court Compound, Fort, Mumbai", phone: "1800-222-333", icon: Building, state: "Maharashtra", city: "Mumbai" },
  { id: 2, name: "Majlis Legal Centre", type: "Women Support Services", dist: "3.5 km", address: "Kalina, Santacruz East, Mumbai", phone: "022-2666-1252", icon: HeartHandshake, state: "Maharashtra", city: "Mumbai" },
  { id: 3, name: "Mumbai Cyber Cell", type: "Cyber Crime Centers", dist: "5.0 km", address: "BKC Police Station, Bandra, Mumbai", phone: "1930", icon: ShieldCheck, state: "Maharashtra", city: "Mumbai" },
  { id: 4, name: "Pune Legal Aid Clinic", type: "Legal Aid Centers", dist: "2.1 km", address: "Shivajinagar, Pune", phone: "020-2551-1234", icon: Building, state: "Maharashtra", city: "Pune" },
  
  // Delhi
  { id: 5, name: "Delhi State Legal Services Authority", type: "Legal Aid Centers", dist: "4.2 km", address: "Patiala House Courts, New Delhi", phone: "1516", icon: Building, state: "Delhi", city: "New Delhi" },
  { id: 6, name: "Gurugram Cyber Crime Cell", type: "Cyber Crime Centers", dist: "8.5 km", address: "Sector 43, Gurugram", phone: "1930", icon: ShieldCheck, state: "Delhi", city: "Gurugram" },
  { id: 7, name: "Sakti Shalini NGO", type: "Women Support Services", dist: "6.0 km", address: "Okhla, New Delhi", phone: "011-2437-3736", icon: HeartHandshake, state: "Delhi", city: "New Delhi" },
  
  // Karnataka
  { id: 8, name: "Bangalore Mediation Centre", type: "Legal Aid Centers", dist: "3.3 km", address: "Nyaya Degula, Siddaiah Road, Bangalore", phone: "080-2295-4646", icon: Building, state: "Karnataka", city: "Bangalore" },
  { id: 9, name: "Vimochana", type: "Women Support Services", dist: "5.1 km", address: "Domlur, Bangalore", phone: "080-2554-6999", icon: HeartHandshake, state: "Karnataka", city: "Bangalore" },
  
  // West Bengal
  { id: 10, name: "Kolkata Legal Aid Services", type: "Legal Aid Centers", dist: "2.8 km", address: "Bankshall Court, Kolkata", phone: "033-2248-2345", icon: Building, state: "West Bengal", city: "Kolkata" },
  { id: 11, name: "Consumer Protection Forum WB", type: "Consumer Forums", dist: "4.5 km", address: "Bhavani Bhawan, Kolkata", phone: "1800-345-2808", icon: Building, state: "West Bengal", city: "Kolkata" },
  
  // Tamil Nadu
  { id: 12, name: "Chennai State Legal Services", type: "Legal Aid Centers", dist: "1.5 km", address: "North Fort Road, High Court Campus, Chennai", phone: "044-2534-2834", icon: Building, state: "Tamil Nadu", city: "Chennai" },
  { id: 13, name: "PCVC - International Foundation", type: "Women Support Services", dist: "7.2 km", address: "Anna Nagar, Chennai", phone: "044-4311-1143", icon: HeartHandshake, state: "Tamil Nadu", city: "Chennai" },
];

export default function LegalAidDiscoveryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All India");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  
  const [isLocating, setIsLocating] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // If state changes, reset city to "All Cities"
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity("All Cities");
  };

  const handleEnableLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setLocationEnabled(true);
      // Auto-set to Delhi for the mockup effect
      setSelectedState("Delhi");
      setSelectedCity("New Delhi");
    }, 1500);
  };

  const filteredCenters = CENTERS.filter(center => {
    const matchesCategory = activeCategory === "All" || center.type === activeCategory;
    const matchesState = selectedState === "All India" || center.state === selectedState;
    const matchesCity = selectedCity === "All Cities" || center.city === selectedCity;
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          center.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesState && matchesCity && matchesSearch;
  });

  // Determine what map to show based on selection
  const mapQuery = selectedCity !== "All Cities" 
    ? `${selectedCity}, ${selectedState}` 
    : selectedState !== "All India" 
      ? selectedState 
      : "India";

  return (
    <div className="max-w-6xl mx-auto pb-12 h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Legal Aid Discovery</h1>
        <p className="text-muted-foreground">Find free or subsidized legal assistance and support centers near you.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Directory */}
        <div className="lg:w-[55%] flex flex-col h-full bg-background border border-border rounded-xl shadow-sm overflow-hidden">
          
          {/* Search & Filters Fixed Header */}
          <div className="p-4 border-b border-border bg-secondary/20 space-y-4">
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9 bg-background h-10" 
                  placeholder="Search NGOs, clinics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedState}
                onChange={handleStateChange}
              >
                {Object.keys(STATES_CITIES).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>

              <select 
                className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={selectedState === "All India"}
              >
                {STATES_CITIES[selectedState as keyof typeof STATES_CITIES].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <Button 
                  key={cat} 
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap rounded-full text-xs"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Scrolling List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredCenters.map((center) => {
              const Icon = center.icon;
              return (
                <Card key={center.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{center.name}</h3>
                          <span className="text-xs font-semibold text-primary">{center.type}</span>
                        </div>
                      </div>
                      <div className="text-xs font-bold bg-secondary px-2 py-1 rounded text-muted-foreground flex items-center gap-1 shrink-0">
                        <Navigation className="h-3 w-3" /> {center.dist}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{center.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0" />
                        <span>{center.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-xs h-8">
                        <Globe className="mr-2 h-3 w-3" /> Website
                      </Button>
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(center.name + ', ' + center.address)}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="text-xs h-8">
                          Get Directions <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredCenters.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <MapIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p>No legal centers found in this region.</p>
                <Button variant="link" onClick={() => { setSelectedState("All India"); setSelectedCity("All Cities"); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Map Integration */}
        <div className="lg:w-[45%] h-[400px] lg:h-full rounded-xl border border-border bg-secondary/30 relative overflow-hidden flex flex-col items-center justify-center">
          
          {locationEnabled || selectedState !== "All India" ? (
            <iframe 
              src={`https://maps.google.com/maps?q=Legal%20Aid%20Centers%20${encodeURIComponent(mapQuery)}&t=&z=11&ie=UTF8&iwloc=&output=embed`} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0"
            />
          ) : (
            <>
              {/* Abstract Map Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              <div className="z-10 bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-border shadow-lg text-center max-w-sm mx-4">
                <div className="mx-auto h-16 w-16 bg-primary/10 flex items-center justify-center rounded-full mb-4">
                  <MapIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enable location services or select a state and city to view Legal Aid Centers in your area.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleEnableLocation}
                  disabled={isLocating}
                >
                  {isLocating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Locating...</> : "Enable Location Services"}
                </Button>
              </div>

              {/* Decorative Map Pins */}
              <div className="absolute top-1/4 left-1/4 animate-bounce [animation-delay:-0.2s]">
                <MapPin className="h-8 w-8 text-primary drop-shadow-md" />
              </div>
              <div className="absolute top-1/2 right-1/4 animate-bounce [animation-delay:-0.5s]">
                <MapPin className="h-8 w-8 text-emerald-500 drop-shadow-md" />
              </div>
              <div className="absolute bottom-1/4 left-1/2 animate-bounce">
                <MapPin className="h-8 w-8 text-amber-500 drop-shadow-md" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
