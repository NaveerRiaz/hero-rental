// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { whatsapp } from "fontawesome";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources: {        
      en: {
        translation: {
          home: "Home",
          about: "About",
          FAQs: "FAQs",
          vehicles: "Vehicles",
          filters: "Filters",
          luxury: "Luxury",
          economy: "Economy",
          sale4: "Book for 4 or more days and get an exclusive discount!",
          whatsapp: "How can we help you?",
          faqs_items: {
            title: "Frequently Asked Questions",
            learnMore: "Learn More",
            items: [
              {
                question: "Do you offer any sort of warranty?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              },
              {
                question: "When should I get my oil changed?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              },
              {
                question: "How do I check my tire pressure?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              },
              {
                question: "How often should I rotate my tires?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              },
              {
                question: "What is Auto Detailing?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              },
              {
                question: "Is it urgent to fix an oil leak?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              },
              {
                question: "What causes brake pulsation?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              },
              {
                question: "Why is it important to rotate tires?",
                answer:
                  "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
              }
            ]
          },
          about_us: "About Us",
          about_us_text_1: "At Hero Car Rental, we are dedicated to providing our customers with the best car rental experience in Dubai. With a wide range of vehicles to choose from, competitive prices, and exceptional customer service, we strive to make your rental experience as smooth and stress-free as possible.",
          about_us_text_2: "Our fleet of cars includes everything from economy cars to luxury vehicles, so whether you’re traveling for business or pleasure, we have the perfect car to suit your needs. We also offer a variety of rental options, including short-term and long-term rentals, daily, weekly and monthly rentals, to accommodate your specific needs.",
          about_us_text_3: "At Hero Car Rental, we understand that your time is valuable, that's why we offer 24/7 customer support to assist you with any questions or concerns you may have. Our team of experts will guide you through the rental process and ensure that you have a pleasant and enjoyable experience.",
          about_us_text_4: "We are committed to providing our customers with the highest level of service and ensure that all our vehicles are well maintained and in excellent condition. Our goal is to make your car rental experience as convenient and hassle-free as possible, so you can focus on enjoying your trip to Dubai.",
        },
      },
      ar: {
        translation: {
          home: "الرئيسية",
          about: "حول",
          FAQs: "الأسئلة الشائعة",
          vehicles: "المركبات",
          filters: "الفلاتر",
          luxury: "الفخمة",
          economy: "الاقتصادية",
          sale4: "احجز لمدة 4 أيام أو أكثر واحصل على خصم حصري!",
          whatsapp: "كيف يمكننا مساعدتك؟",
          faqs_items: {
            title: "الأسئلة الشائعة",
            learnMore: "اعرف المزيد",
            items: [
              {
                question: "هل تقدمون أي نوع من الضمان؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              },
              {
                question: "متى يجب تغيير زيت المحرك؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              },
              {
                question: "كيف أتحقق من ضغط الإطارات؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              },
              {
                question: "كم مرة يجب تدوير الإطارات؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              },
              {
                question: "ما هو تنظيف السيارة بالتفصيل؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              },
              {
                question: "هل من الضروري إصلاح تسرب الزيت؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              },
              {
                question: "ما الذي يسبب اهتزاز الفرامل؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              },
              {
                question: "لماذا من المهم تدوير الإطارات؟",
                answer:
                  "يمكننا مساعدتك في خطة التمويل الخاصة بك، وتقديم بعض النصائح والحيل. انطلق بهذا الحلم بغض النظر عن تاريخك الائتماني.",
              }
            ]
          },
          about_us: "من نحن",
          about_us_text_1: "في Hero Car Rental، نحن ملتزمون بتقديم أفضل تجربة تأجير سيارات لعملائنا في دبي. مع مجموعة واسعة من المركبات للاختيار من بينها، وأسعار تنافسية، وخدمة عملاء استثنائية، نسعى جاهدين لجعل تجربة التأجير الخاصة بك سلسة وخالية من التوتر قدر الإمكان.",
          about_us_text_2: "تشمل أسطولنا من السيارات كل شيء من السيارات الاقتصادية إلى المركبات الفاخرة، لذا سواء كنت تسافر لأغراض العمل أو الترفيه، لدينا السيارة المثالية لتلبية احتياجاتك. نحن نقدم أيضًا مجموعة متنوعة من خيارات التأجير، بما في ذلك التأجير قصير الأجل وطويل الأجل، والتأجير اليومي والأسبوعي والشهري، لتلبية احتياجاتك المحددة.",
          about_us_text_3: "في Hero Car Rental، نفهم أن وقتك ثمين، ولهذا السبب نقدم دعم العملاء على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي أسئلة أو مخاوف قد تكون لديك. سيوجهك فريق الخبراء لدينا خلال عملية التأجير ويضمن لك تجربة ممتعة ومريحة.",
          about_us_text_4: "نحن ملتزمون بتقديم أعلى مستوى من الخدمة لعملائنا ونضمن أن جميع مركباتنا يتم صيانتها جيدًا وفي حالة ممتازة. هدفنا هو جعل تجربة تأجير سيارتك مريحة وخالية من المتاعب قدر الإمكان، حتى تتمكن من التركيز على الاستمتاع برحلتك إلى دبي.",
        },
      },
    },
  });

export default i18n;
