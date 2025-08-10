"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  // In a real app, this would use i18n context (e.g., next-intl)
  const [lang, setLang] = useState("en");

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    // Here you would typically call a function from your i18n library
    // to change the locale.
  };

  return (
    <div className="flex gap-1 bg-muted p-1 rounded-lg">
      <Button 
        variant={lang === 'en' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => handleLangChange('en')}
        className="text-xs w-10 h-8"
      >
        EN
      </Button>
      <Button 
        variant={lang === 'pa' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => handleLangChange('pa')}
        className="text-xs w-10 h-8"
      >
        PA
      </Button>
    </div>
  );
}
