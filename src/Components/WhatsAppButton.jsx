import React from 'react'
import { useTranslation } from "react-i18next";

const WhatsAppButton = () => {

  const { t, i18n } = useTranslation();
  return (
        <div className={`flex gap-2 items-center fixed bottom-10 right-10 z-20 sm:bg-white sm:rounded-3xl sm:px-6 sm:py-2 sm:shadow-xl ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'} `}>
          <p className="text-xl max-sm:hidden">{t('whatsapp')}</p>
          <a href="https://wa.me/971501683111" className="">
            <img
              src="https://img.icons8.com/color/48/000000/whatsapp.png"
              alt=""
              width="75"
            />
          </a>
        </div>
  )
}

export default WhatsAppButton