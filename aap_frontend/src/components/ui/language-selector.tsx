
import React, { useState } from "react";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Language = {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
];

interface LanguageSelectorProps {
  onChange?: (language: Language) => void;
  className?: string;
}

export const LanguageSelector = ({ onChange, className }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    if (onChange) {
      onChange(language);
    }
    
    // Update document direction based on language RTL property
    document.documentElement.dir = language.rtl ? "rtl" : "ltr";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium",
            className
          )}
        >
          <Globe size={16} />
          <span className="hidden md:inline">{selectedLanguage.flag} {selectedLanguage.name}</span>
          <span className="md:hidden">{selectedLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              language.code === selectedLanguage.code && "bg-muted"
            )}
            onClick={() => handleLanguageChange(language)}
          >
            <span>{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {language.code === selectedLanguage.code && (
              <Check size={16} className="text-sina-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
