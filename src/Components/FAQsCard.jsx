import React, { useState } from 'react'

const FAQsCard = ({question, answer}) => {

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-xl w-full flex flex-col ${expanded ? "outline outline-1 outline-red-500" : ""}`}>
      <div onClick={() => setExpanded(!expanded)} className="flex justify-between w-full p-4 hover:cursor-pointer">
        <p className="font-medium text-md">{question}</p>
        <img src={expanded ? "images/chevron-up-solid.svg" : "images/chevron-down-solid.svg"} width={20} alt="" />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-[200px] opacity-100 border-t-[1px] border-red-500" : "max-h-0 opacity-0"
          }`}  >
        <p className="text-gray-700 p-4">{answer}</p>
      </div>


    </div>
  )
}

export default FAQsCard