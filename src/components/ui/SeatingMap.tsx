import React from "react";

export function SeatingMap() {
  return (
    <div className="w-full max-w-5xl p-2 md:p-6">
      <svg
        viewBox="0 0 943 828"
        className="w-full h-auto drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)]"
      >
        {/* STAGE */}
        <rect x="343" y="21" width="255" height="103" fill="#d0d0d0" />
        <text
          x="470"
          y="77"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
        >
          STAGE
        </text>

        {/* STAGE SHADOWS */}
        <rect x="344" y="123" width="102" height="16" fill="#4a4a4a" />
        <rect x="494" y="123" width="104" height="16" fill="#4a4a4a" />

        {/* CENTER STEM */}
        <rect x="444" y="124" width="52" height="214" fill="#cfcfcf" />
        <rect x="444" y="321" width="52" height="17" fill="#555" />

        {/* FESTIVAL */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#ff3d1f"
          points="
          344,140
          442,140
          442,339
          497,339
          497,140
          599,140
          599,575
          344,575
          "
        />

        {/* CAT 3B OUTER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#efb865"
          points="
          86,319
          214,190
          214,343
          86,343
          "
        />

        {/* CAT 3B INNER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#efb865"
          points="
          225,185
          333,140
          333,347
          225,347
          "
        />

        {/* CAT 3A INNER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#efb865"
          points="
          610,140
          718,185
          718,347
          610,347
          "
        />

        {/* CAT 3A OUTER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#efb865"
          points="
          729,190
          856,285
          856,343
          729,343
          "
        />

        {/* DARK STRIPS */}
        <rect x="86" y="343" width="128" height="13" fill="#5b4c2b" />
        <rect x="225" y="343" width="108" height="13" fill="#5b4c2b" />
        <rect x="610" y="343" width="108" height="13" fill="#5b4c2b" />
        <rect x="729" y="343" width="127" height="13" fill="#5b4c2b" />

        {/* CAT 2B OUTER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#46db5e"
          points="
          86,356
          214,356
          214,738
          86,763
          "
        />

        {/* CAT 2B INNER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#59ec67"
          points="
          225,356
          333,356
          333,575
          225,607
          "
        />

        {/* CAT 2A INNER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#59ec67"
          points="
          610,356
          718,356
          718,607
          610,575
          "
        />

        {/* CAT 2A OUTER */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#46db5e"
          points="
          729,356
          856,356
          856,763
          729,738
          "
        />

        {/* FLOOR EDGE */}
        <polygon
          fill="#3d5f4a"
          points="
          86,725
          214,608
          333,575
          610,575
          729,608
          856,725
          856,762
          86,762
          "
        />

        {/* CAT 1 */}
        <polygon
          className="transition-all duration-200 cursor-pointer hover:brightness-110 hover:opacity-85"
          fill="#66c6d7"
          points="
          214,608
          333,575
          610,575
          729,608
          843,725
          100,725
          "
        />

        {/* FRONT BASE */}
        <rect x="99" y="725" width="744" height="15" fill="#24454a" />

        {/* FOH */}
        <rect x="439" y="520" width="63" height="52" rx="4" fill="#d0d0d0" />
        <rect x="439" y="516" width="63" height="8" fill="#222" />

        {/* LABELS */}
        <text x="150" y="328" textAnchor="middle" fontSize="18" fontWeight="700">CAT 3B</text>
        <text x="278" y="265" textAnchor="middle" fontSize="18" fontWeight="700">CAT 3B</text>
        <text x="664" y="265" textAnchor="middle" fontSize="18" fontWeight="700">CAT 3A</text>
        <text x="793" y="328" textAnchor="middle" fontSize="18" fontWeight="700">CAT 3A</text>
        <text x="150" y="528" textAnchor="middle" fontSize="18" fontWeight="700">CAT 2B</text>
        <text x="278" y="495" textAnchor="middle" fontSize="18" fontWeight="700">CAT 2B</text>
        <text x="664" y="495" textAnchor="middle" fontSize="18" fontWeight="700">CAT 2A</text>
        <text x="793" y="528" textAnchor="middle" fontSize="18" fontWeight="700">CAT 2A</text>
        <text x="471" y="422" textAnchor="middle" fontSize="18" fontWeight="700">FESTIVAL</text>
        <text x="471" y="551" textAnchor="middle" fontSize="18" fontWeight="700">FOH</text>
        <text x="471" y="619" textAnchor="middle" fontSize="18" fontWeight="700">CAT 1</text>
        <text x="471" y="688" textAnchor="middle" fontSize="18" fontWeight="700">CAT 1</text>
      </svg>
    </div>
  );
}
