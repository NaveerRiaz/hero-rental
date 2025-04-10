import React from 'react';
import {useTranslation} from 'react-i18next';
import { formatCurrency, formatNumber } from "../utils";

const RotatingCircle = () => {

  const [t, i18n] = useTranslation();

  return (
    <div className="absolute bottom-36 right-10">
      <div className="relative w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center overflow-visible">
        {/* Rotating Text */}
        <div
          className={`absolute w-full h-full ${
            i18n.language === 'ar'
              ? 'scale-x-[-1] animate-spin-slow-reverse'
              : 'animate-spin-slow'
          }`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50
                   m -35, 0
                   a 35,35 0 1,1 70,0
                   a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text fill="#ef4444" fontSize="16" fontWeight="bold">
              <textPath href="#circlePath" startOffset="0%" direction="ltr">

                {
                  (i18n.language === "ar" ? 
                    `${t("open")} | ${t("open")} | ${t("open")} | ${t("open")} | ${t("open")} | ${t("open")} |` : 
                    `${t("open")} | ${t("open")} | ${t("open")} | ${t("open")} |`)
                }
              </textPath>
            </text>
          </svg>
        </div>

        {/* Pulsing Center Text */}
        <div className="text-red-500 text-2xl font-bold animate-pulse text-center">
          {formatNumber(24, i18n.language)}/{formatNumber(7, i18n.language)}
        </div>
      </div>
    </div>
  );
};

export default RotatingCircle;
