import * as React from "react";
import { AlgolIcon } from "../../types";

type IconProps = {
  /** Which type of piece it is */
  icon: AlgolIcon;
  /** Which player controls the piece */
  owner: 0 | 1 | 2;
  /** Whether the icon should wiggle */
  wiggle?: boolean;
};

/**
 * A component to show a playing piece icon. Used by the Piece component.
 */
export const Icon: React.FunctionComponent<IconProps> = ({
  owner,
  icon,
  wiggle
}) => {
  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <svg
        viewBox="0 150 300 300"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <g>
          {wiggle && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 150 300; -10 150 300; 10 150 300; 0 150 300"
              dur="1s"
              repeatCount="indefinite"
              calcMode="ease"
            />
          )}
          <path
            d={solids[icon]}
            style={{
              fill: fills[owner],
              transition: "fill 0.3s ease, stroke 0.3s ease"
            }}
          />
          <path
            d={hollows[icon]}
            style={{
              fill: strokes[owner],
              transition: "fill 0.3s ease, stroke 0.3s ease"
            }}
          />
        </g>
      </svg>
    </div>
  );
};

const fills = ["lightyellow", "lightpink", "lightsteelblue"];
const strokes = ["orange", "darkred", "darkblue"];

const solids = {
  bishop:
    "M262.9688 415.5469 L231.3281 415.5469 Q231.3281 410.625 223.1719 410.625 Q221.3438 410.625 209.1094 412.1719 Q188.2969 414.7031 183.2344 414.7031 Q167.2031 414.7031 156.4453 407.8125 Q145.6875 400.9219 143.4375 389.1094 Q141.1875 400.9219 130.4297 407.8125 Q119.6719 414.7031 103.6406 414.7031 Q98.5781 414.7031 77.7656 412.1719 Q65.3906 410.625 63.7031 410.625 Q55.5469 410.625 55.5469 415.5469 L23.9062 415.5469 L23.9062 408.6562 Q23.9062 401.9062 29.1094 394.875 Q34.3125 387.8438 44.7891 383.6953 Q55.2656 379.5469 70.3125 379.5469 Q77.0625 379.5469 89.2969 381.375 Q97.7344 382.6406 101.1094 382.6406 Q109.6875 382.6406 113.625 380.6016 Q117.5625 378.5625 122.625 370.9688 Q103.7812 367.875 97.5938 361.4062 L97.5938 324.8438 Q77.7656 310.9219 77.7656 289.4062 Q77.7656 278.4375 83.25 269.5078 Q88.7344 260.5781 96.6094 253.8281 L136.2656 220.2188 Q123.8906 214.875 123.8906 201.7969 Q123.8906 193.6406 129.5859 187.9453 Q135.2812 182.25 143.4375 182.25 Q151.5938 182.25 157.2891 187.9453 Q162.9844 193.6406 162.9844 201.7969 Q162.9844 214.875 150.6094 220.2188 Q187.875 251.7188 194.4844 257.9062 Q201.0938 264.0938 205.1016 272.3203 Q209.1094 280.5469 209.1094 289.4062 Q209.1094 310.9219 189.2812 324.8438 L189.2812 361.4062 Q182.9531 367.875 164.1094 370.9688 Q169.3125 378.5625 173.25 380.6016 Q177.1875 382.6406 185.7656 382.6406 Q189 382.6406 197.5781 381.375 Q209.8125 379.5469 216.5625 379.5469 Q239.2031 379.5469 251.0859 388.5469 Q262.9688 397.5469 262.9688 408.6562 L262.9688 415.5469 ZM143.4375 212.7656 Q147.9375 212.7656 151.1719 209.5312 Q154.4062 206.2969 154.4062 201.7969 Q154.4062 197.2969 151.1719 194.1328 Q147.9375 190.9688 143.4375 190.9688 Q138.9375 190.9688 135.7031 194.1328 Q132.4688 197.2969 132.4688 201.7969 Q132.4688 206.2969 135.7031 209.5312 Q138.9375 212.7656 143.4375 212.7656 ZM164.6719 282.7969 L164.6719 274.6406 L147.5156 274.6406 L147.5156 257.4844 L139.3594 257.4844 L139.3594 274.6406 L122.0625 274.6406 L122.0625 282.7969 L139.3594 282.7969 L139.3594 300.0938 L147.5156 300.0938 L147.5156 282.7969 L164.6719 282.7969 ZM181.4062 319.9219 Q157.5 313.5938 143.4375 313.5938 Q129.2344 313.5938 105.4688 319.9219 L105.75 327.9375 Q124.3125 321.6094 143.4375 321.6094 Q162.5625 321.6094 181.125 327.9375 L181.4062 319.9219 ZM154.9688 334.9688 L143.4375 327.375 L131.9062 334.9688 L143.4375 342.4219 L154.9688 334.9688 ZM181.125 346.0781 L181.125 333.7031 L174.2344 338.3438 L181.125 346.0781 ZM112.6406 338.3438 L105.75 333.7031 L105.75 346.0781 L112.6406 338.3438 ZM181.125 361.4062 L181.125 353.6719 Q168.3281 349.0312 143.4375 349.0312 Q118.5469 349.0312 105.75 353.6719 L105.75 361.4062 Q118.4062 357.0469 143.4375 357.0469 Q168.4688 357.0469 181.125 361.4062 Z",
  king:
    "M174.2344 253.4062 Q189.8438 236.9531 216.2812 236.9531 Q236.8125 236.9531 249.8906 248.9062 Q262.9688 260.8594 262.9688 279.2812 Q262.9688 315 221.2031 337.7812 L221.2031 393.0469 Q221.2031 404.2969 196.3125 411.9609 Q171.4219 419.625 143.4375 419.625 Q115.3125 419.625 90.4922 411.9609 Q65.6719 404.2969 65.6719 393.0469 L65.6719 337.7812 Q23.9062 315 23.9062 279.2812 Q23.9062 260.8594 36.9844 248.9062 Q50.0625 236.9531 70.5938 236.9531 Q96.8906 236.9531 112.6406 253.4062 Q120.5156 239.4844 133.3125 234.4219 L115.7344 234.4219 L115.7344 181.6875 L171.1406 181.6875 L171.1406 234.4219 L153.5625 234.4219 Q166.3594 239.4844 174.2344 253.4062 ZM162.9844 226.5469 L162.9844 222.0469 L149.2031 208.125 L162.9844 194.3438 L162.9844 189.7031 L156.0938 189.7031 L143.4375 202.3594 L130.7812 189.7031 L123.8906 189.7031 L123.8906 194.3438 L137.6719 208.125 L123.8906 222.0469 L123.8906 226.5469 L130.7812 226.5469 L143.4375 213.8906 L156.0938 226.5469 L162.9844 226.5469 ZM167.9062 259.1719 Q164.5312 251.0156 157.5 245.3203 Q150.4688 239.625 143.4375 239.625 Q136.4062 239.625 129.375 245.3203 Q122.3438 251.0156 118.9688 259.1719 Q124.875 264.9375 132.5391 279.2812 Q140.2031 293.625 143.4375 306.1406 Q146.6719 293.625 154.2656 279.2812 Q161.8594 264.9375 167.9062 259.1719 ZM157.5 258.3281 Q146.8125 272.25 143.4375 284.2031 Q140.0625 272.25 129.375 258.3281 Q130.7812 254.25 135.1406 250.9453 Q139.5 247.6406 143.4375 247.6406 Q147.375 247.6406 151.7344 250.9453 Q156.0938 254.25 157.5 258.3281 ZM214.5938 332.2969 Q233.5781 322.875 244.1953 308.8828 Q254.8125 294.8906 254.8125 279.2812 Q254.8125 263.6719 244.1953 254.3906 Q233.5781 245.1094 216.2812 245.1094 Q169.4531 245.1094 150.0469 313.5938 Q191.3906 315.4219 214.5938 332.2969 ZM160.7344 307.2656 Q168.1875 281.5312 183.0234 267.3281 Q197.8594 253.125 216.2812 253.125 Q230.3438 253.125 238.5703 260.1562 Q246.7969 267.1875 246.7969 279.2812 Q246.7969 292.5 237.8672 304.8047 Q228.9375 317.1094 214.5938 324.2812 Q193.2188 309.2344 160.7344 307.2656 ZM136.8281 313.5938 Q117.4219 245.1094 70.5938 245.1094 Q53.2969 245.1094 42.6094 254.4609 Q31.9219 263.8125 31.9219 279.2812 Q31.9219 294.8906 42.6094 308.8828 Q53.2969 322.875 72.2812 332.2969 Q95.3438 315.4219 136.8281 313.5938 ZM126.1406 307.2656 Q93.6562 309.2344 72.2812 324.2812 Q57.9375 317.1094 49.0078 304.8047 Q40.0781 292.5 40.0781 279.2812 Q40.0781 267.0469 48.375 260.0859 Q56.6719 253.125 70.5938 253.125 Q89.0156 253.125 103.8516 267.3281 Q118.6875 281.5312 126.1406 307.2656 ZM161.2969 340.0312 L143.4375 328.7812 L125.5781 340.0312 L143.4375 352.6875 L161.2969 340.0312 ZM213.1875 370.2656 L213.1875 346.6406 L202.2188 353.3906 L213.1875 370.2656 ZM84.6562 353.3906 L73.6875 346.6406 L73.6875 370.2656 L84.6562 353.3906 ZM213.1875 385.5938 L213.1875 376.5938 Q184.5 360.8438 143.4375 360.8438 Q102.375 360.8438 73.6875 376.5938 L73.6875 385.5938 Q86.0625 378 105.1172 373.4297 Q124.1719 368.8594 143.4375 368.8594 Q162.5625 368.8594 181.6172 373.4297 Q200.6719 378 213.1875 385.5938 Z",
  knight:
    "M262.6875 417.5156 L88.7344 417.5156 Q88.7344 391.2188 95.3438 377.1562 Q101.9531 363.0938 118.6875 353.3906 Q139.9219 341.1562 139.9219 322.4531 Q139.9219 318.2344 137.1094 313.875 Q129.6562 319.9219 97.3125 327.6562 Q86.0625 330.8906 83.5312 349.3125 Q82.125 358.0312 77.8359 362.8828 Q73.5469 367.7344 67.6406 367.7344 Q62.0156 367.7344 57.9375 366.6094 Q57.9375 359.1562 59.4141 355.0781 Q60.8906 351 64.5469 346.6406 Q68.4844 341.2969 68.4844 337.2188 Q68.4844 332.0156 63.7031 332.0156 Q59.9062 332.0156 53.2969 344.8125 Q45.7031 359.7188 43.7344 360 Q21.9375 347.2031 21.9375 327.9375 Q21.9375 316.125 38.25 294.3281 Q50.0625 278.4375 53.2969 272.1094 Q56.5312 265.7812 57.6562 256.5 Q58.7812 246.375 60.1172 242.2266 Q61.4531 238.0781 66.2344 230.9062 Q72.5625 221.625 74.1797 215.0156 Q75.7969 208.4062 75.7969 197.0156 L75.7969 179.4375 Q89.0156 185.2031 101.3906 206.4375 L108.8438 206.1562 Q114.1875 196.7344 116.8594 176.4844 Q126.7031 180.9844 134.8594 193.5703 Q143.0156 206.1562 146.25 211.0781 Q206.7188 218.8125 234.7031 255.7266 Q262.6875 292.6406 262.6875 381.2344 L262.6875 417.5156 ZM107.4375 215.4375 Q102.0938 215.4375 96.1172 218.5312 Q90.1406 221.625 89.2969 227.25 Q93.2344 227.25 98.7891 225.4922 Q104.3438 223.7344 105.5391 221.0625 Q106.7344 218.3906 107.4375 215.4375 ZM248.2031 409.5 L248.2031 387 Q248.2031 315.2812 233.7188 281.6016 Q219.2344 247.9219 193.6406 234.3516 Q168.0469 220.7812 152.2969 220.7812 Q146.5312 220.7812 146.5312 225.1406 Q146.5312 226.5469 147.7969 228.0234 Q149.0625 229.5 150.3281 229.7812 Q189 239.4844 208.125 271.0547 Q227.25 302.625 227.25 366.8906 Q227.25 384.3281 223.1719 409.5 L248.2031 409.5 ZM103.6406 254.5312 L102.5156 252 L96.1875 252 Q91.4062 252 84.0234 256.9922 Q76.6406 261.9844 76.6406 266.9062 Q76.6406 270.4219 83.25 275.625 L83.25 269.5781 L84.375 267.75 L90.4219 268.5938 Q95.3438 266.0625 95.3438 264.0938 L94.7812 258.6094 Q98.2969 255.7969 103.6406 254.5312 ZM46.125 318.7969 Q41.7656 318.7969 38.8828 321.6797 Q36 324.5625 36 328.7812 Q36 335.5312 40.3594 335.5312 Q42.4688 335.5312 44.1562 333.9844 Q45.8438 332.4375 45.8438 330.0469 L41.7656 325.125 Q45 322.5938 46.125 318.7969 Z",
  pawn:
    "M231.3281 415.5469 L56.6719 415.5469 L56.6719 405.7031 Q56.6719 368.4375 94.2188 360.5625 Q125.5781 313.4531 125.5781 279.2812 L125.5781 273.2344 L91.5469 273.2344 L91.5469 266.9062 Q91.5469 258.75 98.8594 251.1562 Q106.1719 243.5625 119.5312 238.6406 Q110.5312 227.9531 110.5312 214.7344 Q110.5312 201.0938 120.375 191.25 Q130.2188 181.4062 144 181.4062 Q157.7812 181.4062 167.625 191.25 Q177.4688 201.0938 177.4688 214.7344 Q177.4688 227.9531 168.4688 238.6406 Q181.8281 243.5625 189.1406 251.1562 Q196.4531 258.75 196.4531 266.9062 L196.4531 273.2344 L162.4219 273.2344 L162.4219 279.2812 Q162.4219 313.4531 193.7812 360.5625 Q231.3281 368.4375 231.3281 405.7031 L231.3281 415.5469 Z",
  queen:
    "M200.1094 288.2812 L225.2812 261.2812 Q250.3125 234.5625 250.3125 234.7031 Q244.8281 230.0625 244.8281 222.8906 Q244.8281 216.5625 249.1875 212.2031 Q253.5469 207.8438 259.7344 207.8438 Q266.0625 207.8438 270.4219 212.2031 Q274.7812 216.5625 274.7812 222.8906 Q274.7812 229.0781 270.4219 233.4375 Q266.0625 237.7969 259.7344 237.7969 L258.0469 237.7969 L221.2031 325.6875 L221.2031 393.0469 Q221.2031 404.2969 196.3125 411.9609 Q171.4219 419.625 143.4375 419.625 Q115.3125 419.625 90.4922 411.9609 Q65.6719 404.2969 65.6719 393.0469 L65.6719 325.6875 L28.8281 237.7969 L27.1406 237.7969 Q20.8125 237.7969 16.4531 233.4375 Q12.0938 229.0781 12.0938 222.8906 Q12.0938 216.5625 16.4531 212.2031 Q20.8125 207.8438 27.1406 207.8438 Q33.3281 207.8438 37.6875 212.2031 Q42.0469 216.5625 42.0469 222.8906 Q42.0469 230.2031 36.5625 234.4219 L86.625 288.2812 L82.4062 215.1562 Q76.3594 215.1562 72 210.7266 Q67.6406 206.2969 67.6406 200.1094 Q67.6406 193.7812 72 189.4922 Q76.3594 185.2031 82.6875 185.2031 Q88.875 185.2031 93.2344 189.5625 Q97.5938 193.9219 97.5938 200.1094 Q97.5938 208.125 90.7031 212.7656 L123.3281 278.7188 L139.0781 205.3125 Q128.3906 201.9375 128.3906 190.9688 Q128.3906 184.6406 132.75 180.2812 Q137.1094 175.9219 143.4375 175.9219 Q149.625 175.9219 153.9844 180.2812 Q158.3438 184.6406 158.3438 190.9688 Q158.3438 201.9375 147.7969 205.3125 L163.5469 278.7188 L196.1719 212.7656 Q189.2812 208.5469 189.2812 200.1094 Q189.2812 193.9219 193.6406 189.5625 Q198 185.2031 204.1875 185.2031 Q210.375 185.2031 214.8047 189.5625 Q219.2344 193.9219 219.2344 200.1094 Q219.2344 206.2969 214.875 210.7266 Q210.5156 215.1562 204.4688 215.1562 L200.1094 288.2812 ZM143.4375 197.8594 Q146.25 197.8594 148.2891 195.75 Q150.3281 193.6406 150.3281 190.9688 Q150.3281 188.1562 148.2891 186.0469 Q146.25 183.9375 143.4375 183.9375 Q140.625 183.9375 138.5859 186.0469 Q136.5469 188.1562 136.5469 190.9688 Q136.5469 193.6406 138.5859 195.75 Q140.625 197.8594 143.4375 197.8594 ZM204.1875 207 Q207 207 209.0391 204.9609 Q211.0781 202.9219 211.0781 200.1094 Q211.0781 197.2969 209.0391 195.2578 Q207 193.2188 204.1875 193.2188 Q201.375 193.2188 199.3359 195.2578 Q197.2969 197.2969 197.2969 200.1094 Q197.2969 202.9219 199.3359 204.9609 Q201.375 207 204.1875 207 ZM82.6875 207 Q85.5 207 87.5391 204.9609 Q89.5781 202.9219 89.5781 200.1094 Q89.5781 197.2969 87.5391 195.2578 Q85.5 193.2188 82.6875 193.2188 Q79.875 193.2188 77.8359 195.2578 Q75.7969 197.2969 75.7969 200.1094 Q75.7969 202.9219 77.8359 204.9609 Q79.875 207 82.6875 207 ZM259.7344 229.7812 Q262.5469 229.7812 264.5859 227.7422 Q266.625 225.7031 266.625 222.8906 Q266.625 220.0781 264.5859 218.0391 Q262.5469 216 259.7344 216 Q256.9219 216 254.8828 218.0391 Q252.8438 220.0781 252.8438 222.8906 Q252.8438 225.7031 254.8828 227.7422 Q256.9219 229.7812 259.7344 229.7812 ZM27.1406 229.7812 Q29.8125 229.7812 31.9219 227.7422 Q34.0312 225.7031 34.0312 222.8906 Q34.0312 220.0781 31.9219 218.0391 Q29.8125 216 27.1406 216 Q24.3281 216 22.2188 218.0391 Q20.1094 220.0781 20.1094 222.8906 Q20.1094 225.7031 22.2188 227.7422 Q24.3281 229.7812 27.1406 229.7812 ZM213.1875 342.4219 L213.1875 330.6094 Q188.7188 313.5938 143.4375 313.5938 Q98.1562 313.5938 73.6875 330.6094 L73.6875 342.4219 Q80.8594 333 100.1953 327.3047 Q119.5312 321.6094 143.4375 321.6094 Q167.3438 321.6094 186.6797 327.3047 Q206.0156 333 213.1875 342.4219 ZM161.2969 340.0312 L143.4375 328.7812 L125.5781 340.0312 L143.4375 352.6875 L161.2969 340.0312 ZM213.1875 370.2656 L213.1875 346.6406 L202.2188 353.3906 L213.1875 370.2656 ZM84.6562 353.3906 L73.6875 346.6406 L73.6875 370.2656 L84.6562 353.3906 ZM213.1875 385.5938 L213.1875 376.5938 Q184.5 360.8438 143.4375 360.8438 Q102.375 360.8438 73.6875 376.5938 L73.6875 385.5938 Q86.0625 378 105.1172 373.4297 Q124.1719 368.8594 143.4375 368.8594 Q162.5625 368.8594 181.6172 373.4297 Q200.6719 378 213.1875 385.5938 Z",
  rook:
    "M242.4375 418.3594 L44.2969 418.3594 L44.2969 382.0781 L64.2656 360.2812 L64.2656 346.0781 L88.1719 319.3594 L88.1719 255.9375 L61.3125 237.7969 L61.3125 182.5312 L99.1406 182.5312 L99.1406 208.125 L125.8594 208.125 L125.8594 182.5312 L161.0156 182.5312 L161.0156 208.125 L187.7344 208.125 L187.7344 182.5312 L225.5625 182.5312 L225.5625 237.7969 L198.7031 255.9375 L198.7031 319.3594 L222.6094 346.0781 L222.6094 360.2812 L242.4375 382.0781 L242.4375 418.3594 ZM217.4062 232.0312 L217.4062 216.2812 L69.4688 216.2812 L69.4688 232.0312 L217.4062 232.0312 ZM211.3594 345.5156 L196.1719 328.5 L90.7031 328.5 L75.5156 345.5156 L211.3594 345.5156 ZM233.0156 383.0625 L214.5938 363.0938 L72.2812 363.0938 L53.8594 383.0625 L233.0156 383.0625 Z"
};

const hollows = {
  bishop:
    "M262.9688 415.5469 L231.3281 415.5469 Q231.3281 410.625 223.1719 410.625 Q221.3438 410.625 209.1094 412.1719 Q188.2969 414.7031 183.2344 414.7031 Q167.2031 414.7031 156.4453 407.8125 Q145.6875 400.9219 143.4375 389.1094 Q141.1875 400.9219 130.4297 407.8125 Q119.6719 414.7031 103.6406 414.7031 Q98.5781 414.7031 77.7656 412.1719 Q65.3906 410.625 63.7031 410.625 Q55.5469 410.625 55.5469 415.5469 L23.9062 415.5469 L23.9062 408.6562 Q23.9062 401.9062 29.1094 394.875 Q34.3125 387.8438 44.7891 383.6953 Q55.2656 379.5469 70.3125 379.5469 Q77.0625 379.5469 89.2969 381.375 Q97.7344 382.6406 101.1094 382.6406 Q109.6875 382.6406 113.625 380.6016 Q117.5625 378.5625 122.625 370.9688 Q103.7812 367.875 97.5938 361.4062 L97.5938 324.8438 Q77.7656 310.9219 77.7656 289.4062 Q77.7656 278.4375 83.25 269.5078 Q88.7344 260.5781 96.6094 253.8281 L136.2656 220.2188 Q123.8906 214.875 123.8906 201.7969 Q123.8906 193.6406 129.5859 187.9453 Q135.2812 182.25 143.4375 182.25 Q151.5938 182.25 157.2891 187.9453 Q162.9844 193.6406 162.9844 201.7969 Q162.9844 214.875 150.6094 220.2188 Q187.875 251.7188 194.4844 257.9062 Q201.0938 264.0938 205.1016 272.3203 Q209.1094 280.5469 209.1094 289.4062 Q209.1094 310.9219 189.2812 324.8438 L189.2812 361.4062 Q182.9531 367.875 164.1094 370.9688 Q169.3125 378.5625 173.25 380.6016 Q177.1875 382.6406 185.7656 382.6406 Q189 382.6406 197.5781 381.375 Q209.8125 379.5469 216.5625 379.5469 Q239.2031 379.5469 251.0859 388.5469 Q262.9688 397.5469 262.9688 408.6562 L262.9688 415.5469 ZM143.4375 212.7656 Q147.9375 212.7656 151.1719 209.5312 Q154.4062 206.2969 154.4062 201.7969 Q154.4062 197.2969 151.1719 194.1328 Q147.9375 190.9688 143.4375 190.9688 Q138.9375 190.9688 135.7031 194.1328 Q132.4688 197.2969 132.4688 201.7969 Q132.4688 206.2969 135.7031 209.5312 Q138.9375 212.7656 143.4375 212.7656 ZM181.4062 319.9219 Q190.125 316.6875 195.6094 308.1094 Q201.0938 299.5312 201.0938 289.4062 Q201.0938 274.2188 181.5469 257.2734 Q162 240.3281 143.4375 223.4531 L114.6094 249.0469 Q99.1406 262.6875 95.2031 267.2578 Q91.2656 271.8281 88.5234 277.9453 Q85.7812 284.0625 85.7812 289.4062 Q85.7812 299.5312 91.2656 308.1094 Q96.75 316.6875 105.4688 319.9219 Q129.2344 313.5938 143.4375 313.5938 Q157.5 313.5938 181.4062 319.9219 ZM164.6719 282.7969 L147.5156 282.7969 L147.5156 300.0938 L139.3594 300.0938 L139.3594 282.7969 L122.0625 282.7969 L122.0625 274.6406 L139.3594 274.6406 L139.3594 257.4844 L147.5156 257.4844 L147.5156 274.6406 L164.6719 274.6406 L164.6719 282.7969 ZM181.125 353.6719 L181.125 346.0781 L174.2344 338.3438 L181.125 333.7031 L181.125 327.9375 Q162.5625 321.6094 143.4375 321.6094 Q124.3125 321.6094 105.75 327.9375 L105.75 333.7031 L112.6406 338.3438 L105.75 346.0781 L105.75 353.6719 Q118.5469 349.0312 143.4375 349.0312 Q168.3281 349.0312 181.125 353.6719 ZM154.9688 334.9688 L143.4375 342.4219 L131.9062 334.9688 L143.4375 327.375 L154.9688 334.9688 ZM176.4844 360.2812 Q168.4688 357.0469 143.4375 357.0469 Q118.2656 357.0469 110.25 360.2812 Q120.9375 364.7812 143.4375 364.7812 Q165.7969 364.7812 176.4844 360.2812 ZM254.8125 407.5312 Q250.3125 387.5625 217.4062 387.5625 Q212.9062 387.5625 200.8125 389.25 Q189.2812 390.7969 185.2031 390.7969 Q174.2344 390.7969 168.1875 386.0859 Q162.1406 381.375 156.0938 371.8125 L147.5156 371.8125 Q147.5156 406.5469 183.2344 406.5469 Q187.4531 406.5469 207.1406 404.2969 Q221.0625 402.6094 223.1719 402.6094 Q231.0469 402.6094 235.8281 407.5312 L254.8125 407.5312 ZM139.3594 371.8125 L130.7812 371.8125 Q124.7344 381.375 118.6172 386.0859 Q112.5 390.7969 101.6719 390.7969 Q97.5938 390.7969 86.0625 389.25 Q73.9688 387.5625 69.4688 387.5625 Q36.5625 387.5625 31.9219 407.5312 L50.9062 407.5312 Q55.8281 402.6094 63.7031 402.6094 Q65.8125 402.6094 79.7344 404.2969 Q99.2812 406.5469 103.6406 406.5469 Q139.3594 406.5469 139.3594 371.8125 Z",
  king:
    "M174.2344 253.4062 Q189.8438 236.9531 216.2812 236.9531 Q236.8125 236.9531 249.8906 248.9062 Q262.9688 260.8594 262.9688 279.2812 Q262.9688 315 221.2031 337.7812 L221.2031 393.0469 Q221.2031 404.2969 196.3125 411.9609 Q171.4219 419.625 143.4375 419.625 Q115.3125 419.625 90.4922 411.9609 Q65.6719 404.2969 65.6719 393.0469 L65.6719 337.7812 Q23.9062 315 23.9062 279.2812 Q23.9062 260.8594 36.9844 248.9062 Q50.0625 236.9531 70.5938 236.9531 Q96.8906 236.9531 112.6406 253.4062 Q120.5156 239.4844 133.3125 234.4219 L115.7344 234.4219 L115.7344 181.6875 L171.1406 181.6875 L171.1406 234.4219 L153.5625 234.4219 Q166.3594 239.4844 174.2344 253.4062 ZM156.0938 189.7031 L130.7812 189.7031 L143.4375 202.3594 L156.0938 189.7031 ZM162.9844 222.0469 L162.9844 194.3438 L149.2031 208.125 L162.9844 222.0469 ZM137.6719 208.125 L123.8906 194.3438 L123.8906 222.0469 L137.6719 208.125 ZM156.0938 226.5469 L143.4375 213.8906 L130.7812 226.5469 L156.0938 226.5469 ZM167.9062 259.1719 Q164.5312 251.0156 157.5 245.3203 Q150.4688 239.625 143.4375 239.625 Q136.4062 239.625 129.375 245.3203 Q122.3438 251.0156 118.9688 259.1719 Q124.875 264.9375 132.5391 279.2812 Q140.2031 293.625 143.4375 306.1406 Q146.6719 293.625 154.2656 279.2812 Q161.8594 264.9375 167.9062 259.1719 ZM214.5938 332.2969 Q233.5781 322.875 244.1953 308.8828 Q254.8125 294.8906 254.8125 279.2812 Q254.8125 263.6719 244.1953 254.3906 Q233.5781 245.1094 216.2812 245.1094 Q169.4531 245.1094 150.0469 313.5938 Q191.3906 315.4219 214.5938 332.2969 ZM136.8281 313.5938 Q117.4219 245.1094 70.5938 245.1094 Q53.2969 245.1094 42.6094 254.4609 Q31.9219 263.8125 31.9219 279.2812 Q31.9219 294.8906 42.6094 308.8828 Q53.2969 322.875 72.2812 332.2969 Q95.3438 315.4219 136.8281 313.5938 ZM213.1875 376.5938 L213.1875 370.2656 L202.2188 353.3906 L213.1875 346.6406 L213.1875 342.4219 Q206.0156 333 186.6797 327.3047 Q167.3438 321.6094 143.4375 321.6094 Q119.5312 321.6094 100.1953 327.3047 Q80.8594 333 73.6875 342.4219 L73.6875 346.6406 L84.6562 353.3906 L73.6875 370.2656 L73.6875 376.5938 Q102.375 360.8438 143.4375 360.8438 Q184.5 360.8438 213.1875 376.5938 ZM161.2969 340.0312 L143.4375 352.6875 L125.5781 340.0312 L143.4375 328.7812 L161.2969 340.0312 ZM143.4375 411.4688 Q164.3906 411.4688 188.7891 404.7891 Q213.1875 398.1094 213.1875 390.2344 Q213.1875 383.2031 191.0391 376.0312 Q168.8906 368.8594 143.4375 368.8594 Q117.9844 368.8594 95.8359 376.0312 Q73.6875 383.2031 73.6875 390.2344 Q73.6875 398.1094 98.0859 404.7891 Q122.4844 411.4688 143.4375 411.4688 Z",
  knight:
    "M262.6875 417.5156 L88.7344 417.5156 Q88.7344 391.2188 95.3438 377.1562 Q101.9531 363.0938 118.6875 353.3906 Q139.9219 341.1562 139.9219 322.4531 Q139.9219 318.2344 137.1094 313.875 Q129.6562 319.9219 97.3125 327.6562 Q86.0625 330.8906 83.5312 349.3125 Q82.125 358.0312 77.8359 362.8828 Q73.5469 367.7344 67.6406 367.7344 Q52.4531 367.7344 37.1953 355.4297 Q21.9375 343.125 21.9375 327.9375 Q21.9375 316.125 38.25 294.3281 Q50.0625 278.4375 53.2969 272.1094 Q56.5312 265.7812 57.6562 256.5 Q58.7812 246.375 60.1172 242.2266 Q61.4531 238.0781 66.2344 230.9062 Q72.5625 221.625 74.1797 215.0156 Q75.7969 208.4062 75.7969 197.0156 L75.7969 179.4375 Q89.0156 185.2031 101.3906 206.4375 L108.8438 206.1562 Q114.1875 196.7344 116.8594 176.4844 Q126.7031 180.9844 134.8594 193.5703 Q143.0156 206.1562 146.25 211.0781 Q206.7188 218.8125 234.7031 255.7266 Q262.6875 292.6406 262.6875 381.2344 L262.6875 417.5156 ZM248.2031 409.5 L248.2031 387 Q248.2031 297.5625 223.5938 261.7734 Q198.9844 225.9844 142.875 219.0938 Q139.6406 216.7031 134.0156 206.7188 Q126.5625 193.6406 121.7812 190.5469 Q118.5469 207.2812 118.125 210.5859 Q117.7031 213.8906 114.8203 219.6562 Q111.9375 225.4219 108.5625 225.4219 Q105.75 225.4219 105.75 221.2031 Q105.75 218.8125 106.875 215.4375 L88.4531 224.2969 L87.8906 221.2031 Q90.9844 216.5625 94.5 215.1562 Q94.5 205.4531 83.8125 195.4688 Q83.8125 211.2188 82.0547 217.8984 Q80.2969 224.5781 73.125 235.5469 Q68.7656 242.4375 67.6406 245.8125 Q66.5156 249.1875 65.6719 258.6094 Q65.1094 265.5 62.0859 272.0391 Q59.0625 278.5781 44.8594 298.9688 Q35.7188 312.0469 32.8359 317.3203 Q29.9531 322.5938 29.9531 327.375 Q29.9531 337.2188 36.8438 344.3906 Q43.7344 351.5625 47.8125 351.5625 Q49.9219 351.5625 53.4375 344.6719 Q59.7656 332.0156 63.7031 332.0156 Q68.4844 332.0156 68.4844 337.2188 Q68.4844 341.2969 64.5469 346.6406 Q60.6094 351.2812 57.9375 356.7656 Q61.875 359.7188 67.0781 359.7188 Q73.4062 359.7188 75.5156 348.1875 Q79.1719 324.8438 93.0938 320.7656 Q103.5 318.2344 114.5391 315 Q125.5781 311.7656 131.1328 308.6016 Q136.6875 305.4375 139.7109 301.9219 Q142.7344 298.4062 148.0781 287.7188 Q149.2031 288.5625 150.3281 289.6875 Q147.5156 298.2656 147.5156 305.0156 L148.0781 322.7344 Q148.0781 346.2188 123.6094 359.7188 Q110.3906 366.8906 104.2734 378.4219 Q98.1562 389.9531 98.1562 409.5 L248.2031 409.5 ZM103.6406 254.5312 Q98.2969 255.7969 94.7812 258.6094 Q95.3438 263.1094 95.3438 264.0938 Q95.3438 266.0625 90.4219 268.5938 L84.375 267.75 L83.25 269.5781 L83.25 275.625 Q76.6406 270.4219 76.6406 266.9062 Q76.6406 261.9844 84.0234 256.9922 Q91.4062 252 96.1875 252 L102.5156 252 L103.6406 254.5312 ZM48.9375 318.7969 Q47.8125 322.5938 44.5781 325.125 L48.6562 330.0469 Q48.6562 332.4375 46.9688 333.9844 Q45.2812 335.5312 43.1719 335.5312 Q38.8125 335.5312 38.8125 328.7812 Q38.8125 324.5625 41.6953 321.6797 Q44.5781 318.7969 48.9375 318.7969 Z",
  pawn:
    "M231.3281 415.5469 L56.6719 415.5469 L56.6719 405.7031 Q56.6719 368.4375 94.2188 360.5625 Q125.5781 313.4531 125.5781 279.2812 L125.5781 273.2344 L91.5469 273.2344 L91.5469 266.9062 Q91.5469 258.75 98.8594 251.1562 Q106.1719 243.5625 119.5312 238.6406 Q110.5312 227.9531 110.5312 214.7344 Q110.5312 201.0938 120.375 191.25 Q130.2188 181.4062 144 181.4062 Q157.7812 181.4062 167.625 191.25 Q177.4688 201.0938 177.4688 214.7344 Q177.4688 227.9531 168.4688 238.6406 Q181.8281 243.5625 189.1406 251.1562 Q196.4531 258.75 196.4531 266.9062 L196.4531 273.2344 L162.4219 273.2344 L162.4219 279.2812 Q162.4219 313.4531 193.7812 360.5625 Q231.3281 368.4375 231.3281 405.7031 L231.3281 415.5469 ZM187.7344 265.2188 Q185.9062 251.8594 157.2188 241.3125 Q169.3125 228.7969 169.3125 214.7344 Q169.3125 204.1875 161.9297 196.8047 Q154.5469 189.4219 144 189.4219 Q133.4531 189.4219 126.0703 196.875 Q118.6875 204.3281 118.6875 214.7344 Q118.6875 228.7969 130.7812 241.3125 Q102.0938 251.8594 100.2656 265.2188 L187.7344 265.2188 ZM223.1719 407.5312 Q223.1719 388.6875 214.9453 379.4766 Q206.7188 370.2656 187.7344 366.3281 Q154.4062 316.5469 154.4062 273.2344 L133.5938 273.2344 Q133.5938 316.5469 100.2656 366.3281 Q81.2812 370.2656 73.0547 379.4766 Q64.8281 388.6875 64.8281 407.5312 L223.1719 407.5312 Z",
  queen:
    "M200.1094 288.2812 L225.2812 261.2812 Q250.3125 234.5625 250.3125 234.7031 Q244.8281 230.0625 244.8281 222.8906 Q244.8281 216.5625 249.1875 212.2031 Q253.5469 207.8438 259.7344 207.8438 Q266.0625 207.8438 270.4219 212.2031 Q274.7812 216.5625 274.7812 222.8906 Q274.7812 229.0781 270.4219 233.4375 Q266.0625 237.7969 259.7344 237.7969 L258.0469 237.7969 L221.2031 325.6875 L221.2031 393.0469 Q221.2031 404.2969 196.3125 411.9609 Q171.4219 419.625 143.4375 419.625 Q115.3125 419.625 90.4922 411.9609 Q65.6719 404.2969 65.6719 393.0469 L65.6719 325.6875 L28.8281 237.7969 L27.1406 237.7969 Q20.8125 237.7969 16.4531 233.4375 Q12.0938 229.0781 12.0938 222.8906 Q12.0938 216.5625 16.4531 212.2031 Q20.8125 207.8438 27.1406 207.8438 Q33.3281 207.8438 37.6875 212.2031 Q42.0469 216.5625 42.0469 222.8906 Q42.0469 230.2031 36.5625 234.4219 L86.625 288.2812 L82.4062 215.1562 Q76.3594 215.1562 72 210.7266 Q67.6406 206.2969 67.6406 200.1094 Q67.6406 193.7812 72 189.4922 Q76.3594 185.2031 82.6875 185.2031 Q88.875 185.2031 93.2344 189.5625 Q97.5938 193.9219 97.5938 200.1094 Q97.5938 208.125 90.7031 212.7656 L123.3281 278.7188 L139.0781 205.3125 Q128.3906 201.9375 128.3906 190.9688 Q128.3906 184.6406 132.75 180.2812 Q137.1094 175.9219 143.4375 175.9219 Q149.625 175.9219 153.9844 180.2812 Q158.3438 184.6406 158.3438 190.9688 Q158.3438 201.9375 147.7969 205.3125 L163.5469 278.7188 L196.1719 212.7656 Q189.2812 208.5469 189.2812 200.1094 Q189.2812 193.9219 193.6406 189.5625 Q198 185.2031 204.1875 185.2031 Q210.375 185.2031 214.8047 189.5625 Q219.2344 193.9219 219.2344 200.1094 Q219.2344 206.2969 214.875 210.7266 Q210.5156 215.1562 204.4688 215.1562 L200.1094 288.2812 ZM143.4375 197.8594 Q146.25 197.8594 148.2891 195.75 Q150.3281 193.6406 150.3281 190.9688 Q150.3281 188.1562 148.2891 186.0469 Q146.25 183.9375 143.4375 183.9375 Q140.625 183.9375 138.5859 186.0469 Q136.5469 188.1562 136.5469 190.9688 Q136.5469 193.6406 138.5859 195.75 Q140.625 197.8594 143.4375 197.8594 ZM204.1875 207 Q207 207 209.0391 204.9609 Q211.0781 202.9219 211.0781 200.1094 Q211.0781 197.2969 209.0391 195.2578 Q207 193.2188 204.1875 193.2188 Q201.375 193.2188 199.3359 195.2578 Q197.2969 197.2969 197.2969 200.1094 Q197.2969 202.9219 199.3359 204.9609 Q201.375 207 204.1875 207 ZM82.6875 207 Q85.5 207 87.5391 204.9609 Q89.5781 202.9219 89.5781 200.1094 Q89.5781 197.2969 87.5391 195.2578 Q85.5 193.2188 82.6875 193.2188 Q79.875 193.2188 77.8359 195.2578 Q75.7969 197.2969 75.7969 200.1094 Q75.7969 202.9219 77.8359 204.9609 Q79.875 207 82.6875 207 ZM259.7344 229.7812 Q262.5469 229.7812 264.5859 227.7422 Q266.625 225.7031 266.625 222.8906 Q266.625 220.0781 264.5859 218.0391 Q262.5469 216 259.7344 216 Q256.9219 216 254.8828 218.0391 Q252.8438 220.0781 252.8438 222.8906 Q252.8438 225.7031 254.8828 227.7422 Q256.9219 229.7812 259.7344 229.7812 ZM27.1406 229.7812 Q29.8125 229.7812 31.9219 227.7422 Q34.0312 225.7031 34.0312 222.8906 Q34.0312 220.0781 31.9219 218.0391 Q29.8125 216 27.1406 216 Q24.3281 216 22.2188 218.0391 Q20.1094 220.0781 20.1094 222.8906 Q20.1094 225.7031 22.2188 227.7422 Q24.3281 229.7812 27.1406 229.7812 ZM241.875 255.375 L190.6875 310.0781 L194.9062 233.8594 L160.4531 303.1875 L143.4375 223.1719 L126.4219 303.1875 L91.8281 233.8594 L96.1875 310.0781 L44.8594 255.375 L75.7969 329.2031 Q100.6875 313.5938 143.4375 313.5938 Q186.0469 313.5938 211.0781 329.2031 L241.875 255.375 ZM213.1875 376.5938 L213.1875 370.2656 L202.2188 353.3906 L213.1875 346.6406 L213.1875 342.4219 Q206.0156 333 186.6797 327.3047 Q167.3438 321.6094 143.4375 321.6094 Q119.5312 321.6094 100.1953 327.3047 Q80.8594 333 73.6875 342.4219 L73.6875 346.6406 L84.6562 353.3906 L73.6875 370.2656 L73.6875 376.5938 Q102.375 360.8438 143.4375 360.8438 Q184.5 360.8438 213.1875 376.5938 ZM161.2969 340.0312 L143.4375 352.6875 L125.5781 340.0312 L143.4375 328.7812 L161.2969 340.0312 ZM143.4375 411.4688 Q164.3906 411.4688 188.7891 404.7891 Q213.1875 398.1094 213.1875 390.2344 Q213.1875 383.2031 191.0391 376.0312 Q168.8906 368.8594 143.4375 368.8594 Q117.9844 368.8594 95.8359 376.0312 Q73.6875 383.2031 73.6875 390.2344 Q73.6875 398.1094 98.0859 404.7891 Q122.4844 411.4688 143.4375 411.4688 Z",
  rook:
    "M242.4375 418.3594 L44.2969 418.3594 L44.2969 382.0781 L64.2656 360.2812 L64.2656 346.0781 L88.1719 319.3594 L88.1719 255.9375 L61.3125 237.7969 L61.3125 182.5312 L99.1406 182.5312 L99.1406 208.125 L125.8594 208.125 L125.8594 182.5312 L161.0156 182.5312 L161.0156 208.125 L187.7344 208.125 L187.7344 182.5312 L225.5625 182.5312 L225.5625 237.7969 L198.7031 255.9375 L198.7031 319.3594 L222.6094 346.0781 L222.6094 360.2812 L242.4375 382.0781 L242.4375 418.3594 ZM217.4062 232.0312 L217.4062 190.5469 L195.8906 190.5469 L195.8906 216.2812 L152.8594 216.2812 L152.8594 190.5469 L133.875 190.5469 L133.875 216.2812 L90.9844 216.2812 L90.9844 190.5469 L69.4688 190.5469 L69.4688 232.0312 L217.4062 232.0312 ZM207.4219 240.4688 L79.4531 240.4688 L95.9062 251.1562 L190.9688 251.1562 L207.4219 240.4688 ZM190.6875 314.7188 L190.6875 259.1719 L96.1875 259.1719 L96.1875 314.7188 L190.6875 314.7188 ZM211.3594 345.5156 L191.25 322.7344 L95.625 322.7344 L75.5156 345.5156 L211.3594 345.5156 ZM233.0156 383.0625 L214.5938 363.0938 L214.5938 353.6719 L72.2812 353.6719 L72.2812 363.0938 L53.8594 383.0625 L233.0156 383.0625 ZM234.4219 410.3438 L234.4219 391.0781 L52.4531 391.0781 L52.4531 410.3438 L234.4219 410.3438 Z"
};
