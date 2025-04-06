// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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
              },
            ],
          },
          about_us: "About Us",
          about_us_text_1:
            "At Hero Car Rental, we are dedicated to providing our customers with the best car rental experience in Dubai. With a wide range of vehicles to choose from, competitive prices, and exceptional customer service, we strive to make your rental experience as smooth and stress-free as possible.",
          about_us_text_2:
            "Our fleet of cars includes everything from economy cars to luxury vehicles, so whether you’re traveling for business or pleasure, we have the perfect car to suit your needs. We also offer a variety of rental options, including short-term and long-term rentals, daily, weekly and monthly rentals, to accommodate your specific needs.",
          about_us_text_3:
            "At Hero Car Rental, we understand that your time is valuable, that's why we offer 24/7 customer support to assist you with any questions or concerns you may have. Our team of experts will guide you through the rental process and ensure that you have a pleasant and enjoyable experience.",
          about_us_text_4:
            "We are committed to providing our customers with the highest level of service and ensure that all our vehicles are well maintained and in excellent condition. Our goal is to make your car rental experience as convenient and hassle-free as possible, so you can focus on enjoying your trip to Dubai.",
          copyright_head: "Copyright",
          copyright_tail: "2025 All rights reserved",
          per_day: "per day",
          cars: "Cars",
          cars_rented: "Cars Rented",
          customers: "Customers",
          years_in_business: "Years in Business",
          address: "Abu Hail, Dubai UAE",
          done: "Done",
          price_per_day: "Price per day",
          class: "Class",
          brand: "Brand",
          from: "From",
          to: "To",
          aed: "AED",
          doors: "Doors",
          seats: "Seats",
          name: "Name",
          phone_number: "Phone Number",
          date_from: "Date From",
          date_to: "Date To",
          loading: "Loading",
          make: "make",
          model: "model",
          colour: "color",
          type: "type",
          send_enquiry: "Send enquiry",
          please_wait: "Please wait",
          client_feedback: "Rented a car for a road trip, it was perfect! Highly recommend!",
          client_section_title: "Our client says",
          find_your: "Find your",
          perfect_ride: "Perfect ride",
          in_dubai: "in Dubai",
        },
      },
      ar: {
        translation: {
          home: "الرئيسية",
          about: "من نحن",
          FAQs: "الأسئلة الشائعة",
          vehicles: "السيارات",
          filters: "الفلاتر",
          luxury: " الفارهة",
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
              },
            ],
          },
          about_us: "من نحن",
          about_us_text_1:
            "في هيرو لتأجير السيارات، نحن ملتزمون بتقديم أفضل تجربة تأجير سيارات لعملائنا في دبي. مع مجموعة واسعة من المركبات للاختيار من بينها، وأسعار تنافسية، وخدمة عملاء استثنائية، نسعى جاهدين لجعل تجربة التأجير الخاصة بك سلسة وخالية من التوتر قدر الإمكان.",
          about_us_text_2:
            "تشمل أسطولنا من السيارات كل شيء من السيارات الاقتصادية إلى المركبات الفاخرة، لذا سواء كنت تسافر لأغراض العمل أو الترفيه، لدينا السيارة المثالية لتلبية احتياجاتك. نحن نقدم أيضًا مجموعة متنوعة من خيارات التأجير، بما في ذلك التأجير قصير الأجل وطويل الأجل، والتأجير اليومي والأسبوعي والشهري، لتلبية احتياجاتك المحددة.",
          about_us_text_3:
            "في هيرو لتأجير السيارات، نفهم أن وقتك ثمين، ولهذا السبب نقدم دعم العملاء على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي أسئلة أو مخاوف قد تكون لديك. سيوجهك فريق الخبراء لدينا خلال عملية التأجير ويضمن لك تجربة ممتعة ومريحة.",
          about_us_text_4:
            "نحن ملتزمون بتقديم أعلى مستوى من الخدمة لعملائنا ونضمن أن جميع مركباتنا يتم صيانتها جيدًا وفي حالة ممتازة. هدفنا هو جعل تجربة تأجير سيارتك مريحة وخالية من المتاعب قدر الإمكان، حتى تتمكن من التركيز على الاستمتاع برحلتك إلى دبي.",
          copyright_head: "حقوق الطبع والنشر",
          copyright_tail: "2025 جميع الحقوق محفوظة",
          per_day: "في اليوم",
          cars: "السيارات",
          cars_rented: "السيارات المستأجرة",
          customers: "العملاء",
          years_in_business: "سنوات في العمل",
          address: "أبو هيل، دبي الإمارات العربية المتحدة",
          done: "تم",
          price_per_day: "السعر في اليوم",
          brand: "العلامة التجارية",
          class: "الفئة",
          from: "من",
          to: "إلى",
          aed: "درهم",
          doors: "الأبواب",
          seats: "المقاعد",
          name: "الاسم",
          phone_number: "رقم الهاتف",
          date_from: "التاريخ من",
          date_to: "التاريخ إلى",
          loading: "جارٍ التحميل",
          make: "الشركة المصنعة",
          model: "الطراز",
          colour: "اللون",
          type: "النوع",
          send_enquiry: "إرسال الاستفسار",
          please_wait: "انتظر من فضلك",
          client_feedback: "استأجرتُ سيارةً لرحلةٍ برية، كانت مثالية! أنصح بها بشدة!",
          client_section_title: "يقول عميلنا",
          find_your: "ابحث عن",
          perfect_ride: "سيارتك المثالية",
          in_dubai: "في دبي",
        },
      },
    },
  });

export default i18n;
