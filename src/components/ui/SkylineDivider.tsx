/**
 * Miskolc industrial skyline silhouette — panel blocks + factory chimneys.
 * Used as a decorative top divider in the Footer and bottom of hero/band page.
 */
export function SkylineDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-16 fill-fg"
      >
        {/* Miskolc industrial skyline silhouette */}
        {/* Factory chimneys left */}
        <rect x="20" y="20" width="8" height="60" />
        <rect x="40" y="10" width="6" height="70" />
        <rect x="58" y="25" width="7" height="55" />
        {/* Panel block cluster 1 */}
        <rect x="80" y="30" width="60" height="50" />
        <rect x="85" y="24" width="8" height="6" />
        <rect x="95" y="24" width="8" height="6" />
        <rect x="105" y="24" width="8" height="6" />
        <rect x="115" y="24" width="8" height="6" />
        <rect x="125" y="24" width="8" height="6" />
        {/* Windows panel 1 */}
        <rect x="85" y="36" width="8" height="6" fill="black" />
        <rect x="97" y="36" width="8" height="6" fill="black" />
        <rect x="109" y="36" width="8" height="6" fill="black" />
        <rect x="121" y="36" width="8" height="6" fill="black" />
        <rect x="85" y="48" width="8" height="6" fill="black" />
        <rect x="97" y="48" width="8" height="6" fill="black" />
        <rect x="109" y="48" width="8" height="6" fill="black" />
        <rect x="121" y="48" width="8" height="6" fill="black" />
        {/* Chimney between */}
        <rect x="155" y="15" width="7" height="65" />
        <rect x="170" y="5" width="9" height="75" />
        {/* Panel block cluster 2 */}
        <rect x="190" y="35" width="80" height="45" />
        <rect x="195" y="28" width="10" height="7" />
        <rect x="209" y="28" width="10" height="7" />
        <rect x="223" y="28" width="10" height="7" />
        <rect x="237" y="28" width="10" height="7" />
        <rect x="251" y="28" width="10" height="7" />
        <rect x="195" y="41" width="10" height="7" fill="black" />
        <rect x="209" y="41" width="10" height="7" fill="black" />
        <rect x="223" y="41" width="10" height="7" fill="black" />
        <rect x="237" y="41" width="10" height="7" fill="black" />
        <rect x="251" y="41" width="10" height="7" fill="black" />
        <rect x="195" y="54" width="10" height="7" fill="black" />
        <rect x="209" y="54" width="10" height="7" fill="black" />
        <rect x="223" y="54" width="10" height="7" fill="black" />
        <rect x="237" y="54" width="10" height="7" fill="black" />
        <rect x="251" y="54" width="10" height="7" fill="black" />
        {/* Taller panel block */}
        <rect x="285" y="20" width="50" height="60" />
        <rect x="291" y="14" width="9" height="6" />
        <rect x="303" y="14" width="9" height="6" />
        <rect x="315" y="14" width="9" height="6" />
        <rect x="291" y="26" width="9" height="7" fill="black" />
        <rect x="303" y="26" width="9" height="7" fill="black" />
        <rect x="315" y="26" width="9" height="7" fill="black" />
        <rect x="291" y="39" width="9" height="7" fill="black" />
        <rect x="303" y="39" width="9" height="7" fill="black" />
        <rect x="315" y="39" width="9" height="7" fill="black" />
        <rect x="291" y="52" width="9" height="7" fill="black" />
        <rect x="303" y="52" width="9" height="7" fill="black" />
        <rect x="315" y="52" width="9" height="7" fill="black" />
        {/* Mid cluster chimneys */}
        <rect x="348" y="8" width="8" height="72" />
        <rect x="363" y="18" width="6" height="62" />
        {/* Centre panel blocks */}
        <rect x="385" y="25" width="90" height="55" />
        <rect x="390" y="18" width="11" height="7" />
        <rect x="404" y="18" width="11" height="7" />
        <rect x="418" y="18" width="11" height="7" />
        <rect x="432" y="18" width="11" height="7" />
        <rect x="446" y="18" width="11" height="7" />
        <rect x="460" y="18" width="11" height="7" />
        <rect x="390" y="31" width="11" height="7" fill="black" />
        <rect x="404" y="31" width="11" height="7" fill="black" />
        <rect x="418" y="31" width="11" height="7" fill="black" />
        <rect x="432" y="31" width="11" height="7" fill="black" />
        <rect x="446" y="31" width="11" height="7" fill="black" />
        <rect x="460" y="31" width="11" height="7" fill="black" />
        <rect x="390" y="44" width="11" height="7" fill="black" />
        <rect x="404" y="44" width="11" height="7" fill="black" />
        <rect x="418" y="44" width="11" height="7" fill="black" />
        <rect x="432" y="44" width="11" height="7" fill="black" />
        <rect x="446" y="44" width="11" height="7" fill="black" />
        <rect x="460" y="44" width="11" height="7" fill="black" />
        <rect x="390" y="57" width="11" height="7" fill="black" />
        <rect x="404" y="57" width="11" height="7" fill="black" />
        <rect x="418" y="57" width="11" height="7" fill="black" />
        <rect x="432" y="57" width="11" height="7" fill="black" />
        {/* Right chimneys */}
        <rect x="490" y="12" width="9" height="68" />
        <rect x="507" y="22" width="7" height="58" />
        {/* Right panel blocks */}
        <rect x="528" y="30" width="75" height="50" />
        <rect x="533" y="23" width="10" height="7" />
        <rect x="546" y="23" width="10" height="7" />
        <rect x="559" y="23" width="10" height="7" />
        <rect x="572" y="23" width="10" height="7" />
        <rect x="585" y="23" width="10" height="7" />
        <rect x="533" y="36" width="10" height="7" fill="black" />
        <rect x="546" y="36" width="10" height="7" fill="black" />
        <rect x="559" y="36" width="10" height="7" fill="black" />
        <rect x="572" y="36" width="10" height="7" fill="black" />
        <rect x="585" y="36" width="10" height="7" fill="black" />
        <rect x="533" y="49" width="10" height="7" fill="black" />
        <rect x="546" y="49" width="10" height="7" fill="black" />
        <rect x="559" y="49" width="10" height="7" fill="black" />
        <rect x="572" y="49" width="10" height="7" fill="black" />
        <rect x="585" y="49" width="10" height="7" fill="black" />
        {/* Far right cluster */}
        <rect x="618" y="5" width="8" height="75" />
        <rect x="633" y="15" width="7" height="65" />
        <rect x="652" y="28" width="65" height="52" />
        <rect x="657" y="21" width="9" height="7" />
        <rect x="669" y="21" width="9" height="7" />
        <rect x="681" y="21" width="9" height="7" />
        <rect x="693" y="21" width="9" height="7" />
        <rect x="705" y="21" width="9" height="7" />
        <rect x="657" y="34" width="9" height="7" fill="black" />
        <rect x="669" y="34" width="9" height="7" fill="black" />
        <rect x="681" y="34" width="9" height="7" fill="black" />
        <rect x="693" y="34" width="9" height="7" fill="black" />
        <rect x="705" y="34" width="9" height="7" fill="black" />
        <rect x="657" y="47" width="9" height="7" fill="black" />
        <rect x="669" y="47" width="9" height="7" fill="black" />
        <rect x="681" y="47" width="9" height="7" fill="black" />
        <rect x="693" y="47" width="9" height="7" fill="black" />
        {/* Rightmost chimneys */}
        <rect x="730" y="18" width="8" height="62" />
        <rect x="746" y="10" width="6" height="70" />
        {/* Final panel run */}
        <rect x="766" y="32" width="80" height="48" />
        <rect x="771" y="25" width="10" height="7" />
        <rect x="784" y="25" width="10" height="7" />
        <rect x="797" y="25" width="10" height="7" />
        <rect x="810" y="25" width="10" height="7" />
        <rect x="823" y="25" width="10" height="7" />
        <rect x="836" y="25" width="10" height="7" />
        <rect x="771" y="38" width="10" height="7" fill="black" />
        <rect x="784" y="38" width="10" height="7" fill="black" />
        <rect x="797" y="38" width="10" height="7" fill="black" />
        <rect x="810" y="38" width="10" height="7" fill="black" />
        <rect x="823" y="38" width="10" height="7" fill="black" />
        <rect x="836" y="38" width="10" height="7" fill="black" />
        <rect x="771" y="51" width="10" height="7" fill="black" />
        <rect x="784" y="51" width="10" height="7" fill="black" />
        <rect x="797" y="51" width="10" height="7" fill="black" />
        <rect x="810" y="51" width="10" height="7" fill="black" />
        {/* Far right chimneys */}
        <rect x="860" y="22" width="8" height="58" />
        <rect x="876" y="14" width="7" height="66" />
        {/* Final blocks */}
        <rect x="896" y="35" width="55" height="45" />
        <rect x="901" y="28" width="9" height="7" />
        <rect x="913" y="28" width="9" height="7" />
        <rect x="925" y="28" width="9" height="7" />
        <rect x="937" y="28" width="9" height="7" />
        <rect x="901" y="41" width="9" height="7" fill="black" />
        <rect x="913" y="41" width="9" height="7" fill="black" />
        <rect x="925" y="41" width="9" height="7" fill="black" />
        <rect x="937" y="41" width="9" height="7" fill="black" />
        <rect x="901" y="54" width="9" height="7" fill="black" />
        <rect x="913" y="54" width="9" height="7" fill="black" />
        {/* Edge chimneys */}
        <rect x="964" y="20" width="8" height="60" />
        <rect x="980" y="10" width="6" height="70" />
        <rect x="996" y="28" width="7" height="52" />
        {/* Rightmost blocks */}
        <rect x="1015" y="30" width="60" height="50" />
        <rect x="1020" y="23" width="10" height="7" />
        <rect x="1033" y="23" width="10" height="7" />
        <rect x="1046" y="23" width="10" height="7" />
        <rect x="1059" y="23" width="10" height="7" />
        <rect x="1020" y="36" width="10" height="7" fill="black" />
        <rect x="1033" y="36" width="10" height="7" fill="black" />
        <rect x="1046" y="36" width="10" height="7" fill="black" />
        <rect x="1059" y="36" width="10" height="7" fill="black" />
        <rect x="1020" y="49" width="10" height="7" fill="black" />
        <rect x="1033" y="49" width="10" height="7" fill="black" />
        <rect x="1046" y="49" width="10" height="7" fill="black" />
        {/* Far edge */}
        <rect x="1087" y="18" width="8" height="62" />
        <rect x="1103" y="8" width="6" height="72" />
        <rect x="1120" y="22" width="8" height="58" />
        <rect x="1140" y="32" width="40" height="48" />
        <rect x="1145" y="25" width="9" height="7" />
        <rect x="1157" y="25" width="9" height="7" />
        <rect x="1169" y="25" width="9" height="7" />
        <rect x="1145" y="38" width="9" height="7" fill="black" />
        <rect x="1157" y="38" width="9" height="7" fill="black" />
        <rect x="1169" y="38" width="9" height="7" fill="black" />
        {/* Ground line */}
        <rect x="0" y="78" width="1200" height="2" />
      </svg>
    </div>
  )
}
